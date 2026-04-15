# Persona Portfolio Plus

A modern personal portfolio built with React, TypeScript, and Tailwind CSS.

## Project Overview

This project is a single-page portfolio website used to present:

- Professional profile and summary
- Experience, projects, skills, and education
- Contact and collaboration details

It includes:

- Bilingual content support (French and English)
- Theme support (light and dark)
- Animated section reveals and polished UI components
- Contact form integration through a form endpoint (Formspree-style)

## Tech Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- React Router

## Project Structure

- `src/pages/Index.tsx`: Main page composition
- `src/components/sections/`: Portfolio sections (Hero, Projects, Contact, etc.)
- `src/contexts/LanguageContext.tsx`: Language state and translations
- `public/assets/`: Static assets used by sections and projects
- `.env.example`: Environment variable template

## Run Locally

Prerequisites:

- Node.js 18+
- npm

Install and run:

```bash
npm install
npm run dev
```

The app runs on the local Vite development server.

## Environment Variables

Copy `.env.example` to `.env` and set your values:

```bash
VITE_CONTACT_NOTIFICATION_EMAIL=abdessamadrami51@gmail.com
VITE_CONTACT_FORM_ENDPOINT=https://formspree.io/f/your_form_id
VITE_VISIT_NOTIFICATION_EMAIL=abdessamadrami51@gmail.com
VITE_VISIT_FORM_ENDPOINT=https://formspree.io/f/your_form_id
VITE_VISIT_NOTIFY_COOLDOWN_HOURS=12
```

Notes:

- If `VITE_CONTACT_FORM_ENDPOINT` is empty, contact falls back to `mailto:`.
- `VITE_VISIT_*` values are optional and can fall back to contact settings.

## Build and Preview

```bash
npm run build
npm run preview
```

## How to Push This Project to GitHub

### Option 1: Existing repository (most common)

```bash
git add .
git commit -m "Update project"
git push
```

### Option 2: First push to a new GitHub repository

1. Create an empty repository on GitHub.
2. Run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

### Optional branch workflow

```bash
git checkout -b feature/my-change
git add .
git commit -m "Describe change"
git push -u origin feature/my-change
```

Then open a Pull Request on GitHub.
