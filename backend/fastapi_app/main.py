import os
import time
import hmac
import hashlib
import secrets
from pathlib import Path
from typing import Optional, List, Generator
from datetime import date, datetime

from fastapi import (
    FastAPI,
    Depends,
    HTTPException,
    UploadFile,
    File,
    Form,
    Response,
    Request,
)
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import create_engine, func, text
from sqlalchemy.orm import sessionmaker, DeclarativeBase, Mapped, mapped_column, Session
from sqlalchemy import String, Text, Date, DateTime
from pydantic import BaseModel, ConfigDict

# --------------------
# Environment
# --------------------
DATABASE_URL = os.getenv("DATABASE_URL")
if not DATABASE_URL:
    raise RuntimeError("DATABASE_URL is required for the FastAPI backend")

# Prefer psycopg3 driver even if URL is provided without it
if DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg://", 1)

PG_SSLMODE = os.getenv("PGSSLMODE", "require")

ADMIN_USER = os.getenv("ADMIN_USER", "admin")
ADMIN_PASS = os.getenv("ADMIN_PASS", "admin@123")
SESSION_SECRET = os.getenv("SESSION_SECRET", "change-me")
default_origins = [
    "https://gtnnetwork.com",
    "https://www.gtnnetwork.com",
    "https://website-chi-two-94.vercel.app",
    "http://localhost:3000",
    "http://localhost:5000",
    "http://localhost:5173",
]
raw_origins = os.getenv("ALLOWED_ORIGINS")
ALLOWED_ORIGINS = (
    [o.strip() for o in raw_origins.split(",") if o.strip()]
    if raw_origins
    else default_origins
)
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "true").lower() == "true"
COOKIE_SAMESITE = "none" if COOKIE_SECURE else "lax"

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)
UPLOAD_BASE_URL = os.getenv("UPLOAD_BASE_URL")

# --------------------
# Database setup
# --------------------
engine = create_engine(
    DATABASE_URL,
    connect_args={"sslmode": PG_SSLMODE},
)


class Base(DeclarativeBase):
    pass


class Project(Base):
    __tablename__ = "projects"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    logo_url: Mapped[Optional[str]] = mapped_column(Text)
    link: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[Optional[DateTime]] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )


class Event(Base):
    __tablename__ = "events"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    event_date: Mapped[Optional[str]] = mapped_column(Date)
    location: Mapped[Optional[str]] = mapped_column(Text)
    link: Mapped[Optional[str]] = mapped_column(Text)
    image_url: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[Optional[DateTime]] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )


class News(Base):
    __tablename__ = "news"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    image_url: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[Optional[DateTime]] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )


class Blog(Base):
    __tablename__ = "blogs"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    excerpt: Mapped[str] = mapped_column(Text, nullable=False)
    author: Mapped[str] = mapped_column(Text, nullable=False)
    image_url: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[Optional[DateTime]] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )


class JoinRequest(Base):
    __tablename__ = "join_requests"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    full_name: Mapped[str] = mapped_column(Text, nullable=False)
    email: Mapped[Optional[str]] = mapped_column(Text)
    whatsapp: Mapped[Optional[str]] = mapped_column(Text)
    country: Mapped[Optional[str]] = mapped_column(Text)
    company: Mapped[Optional[str]] = mapped_column(Text)
    created_at: Mapped[Optional[DateTime]] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )


Base.metadata.create_all(bind=engine)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def ensure_join_columns() -> None:
    """Ensure legacy join_requests table has expected columns."""
    with engine.begin() as conn:
        conn.execute(
            text(
                "ALTER TABLE IF EXISTS join_requests "
                "ADD COLUMN IF NOT EXISTS whatsapp TEXT"
            )
        )
        conn.execute(
            text(
                "ALTER TABLE IF EXISTS join_requests "
                "ADD COLUMN IF NOT EXISTS country TEXT"
            )
        )
        conn.execute(
            text(
                "ALTER TABLE IF EXISTS join_requests "
                "ADD COLUMN IF NOT EXISTS company TEXT"
            )
        )
        conn.execute(
            text(
                "ALTER TABLE IF EXISTS join_requests "
                "ADD COLUMN IF NOT EXISTS email TEXT"
            )
        )


