# ☕ Code & Coffee Portfolio

A modern, Firebase-powered developer portfolio built with React, TypeScript, Vite, shadcn/ui, and Tailwind CSS. Content is managed dynamically via Firestore, with an admin panel for real-time updates.

## 🚀 Live Site

Deployed to GitHub Pages: [https://skodi.github.io/portfolio/](https://skodi.github.io/portfolio/)

## ✨ Features

- 🌗 Light / Dark mode toggle
- 🔥 Firebase Firestore for dynamic content (hero, about, projects, skills, contact)
- 🔐 Firebase Authentication for admin access
- 📝 Admin panel to manage all portfolio sections
- 📨 Contact form submission via Formspree
- 📱 Fully responsive design
- ⚡ Fast builds with Vite + Bun
- 🚢 CI/CD via GitHub Actions → GitHub Pages

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Firebase (Firestore + Auth) |
| Package Manager | Bun |
| Deployment | GitHub Pages |

## 🏃 Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed
- A Firebase project with Firestore and Authentication enabled
- A [Formspree](https://formspree.io) form endpoint for contact submissions

### Installation

```sh
# 1. Clone the repository
git clone https://github.com/skodi/code-coffee-portfolio.git
cd code-coffee-portfolio

# 2. Install dependencies
bun install

# 3. Set up environment variables
cp .env.example .env
# Fill in your Firebase config values in .env

# 4. Start the development server
bun run dev
```

### Environment Variables

Create a `.env` file at the project root with the following keys:

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FORMSPREE_ENDPOINT=
```

## 📦 Deployment

Pushes to the `main` branch automatically build and deploy to GitHub Pages via the included GitHub Actions workflow (`.github/workflows/deploy.yml`).

For this exact URL to work, the GitHub repository name must be `portfolio`.

Add the Firebase environment variables above as **repository secrets** in **Settings → Secrets and variables → Actions**.

## 📁 Project Structure

```
src/
├── assets/          # Static images
├── components/      # UI sections (Hero, About, Projects, Skills, Contact, …)
│   └── ui/          # shadcn/ui primitives
├── contexts/        # Auth context
├── hooks/           # Custom hooks (useSiteData, …)
├── lib/             # Firebase config & Firestore helpers
└── pages/           # Route pages (Index, Admin, Login, NotFound)
```

## 📄 License

MIT
