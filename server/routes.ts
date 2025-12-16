import fs from "fs";
import path from "path";
import multer from "multer";
import session from "express-session";
import express, { type Express, type NextFunction, type Request, type Response } from "express";
import { createServer, type Server } from "http";
import createMemoryStore from "memorystore";
import { initDb, query } from "./db";

type TypedRequest = Request & {
  session: session.Session & Partial<session.SessionData> & { isAdmin?: boolean };
};

declare module "express-session" {
  interface SessionData {
    isAdmin?: boolean;
  }
}

interface ProjectRow {
  id: number;
  name: string;
  logo_url: string | null;
  link: string | null;
}

interface EventRow {
  id: number;
  name: string;
  event_date: string | null;
  location: string | null;
  link: string | null;
  image_url: string | null;
}

interface NewsRow {
  id: number;
  title: string;
  description: string;
  image_url: string | null;
}

interface BlogRow {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  image_url: string | null;
}

const uploadsDir = path.resolve(process.cwd(), "uploads");
const MemoryStore = createMemoryStore(session);

const upload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      fs.mkdirSync(uploadsDir, { recursive: true });
      cb(null, uploadsDir);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const safeBase = path
        .basename(file.originalname, ext)
        .replace(/[^a-zA-Z0-9_-]/g, "");
      const finalName = `${Date.now()}-${safeBase || "file"}${ext}`;
      cb(null, finalName);
    },
  }),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      cb(new Error("Only image uploads are allowed"));
      return;
    }
    cb(null, true);
  },
});

const parseForm = multer().none();

const ADMIN_USER = process.env.ADMIN_USER || "admin";
const ADMIN_PASS = process.env.ADMIN_PASS || "admin@123";
const SESSION_SECRET = process.env.SESSION_SECRET || "change-me";

function requireAuth(req: TypedRequest, res: Response, next: NextFunction) {
  if (req.session?.isAdmin) {
    return next();
  }
  res.status(401).json({ success: false, error: "Unauthorized" });
}