ensure_join_columns()


def sync_sequences() -> None:
    """Ensure Postgres sequences are ahead of current max ids."""
    tables = ("projects", "events", "news", "blogs", "join_requests")
    with engine.begin() as conn:
        for table in tables:
            conn.execute(
                text(
                    f"""
                    SELECT setval(
                        pg_get_serial_sequence('{table}', 'id'),
                        GREATEST((SELECT COALESCE(MAX(id), 0) + 1 FROM {table}), 1),
                        false
                    );
                    """
                )
            )


sync_sequences()


def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# --------------------
# Schemas
# --------------------
class ProjectOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    logo_url: Optional[str] = None
    link: Optional[str] = None
    created_at: Optional[datetime] = None


class EventOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    name: str
    event_date: Optional[date] = None
    location: Optional[str] = None
    link: Optional[str] = None
    image_url: Optional[str] = None
    created_at: Optional[datetime] = None


class NewsOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    description: str
    image_url: Optional[str] = None
    created_at: Optional[datetime] = None


class BlogOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    title: str
    excerpt: str
    author: str
    image_url: Optional[str] = None
    created_at: Optional[datetime] = None


class JoinRequestOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: int
    full_name: str
    email: Optional[str] = None
    whatsapp: Optional[str] = None
    country: Optional[str] = None
    company: Optional[str] = None
    created_at: Optional[datetime] = None


# --------------------
# Auth helpers
# --------------------
COOKIE_NAME = "gtn_session"
SESSION_TTL_SECONDS = 60 * 60 * 24 * 7  # 7 days


def _sign(value: str) -> str:
    sig = hmac.new(SESSION_SECRET.encode(), value.encode(), hashlib.sha256).hexdigest()
    return sig


def create_session_token(username: str) -> str:
    ts = str(int(time.time()))
    base = f"{username}|{ts}"
    return f"{base}|{_sign(base)}"


def validate_session_token(token: str) -> bool:
    try:
        username, ts, sig = token.split("|", 2)
    except ValueError:
        return False

    base = f"{username}|{ts}"
    if not hmac.compare_digest(_sign(base), sig):
        return False

    try:
        ts_int = int(ts)
    except ValueError:
        return False

    if time.time() - ts_int > SESSION_TTL_SECONDS:
        return False

    return username == ADMIN_USER


def require_admin(request: Request):
    token = request.cookies.get(COOKIE_NAME)
    if token and validate_session_token(token):
        return True
    raise HTTPException(status_code=401, detail="Unauthorized")


