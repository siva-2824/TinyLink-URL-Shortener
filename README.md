# TinyLink-URL-Shortener 

A lightweight bit.ly-style URL shortener built using **Next.js**, **Tailwind CSS**, and **PostgreSQL (Neon)**.  
Implements short-link creation, redirects, click tracking, deletion, stats pages, and all required API endpoints for automated testing.

This project fully follows the TinyLink Take-Home Assignment specification.

---

## 🚀 Live Demo
🔗 **https://<your-vercel-url>**

## 📂 GitHub Repository
🔗 **https://github.com/<your-github-url>**

## 🎥 Video Walkthrough
🔗 **https://youtu.be/<your-youtube-url>**

## 🤖 LLM Transcript (ChatGPT Help Used)
🔗 **https://<your-chatgpt-transcript-link>**

---

# ✅ Features

### ✔ Core Requirements
- Shorten long URLs  
- Optional custom code (globally unique)  
- Regex validation: **`[A-Za-z0-9]{6,8}`**  
- `/:code` → **302 redirect**  
- Redirect updates:  
  - `clicks` count  
  - `last_clicked` timestamp  
- Delete links (removes redirect ability)  
- Responsive dashboard  
- Stats view for individual codes  
- Health check endpoint for autograding  

---

# 🧭 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Dashboard (list + add + delete links) |
| `/code/:code` | Stats page |
| `/:code` | Redirect (302) |
| `/api/healthz` | JSON health check |

---

# 🔌 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| **POST** | `/api/links` | Create link (409 if custom code exists) |
| **GET** | `/api/links` | List all links |
| **GET** | `/api/links/:code` | Stats for a single link |
| **DELETE** | `/api/links/:code` | Delete link |

All endpoints follow the assignment’s exact required structure.

---

# 🏗️ Tech Stack

- **Next.js** (Pages Router)  
- **Node.js**  
- **Tailwind CSS** (UI)  
- **PostgreSQL (Neon)**  
- **pg** client  
- **SWR** for frontend data fetching  

---

# 🗄️ Database Schema

Located at: `migrations/001_create_links.sql`

```sql
CREATE TABLE IF NOT EXISTS links (
  code varchar(8) PRIMARY KEY,
  url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  last_clicked timestamptz,
  clicks bigint DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_url ON links (url);
```
##⚙️ Environment Variables

Create `.env` from `.env.example:`
```
DATABASE_URL=postgresql://<user>:<pass>@<host>:5432/<dbname>
BASE_URL=https://<your-vercel-url>
NEXT_PUBLIC_BASE_URL=https://<your-vercel-url>
NODE_ENV=production
```

Do not commit `.env`.

▶️ Run Locally
1. Install dependencies
``npm install``

2. Run migration (create table)
``psql "$DATABASE_URL" -f migrations/001_create_links.sql``

3. Start development server
``npm run dev``


Visit:
👉 http://localhost:3000

🚀 Deploy to Vercel

Push project to GitHub

Import into Vercel

Add environment variables

Deploy

Test the endpoints using curl or browser

🧪 Testing (Autograder Compatibility)
Health
curl https://<your-vercel-url>/api/healthz

Create Link
```
curl -X POST https://<your-vercel-url>/api/links \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","code":"abc123"}'
```
Duplicate (should return 409)
``` 
curl -i -X POST https://<your-vercel-url>/api/links \
  -H "Content-Type: application/json" \
  -d '{"url":"https://google.com","code":"abc123"}'
```
Redirect (302)
``curl -I https://<your-vercel-url>/abc123``

Delete
``curl -X DELETE https://<your-vercel-url>/api/links/abc123``

After delete → should return 404
``curl -I https://<your-vercel-url>/abc123``

📁 Project Structure
```
tinylink/
 ├─ pages/
 │   ├─ index.js
 │   ├─ [code].js
 │   └─ api/
 │       ├─ links/
 │       │   ├─ index.js
 │       │   └─ [code].js
 │       └─ healthz.js
 ├─ components/
 ├─ lib/
 ├─ styles/
 ├─ migrations/
 ├─ .env.example
 └─ README.md
```
📌 Notes

UI is responsive and minimal.

All logic matches the assignment spec exactly.

Redirect uses atomic DB transaction for click increments.

Project includes clean commits and clear structure.
