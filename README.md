# VELOOP Rewards — Giveaway + Watch Ads

A production-style React/Vite frontend and Node/Express backend foundation based on the supplied VELOOP Giveaway assignment.

🌏Live Demo:
https://project-veloop-rewards-giveaways-m3.vercel.app/

✈️ GitHub Repository:
https://github.com/Hansa-prajapat/Project---Veloop---Rewards---Giveaways



## Included

- Premium Giveaway home/banner
- Six configurable Watch Ad cards
- Complete Watch Ad flow:
  - loading
  - countdown timer
  - completion
  - reward-success animation
  - already-watched state
  - no-ads state
- Dynamic stats and daily progress
- Giveaway status lifecycle: ACTIVE / ENDED / UPCOMING
- Prize cards and dedicated giveaway detail routes
- Entry-fee confirmation and balance validation
- Participant / winner / non-winner demo states
- Winners + Previous Winners tabs
- Winner-specific claim modal
- Physical prize and Amazon gift-card claim forms
- FAQ, rules, trust section
- Accessible modal, labels, focus states and alt text
- Responsive 320px+ design
- Backend architecture with Express/Mongoose models, routes, middleware and services
- Mock API mode so the frontend works immediately without MongoDB
- README/API documentation

## Technology

Frontend: React, Vite, Bootstrap, CSS Modules, React Hooks, Lucide React.

Backend: Node.js, Express, MongoDB, Mongoose, JWT-ready auth middleware, validation, rate limiting, fraud checks and centralized errors.

## Run frontend

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Production build

```bash
npm run build
npm run preview
```

## Run backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

MongoDB is required for the real API mode.

## Important demo behavior

The frontend defaults to local mock data so the Watch Ad and Giveaway UX can be demonstrated immediately. It does not pretend that mock winner announcements are real; the UI labels development/demo content where appropriate.

## Watch Ad demo

The dashboard contains exactly six ads configured in `src/data/adData.js`.

Each ad has:
- id
- title
- description
- reward
- currency
- duration
- status
- category
- accent
- eligibility

Click **Watch Ad** → loading → countdown → completion → reward success. After completion, that ad becomes **Already Watched**. If all six are watched, the dashboard shows the **No Ads Available** state. Progress and statistics update from React state.

## Giveaway assignment coverage

The assignment asks for reusable components, structured mock data, responsive UI, loading/error/empty states, winner privacy, winner claim states, dedicated giveaway pages, clear joining costs and backend-ready APIs.

The project follows that structure rather than scattering business rules through components.

## Backend API

See `backend/API.md`.

Key endpoints:
- GET `/api/giveaways/current`
- GET `/api/giveaways/:id`
- GET `/api/giveaways/previous`
- GET `/api/giveaways/:id/my-status`
- POST `/api/giveaways/:id/join`
- GET `/api/giveaways/:id/winners`
- GET `/api/giveaways/previous/winners`
- POST `/api/giveaways/:id/claim`
- GET `/api/giveaways/:id/my-claim`

The join endpoint accepts only the giveaway id. The backend derives the user, fee and currency from trusted server-side data.

## GitHub

Upload the source tree but do not upload `node_modules`, `.env`, credentials or unnecessary build files.

## Deployment

Frontend can be deployed to Vercel/Netlify. Backend can be deployed separately with a MongoDB deployment. Set `VITE_API_BASE_URL` for the frontend when using the real API.

## Screenshots

Add final Desktop, Tablet, Mobile, Active/Ended/Upcoming, Winners, Previous Winners, claim-modal and non-winner screenshots after local testing.

## Disclaimer

All reward amounts, winner IDs, participant counts and giveaway data in this repository are fictional development/demo data unless replaced by a real backend.