# --------------------
# App
# --------------------
app = FastAPI(title="GTN FastAPI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_origin_regex=".*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if not UPLOAD_DIR.exists():
    UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")


@app.middleware("http")
async def add_cors_headers(request: Request, call_next):
    """
    Ensure every response carries permissive CORS headers and that
    OPTIONS preflight requests return quickly.
    """
    origin = request.headers.get("origin")

    if request.method == "OPTIONS":
        response = Response(status_code=200)
    else:
        response = await call_next(request)

    if origin:
        response.headers["Access-Control-Allow-Origin"] = origin  # echo caller
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Vary"] = "Origin"
    else:
        response.headers["Access-Control-Allow-Origin"] = "*"

    response.headers["Access-Control-Allow-Methods"] = "GET, POST, DELETE, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"

    return response


@app.get("/api/health")
def health(db: Session = Depends(get_db)):
    try:
        db.execute("SELECT 1;")
        return {"success": True, "status": "ok"}
    except Exception as exc:  # pragma: no cover - simple connectivity check
        raise HTTPException(status_code=500, detail=str(exc))


@app.post("/api/login")
async def login(request: Request, response: Response):
    data = {}
    if request.headers.get("content-type", "").startswith("application/json"):
        data = await request.json()
    else:
        data = dict(await request.form())

    username = (data.get("username") or "").strip()
    password = data.get("password") or ""

    if username == ADMIN_USER and password == ADMIN_PASS:
        token = create_session_token(username)
        response.set_cookie(
            COOKIE_NAME,
            token,
            max_age=SESSION_TTL_SECONDS,
            httponly=True,
            secure=COOKIE_SECURE,
            samesite=COOKIE_SAMESITE,
        )
        return {"success": True}

    raise HTTPException(status_code=401, detail="Invalid credentials")


@app.post("/api/logout")
def logout(response: Response):
    response.delete_cookie(COOKIE_NAME)
    return {"success": True}


@app.get("/api/session")
def session(request: Request):
    token = request.cookies.get(COOKIE_NAME)
    return {"authenticated": bool(token and validate_session_token(token))}


@app.post("/api/upload")
async def upload_file(
    _: bool = Depends(require_admin),
    file: UploadFile = File(...),
):
    if not file:
        raise HTTPException(status_code=400, detail="No file received")

    if not (file.content_type or "").startswith("image/"):
        raise HTTPException(status_code=400, detail="Only image files allowed")

    original_name = Path(file.filename or "file").name
    ext = "".join(Path(original_name).suffixes)
    safe_name = "".join(c for c in Path(original_name).stem if c.isalnum() or c in ("-", "_"))
    final_name = f"{int(time.time())}_{safe_name or 'file'}_{secrets.token_hex(4)}{ext}"
    dest = UPLOAD_DIR / final_name

    with dest.open("wb") as out_file:
        content = await file.read()
        out_file.write(content)

    relative_url = f"/uploads/{final_name}"
    public_url = (
        f"{UPLOAD_BASE_URL.rstrip('/')}{relative_url}"
        if UPLOAD_BASE_URL
        else relative_url
    )

    return {"success": True, "url": public_url}


# --------------------
# CRUD helpers
# --------------------
def form_or_query_id(id_form: Optional[int], id_query: Optional[int]) -> int:
    id_val = id_form or id_query
    if not id_val:
        raise HTTPException(status_code=400, detail="id is required")
    return int(id_val)


# Projects
@app.get("/api/projects", response_model=List[ProjectOut])
def get_projects(db: Session = Depends(get_db)):
    projects = db.query(Project).order_by(Project.created_at.desc()).all()
    return projects


@app.post("/api/projects")
def create_project(
    name: str = Form(...),
    logo_url: Optional[str] = Form(None),
    link: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin),
):
    project = Project(name=name.strip(), logo_url=logo_url, link=link)
    db.add(project)
    db.commit()
    db.refresh(project)
    return {"success": True, "project": ProjectOut.model_validate(project)}


@app.delete("/api/projects")
def delete_project(
    id: Optional[int] = Form(None),
    id_query: Optional[int] = None,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin),
):
    project_id = form_or_query_id(id, id_query)
    deleted = db.query(Project).filter(Project.id == project_id).delete()
    db.commit()
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Project not found")
    return {"success": True}


# Events
@app.get("/api/events", response_model=List[EventOut])
def get_events(db: Session = Depends(get_db)):
    events = db.query(Event).order_by(Event.created_at.desc()).all()
    return events


@app.post("/api/events")
def create_event(
    name: str = Form(...),
    event_date: Optional[str] = Form(None),
    location: Optional[str] = Form(None),
    link: Optional[str] = Form(None),
    image_url: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin),
):
    event_date_value = None
    if event_date:
        try:
            event_date_value = date.fromisoformat(event_date)
        except ValueError:
            raise HTTPException(status_code=400, detail="event_date must be YYYY-MM-DD")

    event = Event(
        name=name.strip(),
        event_date=event_date_value,
        location=location,
        link=link,
        image_url=image_url,
    )
    db.add(event)
    db.commit()
    db.refresh(event)
    return {"success": True, "event": EventOut.model_validate(event)}


@app.delete("/api/events")
def delete_event(
    id: Optional[int] = Form(None),
    id_query: Optional[int] = None,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin),
):
    event_id = form_or_query_id(id, id_query)
    deleted = db.query(Event).filter(Event.id == event_id).delete()
    db.commit()
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Event not found")
    return {"success": True}


# News
@app.get("/api/news", response_model=List[NewsOut])
def get_news(db: Session = Depends(get_db)):
    news_items = db.query(News).order_by(News.created_at.desc()).all()
    return news_items


