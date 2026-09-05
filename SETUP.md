# Morya setup

1. Create a Supabase project.
2. Run `supabase/schema.sql`.
3. Create an admin user in Supabase Authentication.
4. Copy `.env.example` to `.env`.
5. Put your project URL and anon key in `.env`.
6. `npm install`
7. `npm run dev`

For GitHub Pages, add your repository secrets if your build needs environment variables:
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Never put a Supabase service-role key in frontend code.

The contribution button and bank/QR values are placeholders. Replace them with your real payment details before publishing.
