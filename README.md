# Favorite Movies & TV Shows Backend (Quick start)

1. Copy repository files into a folder.
2. `cp .env.example .env` and update DB credentials.
3. Install: `npm install`.
4. Start MySQL and create DB: `CREATE DATABASE tv_movie_shows;` or use your DB name and update `.env`.
5. Run seed (optional): `npm run seed` (this uses TypeORM synchronize=true to create tables).
6. Run dev server: `npm run dev`.

 # Favorite Movies & TV Shows Frontend (Quick start)

1. Copy files into a folder.
2. the default backend url: `http://localhost:4000/api`.
3. Install dependencies: `npm install`.
4. Run dev server: `npm run dev`.


Notes:
- The frontend expects the backend API at `/movies` resource (e.g., http://localhost:4000/api/movies).
- The table uses infinite scroll via IntersectionObserver.
- When editing or creating a movie, the frontend dispatches a `movies:changed` custom event to prompt reloading. The MovieTable listens for changes and reloads.