@app.post("/api/news")
def create_news(
    title: str = Form(...),
    description: str = Form(...),
    image_url: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin),
):
    news_item = News(
        title=title.strip(),
        description=description.strip(),
        image_url=image_url,
    )
    db.add(news_item)
    db.commit()
    db.refresh(news_item)
    return {"success": True, "news": NewsOut.model_validate(news_item)}


@app.delete("/api/news")
def delete_news(
    id: Optional[int] = Form(None),
    id_query: Optional[int] = None,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin),
):
    news_id = form_or_query_id(id, id_query)
    deleted = db.query(News).filter(News.id == news_id).delete()
    db.commit()
    if deleted == 0:
        raise HTTPException(status_code=404, detail="News not found")
    return {"success": True}


# Blogs
@app.get("/api/blogs", response_model=List[BlogOut])
def get_blogs(db: Session = Depends(get_db)):
    blogs = db.query(Blog).order_by(Blog.created_at.desc()).all()
    return blogs


@app.post("/api/blogs")
def create_blog(
    title: str = Form(...),
    excerpt: str = Form(...),
    author: str = Form(...),
    image_url: Optional[str] = Form(None),
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin),
):
    blog = Blog(
        title=title.strip(),
        excerpt=excerpt.strip(),
        author=author.strip(),
        image_url=image_url,
    )
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return {"success": True, "blog": BlogOut.model_validate(blog)}


@app.delete("/api/blogs")
def delete_blog(
    id: Optional[int] = Form(None),
    id_query: Optional[int] = None,
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin),
):
    blog_id = form_or_query_id(id, id_query)
    deleted = db.query(Blog).filter(Blog.id == blog_id).delete()
    db.commit()
    if deleted == 0:
        raise HTTPException(status_code=404, detail="Blog not found")
    return {"success": True}


# Join Requests
@app.post("/api/join", response_model=JoinRequestOut)
def create_join_request(
    full_name: str = Form(...),
    email: Optional[str] = Form(None),
    whatsapp: Optional[str] = Form(None),
    country: Optional[str] = Form(None),
    company: Optional[str] = Form(None),
    db: Session = Depends(get_db),
):
    name_clean = full_name.strip()
    if not name_clean:
        raise HTTPException(status_code=400, detail="full_name is required")

    join_request = JoinRequest(
        full_name=name_clean,
        email=email.strip() if email else None,
        whatsapp=whatsapp.strip() if whatsapp else None,
        country=country.strip() if country else None,
        company=company.strip() if company else None,
    )
    db.add(join_request)
    db.commit()
    db.refresh(join_request)
    return JoinRequestOut.model_validate(join_request)


@app.get("/api/join", response_model=List[JoinRequestOut])
def list_join_requests(
    db: Session = Depends(get_db),
    _: bool = Depends(require_admin),
):
    requests = db.query(JoinRequest).order_by(JoinRequest.created_at.desc()).all()
    return requests


# --------------------
# Legacy .php route aliases (for compatibility with existing frontend bundles)
# --------------------
legacy_routes = [
    ("POST", "/api/login.php", login),
    ("POST", "/api/logout.php", logout),
    ("GET", "/api/session.php", session),
    ("POST", "/api/upload.php", upload_file),
    ("GET", "/api/projects.php", get_projects),
    ("POST", "/api/projects.php", create_project),
    ("DELETE", "/api/projects.php", delete_project),
    ("GET", "/api/events.php", get_events),
    ("POST", "/api/events.php", create_event),
    ("DELETE", "/api/events.php", delete_event),
    ("GET", "/api/news.php", get_news),
    ("POST", "/api/news.php", create_news),
    ("DELETE", "/api/news.php", delete_news),
    ("GET", "/api/blogs.php", get_blogs),
    ("POST", "/api/blogs.php", create_blog),
    ("DELETE", "/api/blogs.php", delete_blog),
    ("POST", "/api/join.php", create_join_request),
    ("GET", "/api/join.php", list_join_requests),
]

for method, path, handler in legacy_routes:
    app.add_api_route(
        path,
        handler,
        methods=[method],
        include_in_schema=False,
    )


if __name__ == "__main__":  # pragma: no cover
    import uvicorn

    uvicorn.run(
        "fastapi_app.main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", "8000")),
        reload=True,
    )
