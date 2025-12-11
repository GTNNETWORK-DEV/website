# GTN Website - Deployment Guide for Namecheap + PHP Backend

## Frontend Structure (React/Vite)
The frontend is a complete React application that will be built and deployed as static files.

### Directory Structure
```
client/
├── src/
│   ├── pages/
│   │   ├── gtn-home.tsx           # Main homepage with all sections
│   │   ├── admin/
│   │   │   ├── login.tsx           # Admin login page
│   │   │   └── dashboard.tsx       # Main admin dashboard with sidebar
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── admin/                  # Admin Dashboard Components
│   │   │   ├── projects-manager.tsx
│   │   │   ├── events-manager.tsx
│   │   │   ├── news-manager.tsx
│   │   │   └── blogs-manager.tsx
│   │   ├── layout/
│   │   │   └── gtn-navbar.tsx      # Navigation bar (About, Offerings, Projects, Join)
│   │   ├── sections/
│   │   │   ├── gtn-hero.tsx        # Hero with static map & glow animation
│   │   │   ├── gtn-about.tsx       # About section
│   │   │   ├── gtn-ongoing-projects.tsx  # Ongoing projects
│   │   │   ├── gtn-ongoing-events.tsx    # Ongoing events (just below projects)
│   │   │   ├── gtn-benefits.tsx    # Benefits & Protection
│   │   │   ├── gtn-academy.tsx     # Academy section
│   │   │   ├── gtn-income-projects.tsx   # Income projects
│   │   │   ├── gtn-blog.tsx        # Blog section (displays data)
│   │   │   ├── gtn-news.tsx        # News section (displays data)
│   │   │   ├── gtn-join.tsx        # Join form (POSTs to your PHP backend)
│   │   │   └── [other sections]
│   └── App.tsx                     # Router setup
├── index.html                      # Meta tags for social sharing
└── public/
    └── gtn-logo.png                # Logo (transparent background)
```

### Page Routes
- `/` - Main homepage
- `/admin` - Admin Login (User: `admin`, Pass: `admin@123`)
- `/admin/dashboard` - Unified Admin Panel (Projects, Events, News, Blogs)

---

## Backend Integration with Namecheap PHP

### 1. Admin Authentication
**Credentials:**
- Username: `admin`
- Password: `admin@123`

**Recommendation:**
In production, implement a secure PHP login endpoint (`/api/login`) that returns a JWT token or session cookie instead of hardcoded frontend credentials.

### 2. Database Schema (MySQL - Namecheap)

Create these tables in your MySQL database:

```sql
-- Admin Users
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- Insert default admin (you should hash the password 'admin@123' properly in PHP)
INSERT INTO users (username, password_hash) VALUES ('admin', 'HASHED_PASSWORD_HERE');

-- Blogs
CREATE TABLE blogs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  image LONGBLOB, -- Or use image_url if storing files on disk
  image_url VARCHAR(500),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- News
CREATE TABLE news (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image LONGBLOB,
  image_url VARCHAR(500),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ongoing Projects
CREATE TABLE projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  logo LONGBLOB,
  logo_url VARCHAR(500),
  link VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ongoing Events
CREATE TABLE events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  image LONGBLOB,
  image_url VARCHAR(500),
  event_date DATE,
  location VARCHAR(255),
  link VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Join Requests
CREATE TABLE join_requests (
  id INT PRIMARY KEY AUTO_INCREMENT,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL,
  company VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 3. Building for Production

### Build Frontend
```bash
npm run build
```

This generates optimized static files in `dist/` folder.

### Deploy to Namecheap
1. FTP/Upload the `dist/` folder contents to your Namecheap public_html
2. Set up .htaccess for React Router (SPA):
```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

---

## 4. API Endpoints (PHP Implementation Required)

You need to build PHP scripts to handle these requests. The frontend is currently using `localStorage` for prototyping. You will need to replace the `useEffect` and `useState` data fetching logic in the Admin Components (`client/src/components/admin/*.tsx`) with `fetch()` calls to your PHP API.

**Example Structure:**
```
public_html/
  api/
    login.php
    blogs.php (handle GET, POST, DELETE)
    news.php
    projects.php
    events.php
    join.php
```

---

## 5. Security Checklist
1. **Change Default Password:** Immediately change `admin@123` to a strong password.
2. **Secure API:** Ensure `/api/*` endpoints check for authentication (session or token) before allowing edits.
3. **HTTPS:** Ensure SSL is active on your domain.