export async function registerRoutes(
  httpServer: Server,
  app: Express,
): Promise<Server> {
  app.use(
    session({
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      },
      store: new MemoryStore({
        checkPeriod: 1000 * 60 * 60 * 24,
      }),
    }),
  );

  // Serve uploaded images
  app.use("/uploads", (req, res, next) => {
    fs.mkdirSync(uploadsDir, { recursive: true });
    return (express.static(uploadsDir) as any)(req, res, next);
  });

  await initDb();

  app.get("/api/health", async (_req, res) => {
    try {
      await query("SELECT 1;");
      res.json({ success: true, status: "ok" });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err?.message || "error" });
    }
  });

  app.post("/api/login.php", async (req: TypedRequest, res) => {
    const { username, password } = req.body ?? {};
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      req.session.isAdmin = true;
      res.json({ success: true });
      return;
    }

    res.status(401).json({ success: false, error: "Invalid credentials" });
  });

  app.post("/api/logout.php", (req: TypedRequest, res) => {
    req.session?.destroy(() => {
      res.json({ success: true });
    });
  });

  app.get("/api/session.php", (req: TypedRequest, res) => {
    res.json({ authenticated: Boolean(req.session?.isAdmin) });
  });

  app.post(
    "/api/upload.php",
    requireAuth,
    upload.single("file"),
    (req: TypedRequest, res) => {
      if (!req.file) {
        res.status(400).json({ success: false, error: "No file received" });
        return;
      }

      const publicUrl = `/uploads/${req.file.filename}`;
      res.json({ success: true, url: publicUrl });
    },
  );

  app.get("/api/projects.php", async (_req, res, next) => {
    try {
      const { rows } = await query<ProjectRow>(
        "SELECT id, name, logo_url, link, created_at FROM projects ORDER BY created_at DESC;",
      );
      res.json(rows);
    } catch (err) {
      next(err);
    }
  });

  app.post(
    "/api/projects.php",
    requireAuth,
    parseForm,
    async (req: TypedRequest, res, next) => {
      try {
        const name = (req.body?.name || "").trim();
        if (!name) {
          res.status(400).json({ success: false, error: "Name is required" });
          return;
        }

        const logoUrl = req.body?.logo_url || null;
        const link = req.body?.link || null;

        const { rows } = await query<ProjectRow>(
          "INSERT INTO projects (name, logo_url, link) VALUES ($1, $2, $3) RETURNING *;",
          [name, logoUrl, link],
        );

        res.json({ success: true, project: rows[0] });
      } catch (err) {
        next(err);
      }
    },
  );

  app.delete(
    "/api/projects.php",
    requireAuth,
    async (req: TypedRequest, res, next) => {
      try {
        const id = req.body?.id;
        if (!id) {
          res.status(400).json({ success: false, error: "Project id required" });
          return;
        }

        await query("DELETE FROM projects WHERE id = $1;", [id]);
        res.json({ success: true });
      } catch (err) {
        next(err);
      }
    },
  );

  app.get("/api/events.php", async (_req, res, next) => {
    try {
      const { rows } = await query<EventRow>(
        "SELECT id, name, event_date, location, link, image_url, created_at FROM events ORDER BY created_at DESC;",
      );
      res.json(rows);
    } catch (err) {
      next(err);
    }
  });

  app.post(
    "/api/events.php",
    requireAuth,
    parseForm,
    async (req: TypedRequest, res, next) => {
      try {
        const name = (req.body?.name || "").trim();
        if (!name) {
          res.status(400).json({ success: false, error: "Name is required" });
          return;
        }

        const eventDate = req.body?.event_date || null;
        const location = req.body?.location || null;
        const link = req.body?.link || null;
        const imageUrl = req.body?.image_url || null;

        const { rows } = await query<EventRow>(
          `INSERT INTO events (name, event_date, location, link, image_url)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING *;`,
          [name, eventDate || null, location, link, imageUrl],
        );

        res.json({ success: true, event: rows[0] });
      } catch (err) {
        next(err);
      }
    },
  );

  app.delete(
    "/api/events.php",
    requireAuth,
    async (req: TypedRequest, res, next) => {
      try {
        const id = req.body?.id;
        if (!id) {
          res.status(400).json({ success: false, error: "Event id required" });
          return;
        }

        await query("DELETE FROM events WHERE id = $1;", [id]);
        res.json({ success: true });
      } catch (err) {
        next(err);
      }
    },
  );

  app.get("/api/news.php", async (_req, res, next) => {
    try {
      const { rows } = await query<NewsRow>(
        "SELECT id, title, description, image_url, created_at FROM news ORDER BY created_at DESC;",
      );
      res.json(rows);
    } catch (err) {
      next(err);
    }
  });

  app.post(
    "/api/news.php",
    requireAuth,
    parseForm,
    async (req: TypedRequest, res, next) => {
      try {
        const title = (req.body?.title || "").trim();
        const description = (req.body?.description || "").trim();
        if (!title || !description) {
          res
            .status(400)
            .json({ success: false, error: "Title and description required" });
          return;
        }

        const imageUrl = req.body?.image_url || null;
        const { rows } = await query<NewsRow>(
          `INSERT INTO news (title, description, image_url)
           VALUES ($1, $2, $3)
           RETURNING *;`,
          [title, description, imageUrl],
        );

        res.json({ success: true, news: rows[0] });
      } catch (err) {
        next(err);
      }
    },
  );

  app.delete(
    "/api/news.php",
    requireAuth,
    async (req: TypedRequest, res, next) => {
      try {
        const id = req.body?.id;
        if (!id) {
          res.status(400).json({ success: false, error: "News id required" });
          return;
        }

        await query("DELETE FROM news WHERE id = $1;", [id]);
        res.json({ success: true });
      } catch (err) {
        next(err);
      }
    },
  );

  app.get("/api/blogs.php", async (_req, res, next) => {
    try {
      const { rows } = await query<BlogRow>(
        "SELECT id, title, excerpt, author, image_url, created_at FROM blogs ORDER BY created_at DESC;",
      );
      res.json(rows);
    } catch (err) {
      next(err);
    }
  });

  app.post(
    "/api/blogs.php",
    requireAuth,
    parseForm,
    async (req: TypedRequest, res, next) => {
      try {
        const title = (req.body?.title || "").trim();
        const excerpt = (req.body?.excerpt || "").trim();
        const author = (req.body?.author || "").trim();

        if (!title || !excerpt || !author) {
          res
            .status(400)
            .json({ success: false, error: "Title, excerpt, and author required" });
          return;
        }

        const imageUrl = req.body?.image_url || null;
        const { rows } = await query<BlogRow>(
          `INSERT INTO blogs (title, excerpt, author, image_url)
           VALUES ($1, $2, $3, $4)
           RETURNING *;`,
          [title, excerpt, author, imageUrl],
        );

        res.json({ success: true, blog: rows[0] });
      } catch (err) {
        next(err);
      }
    },
  );

  app.delete(
    "/api/blogs.php",
    requireAuth,
    async (req: TypedRequest, res, next) => {
      try {
        const id = req.body?.id;
        if (!id) {
          res.status(400).json({ success: false, error: "Blog id required" });
          return;
        }

        await query("DELETE FROM blogs WHERE id = $1;", [id]);
        res.json({ success: true });
      } catch (err) {
        next(err);
      }
    },
  );

  return httpServer;
}
