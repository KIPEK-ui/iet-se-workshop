# Supabase Setup — Local & Cloud

This document covers initializing Supabase for the workshop, running locally (via Docker) and configuring OAuth providers (Google & GitHub).

## Options

- Cloud-hosted Supabase (recommended for workshop ease)
- Local Supabase (Docker) — good for offline development or demonstration

## Supabase CLI (local initialization)

```powershell
# from repo root
npx supabase init
# starts a supabase/ directory with config.toml and migrations
```

### Start local Supabase (requires Docker Desktop)

```powershell
cd supabase
supabase start
```

This will start PostgreSQL, the API gateway, and other Supabase local services. The CLI prints the local `anon` key and URL.

### Stop Supabase

```powershell
supabase stop
```

## Environment variables (local)

Update `src/environments/environment.ts` with values printed by `supabase start`:

```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'http://localhost:54321',
    anonKey: 'YOUR_LOCAL_ANON_KEY'
  }
};
```

## Cloud project setup (Supabase Console)

1. Create a Supabase project at https://app.supabase.com
2. Copy `Project URL` and `anon` key from **Project Settings > API**
3. Add those values to your environment files or to Vercel environment variables.

## OAuth Providers

### Google

1. Go to Google Cloud Console → Credentials → Create OAuth client ID
2. Authorized redirect URI must include your domain, e.g.:
   - `http://localhost:4200/auth/callback` (dev)
   - `https://your-project.vercel.app/auth/callback` (prod)
3. Copy Client ID and Client Secret into Supabase Console under **Authentication > Providers > Google**

### GitHub

1. Go to GitHub Settings → Developer settings → OAuth Apps → Register new app
2. Set Authorization callback URL to your app's callback URI
3. Add Client ID/Secret to Supabase Console under **Authentication > Providers > GitHub**

## Database schema (example)

Run this SQL in the Supabase SQL editor or via migration:

```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own user data"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own user data"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);
```

## Migrations

- Use `supabase migration` tooling to create and apply migrations
- Commit migration files to version control

## Testing auth locally

- Start local Supabase
- Use the Supabase client from your frontend to initiate OAuth flows
- Ensure redirect URIs in provider configs match where your app is served

## Backups & Secrets

- Rotate keys if leaked
- Use Vault or Vercel environment variables for production secrets

## Helpful commands

```powershell
# initialize supabase folder
npx supabase init

# start supabase services (docker required)
supabase start

# stop services
supabase stop

# create a migration
supabase migration new add-users-table

# apply migrations
supabase db push
```

## Notes

- For the workshop, cloud-hosted Supabase is easiest; Docker is optional and used only if you want local emulation.
- Make sure OAuth redirect URIs are configured for both dev (localhost) and prod (Vercel).
