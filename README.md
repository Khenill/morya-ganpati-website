# Morya Ganpati Group — final GitHub-ready website

This version is intentionally rebuilt to follow the latest 4-page visual mockup: premium maroon/cream/gold editorial styling, Home/Hero, Story + Events, Gallery + Committee, and Contribution/Footer.

## Backend
GitHub Pages hosts the React frontend. Supabase provides Authentication, PostgreSQL and image Storage. The admin dashboard in the site lets an authenticated admin upload gallery photos.

## Local setup
1. Install Node.js LTS.
2. Copy `.env.example` to `.env` and add your Supabase URL + anon key.
3. Run `npm install`
4. Run `npm run dev`

## Supabase
Run `supabase/schema.sql` in Supabase SQL Editor. Create an admin email/password user in Authentication → Users.

## GitHub Pages
Push the repository to GitHub and use GitHub Pages with a workflow that builds `dist/`. The Vite config uses `base:"./"` for a repository site.
