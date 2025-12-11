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
│   │   │   ├── blogs-admin.tsx     # Admin panel for blogs (internal use only)
│   │   │   ├── news-admin.tsx      # Admin panel for news (internal use only)
│   │   │   └── projects-admin.tsx  # Admin panel for projects (internal use only)
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   └── gtn-navbar.tsx      # Navigation bar (About, Offerings, Join only)
│   │   ├── sections/
│   │   │   ├── gtn-hero.tsx        # Hero with animated map (glow effect left-right)
│   │   │   ├── gtn-about.tsx       # About section
│   │   │   ├── gtn-ongoing-projects.tsx  # Ongoing projects (centered/justified)
│   │   │   ├── gtn-benefits.tsx    # Benefits & Protection
│   │   │   ├── gtn-academy.tsx     # Academy section
│   │   │   ├── gtn-income-projects.tsx   # Income projects
│   │   │   ├── gtn-blog.tsx        # Blog section (displays data from localStorage)
│   │   │   ├── gtn-news.tsx        # News section (displays data from localStorage)
│   │   │   ├── gtn-join.tsx        # Join form (POSTs to your PHP backend)
│   │   │   └── [other sections]
│   └── App.tsx                     # Router setup
├── index.html                      # Meta tags for social sharing
└── public/
    └── gtn-logo.png                # Logo (transparent background)
```

### Page Routes
- `/` - Main homepage (shows all sections: Hero → About → Projects → Benefits → ... → Blog → News → Join Form → CTA)
- `/admin/blogs` - Blog management (add/edit/delete with image upload)
- `/admin/news` - News management (add/edit/delete with image upload)
- `/admin/projects` - Project management (add/edit/delete with image upload)

### Data Storage (Frontend)
Currently using localStorage for:
- `gtn_projects` - Ongoing projects list
- `gtn_blogs` - Blog posts
- `gtn_news` - News items

Images are stored as base64 in localStorage (temporary for prototyping).

---

## Backend Integration with Namecheap PHP

### 1. Join Form Submission
**Current Setup:** Form POSTs to external PHP endpoint (configure in `gtn-join.tsx`)
```javascript
<form
  method="POST"
  action="https://your-cheep-php-endpoint.com/join"
>
```

**PHP Backend Should:**
- Accept POST requests with: fullName, email, phone, country, company
- Validate and sanitize input
- Store in database
- Send confirmation email
- Return success/error response

---

## 2. Blog, News & Projects (CMS Integration)

### Option A: Keep Frontend-Only (Current)
- Admin pages store data in browser localStorage
- Data persists only on user's device
- Good for single-admin setup

### Option B: Integrate with PHP Backend (Recommended for Production)

#### What to Change:
1. **Replace localStorage with API calls**
   - `gtn-blog.tsx` → Fetch from `/api/blogs`
   - `gtn-news.tsx` → Fetch from `/api/news`
   - `gtn-ongoing-projects.tsx` → Fetch from `/api/projects`

2. **Admin Pages API Integration**
   - `blogs-admin.tsx` → POST to `/api/blogs/create`, PUT to `/api/blogs/update`, DELETE to `/api/blogs/delete`
   - `news-admin.tsx` → POST to `/api/news/create`, DELETE to `/api/news/delete`
   - `projects-admin.tsx` → POST to `/api/projects/create`, PUT to `/api/projects/update`, DELETE to `/api/projects/delete`

3. **Image Uploads**
   - Send multipart/form-data to PHP backend
   - Store images on server filesystem or cloud storage
   - Return image URLs for display

---

## 3. Database Schema (MySQL - Namecheap)

```sql
CREATE TABLE blogs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  image LONGBLOB,
  image_url VARCHAR(500),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE news (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image LONGBLOB,
  image_url VARCHAR(500),
  date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  logo LONGBLOB,
  logo_url VARCHAR(500),
  link VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

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

## 4. Building for Production

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

## 5. API Endpoints (Example PHP Structure)

```
/api/
  /blogs/
    - GET /all (fetch all blogs)
    - POST /create (new blog)
    - PUT /:id/update (edit blog)
    - DELETE /:id (delete blog)
  /news/
    - GET /all (fetch all news)
    - POST /create (new news)
    - DELETE /:id (delete news)
  /projects/
    - GET /all (fetch all projects)
    - POST /create (new project)
    - PUT /:id/update (edit project)
    - DELETE /:id (delete project)
  /join/
    - POST /submit (handle join form)
```

---

## 6. Environment Variables (Frontend)
Create `.env` file:
```
VITE_API_URL=https://yourdomain.com/api
```

---

## 7. Key Features Summary

### Sections (Homepage)
1. **Hero** - Animated map with left-right glow effect
2. **About** - Company mission
3. **Ongoing Projects** - Centered/justified project cards with links/images
4. **Membership Benefits** - Core benefits
5. **Academy** - Learning programs
6. **Income Projects** - Revenue opportunities
7. **Platforms** - Tools & platforms
8. **Network Expansion** - Growth section
9. **Support System** - Support structure
10. **Why Choose** - Differentiators
11. **Blog** - Latest articles (admin panel: `/admin/blogs`)
12. **News** - Latest updates (admin panel: `/admin/news`)
13. **Join Form** - POSTs to your PHP backend
14. **CTA** - Final call to action

### Admin Interfaces (Internal Only)
- `/admin/blogs` - Full CRUD for blog posts
- `/admin/news` - Full CRUD for news items
- `/admin/projects` - Full CRUD for ongoing projects

---

## 8. Notes for PHP Backend Developer

### Join Form Data
```json
{
  "fullName": "string",
  "email": "string",
  "phone": "string",
  "country": "string",
  "company": "string (optional)"
}
```

### Blog Post Format
```json
{
  "title": "string",
  "excerpt": "string",
  "author": "string",
  "image": "base64 or file",
  "date": "ISO string"
}
```

### News Format
```json
{
  "title": "string",
  "description": "string",
  "image": "base64 or file",
  "date": "ISO string"
}
```

### Project Format
```json
{
  "name": "string",
  "logo": "base64 or file",
  "link": "string (optional)"
}
```

---

## 9. Development vs Production

### Development (Current)
- Frontend: React with Vite
- Data: localStorage (browser)
- Images: base64 encoded

### Production (Namecheap)
- Frontend: Static HTML/CSS/JS (after build)
- Data: MySQL database
- Images: Server filesystem or CDN
- API: PHP endpoints
- HTTPS: Enable SSL on Namecheap

---

## 10. Security Considerations

1. **Form Validation** - Validate all inputs server-side
2. **SQL Injection** - Use prepared statements
3. **File Uploads** - Validate file types, store outside web root
4. **CORS** - Configure if frontend and backend on different domains
5. **Rate Limiting** - Implement on join form endpoint
6. **Authentication** - Add for admin endpoints (/admin/*)

---

## Contact
This frontend is ready to integrate with your Namecheap + PHP backend.
All frontend routes and structure are finalized as per requirements.
