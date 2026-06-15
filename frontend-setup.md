# Frontend Setup — Angular 21 (Landing Page + Auth)

This document explains how to set up the frontend for the Angular 21 + Supabase workshop: a landing page, login/signup components, and OAuth flows (Google & GitHub).

## Prerequisites

- Node.js v24.x
- npm v11+
- Angular CLI v21
- (Optional) VS Code

## Project setup

```powershell
# from repo root
cd angular-supabase-app
npm install
```

## Install global CLI (if needed)

```powershell
npm install -g @angular/cli@21
ng version
```

## Add optional libraries

```powershell
# animations
ng add @angular/animations

# Angular Material (follow prompts to pick theme and features)
ng add @angular/material

# Supabase client
ng add @supabase/supabase-js
```

## Environments

Create or update `src/environments/environment.ts` and `src/environments/environment.prod.ts` with your Supabase URL and anon key:

```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'YOUR_SUPABASE_PROJECT_URL',
    anonKey: 'YOUR_SUPABASE_ANON_KEY'
  }
};
```

Never commit secrets to git; use environment variables in CI/CD.

## Generate application scaffolding

```powershell
# components
ng generate component components/landing
ng generate component components/login
ng generate component components/signup
ng generate component components/dashboard
ng generate component components/admin

# services and guards
ng generate service services/auth
ng generate service services/supabase
ng generate guard guards/auth
ng generate guard guards/role
```

## Auth service (high level)

- Use the Supabase JS client to signIn/signUp and to handle OAuth:
  - `supabase.auth.signInWithOAuth({ provider: 'google' })`
  - `supabase.auth.signInWithOAuth({ provider: 'github' })`
- Keep session state in a service and expose user observable for guards and UI.

## Routing

- Public routes: `/`, `/login`, `/signup`
- Protected routes: `/dashboard` (user), `/admin` (admin)
- Use `AuthGuard` and `RoleGuard` to check `auth` state and `role` field from your `users` table.

## Development server

```powershell
npm start
# or
ng serve
```

Open `http://localhost:4200`.

## Build & Deploy

```powershell
# production build
ng build --configuration production
```

For deployment to Vercel, push repo to GitHub and connect Vercel; set `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Vercel environment variables.

## Useful Commands

```powershell
# run unit tests
ng test

# lint
ng lint

# format (if using prettier/eslint)
npm run format
```

## Notes

- Keep UI and auth logic separated; services should be testable and small.
- For SSR support verify Angular Universal configuration (the project scaffold may include `main.server.ts`).
- Update OAuth redirect URIs in Supabase to match your dev and production domains.
