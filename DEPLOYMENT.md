# Deployment Guide: Vantage Platform

This guide covers how to deploy the Vantage platform to various hosting providers.

## Prerequisites

- Node.js installed locally
- A Git repository for your project (optional but recommended)

## Build the Project

Before deploying, you must create a production-ready build:

```bash
npm run build
```

The output will be in the `dist/` directory.

## Hosting Options

### 1. Vercel (Recommended)
Vercel is the easiest way to deploy a Vite-based React application.
- Install Vercel CLI: `npm i -g vercel`
- Run `vercel` in the project root.
- The `vercel.json` included in this project handles SPA routing automatically.

### 2. Netlify
- Create a new site from Git or drag-and-drop the `dist/` folder.
- Build command: `npm run build`
- Publish directory: `dist`
- The `public/_redirects` file handles SPA routing.

### 3. GitHub Pages
If you are hosting on GitHub Pages (e.g., `https://username.github.io/repo-name/`):
- Update `base` in `vite.config.js` to `'/repo-name/'`.
- Use the `gh-pages` package: `npm install gh-pages --save-dev`.
- Add deployment scripts to `package.json`.

### 4. Custom VPS (SupaBase, DigitalOcean, etc.)
- Use a web server like Nginx or Apache.
- For Nginx, ensure you have a fallback to `index.html` for SPA routing:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

## Environment Variables
If you add any security keys or API URLs in the future, create a `.env` file on your hosting provider with the keys defined in `.env.example`.
