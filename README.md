# Angular 21 + Supabase Full-Stack Workshop

A comprehensive software engineering workshop project demonstrating a modern full-stack application with **Angular 21** frontend and **Supabase** backend. This project implements a landing page with user authentication (Google and GitHub OAuth), role-based access control (User & Admin roles), and real-time database integration.

## 🎯 Project Overview

This workshop guides you through building a production-ready full-stack application covering:

- **Frontend**: Angular 21 with Server-Side Rendering (SSR) and Angular Material
- **Backend**: Supabase (PostgreSQL + Real-time APIs)
- **Authentication**: OAuth 2.0 (Google & GitHub)
- **Authorization**: Role-based access control (RBAC)
- **Features**: Landing page, Login, Sign-up, and role-based dashboards

---

## 🛠️ Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Frontend Framework** | Angular | 21.x |
| **UI Library** | Angular Material | 21.x |
| **Backend/Database** | Supabase | 2.x |
| **Database** | PostgreSQL | 14+ |
| **Runtime** | Node.js | 24.13.0 |
| **Package Manager** | npm | 11.6.2+ |
| **Authentication** | OAuth 2.0 | Google & GitHub |
| **Local Supabase** | Docker | 4.77.0+ (Optional) |
| **Deployment** | Vercel | Latest |
| **Version Control** | Git | Latest |

---

## 📋 Prerequisites

Before starting, ensure you have installed:

### Required

1. **Node.js** (v24.13.0+) - [Download](https://nodejs.org/)
2. **npm** (v11.6.2+) - Comes with Node.js
3. **Angular CLI** (v21.x) - Global installation
4. **Git** - [Download](https://git-scm.com/)
5. **Visual Studio Code** - [Download](https://code.visualstudio.com/)
6. **WSL 2** (Windows users) - [Installation Guide](https://learn.microsoft.com/en-us/windows/wsl/install)

### Optional (for Local Development)

7. **GitHub Desktop** - [Download](https://desktop.github.com/)
8. **Docker Desktop** (v4.77.0+) - [Download](https://www.docker.com/products/docker-desktop)
   - Used to run **Supabase locally** with PostgreSQL
   - Alternative: Use the cloud-hosted Supabase project

### Verify Installation

```powershell
# Check Node.js version
node -v
# Expected: v24.13.0 or higher

# Check npm version
npm -v
# Expected: 11.6.2 or higher

# Check Angular CLI version (if installed)
ng version
# Expected: Angular CLI 21.x
```

---

## 📦 Installation Guide

### Step 1: Install Angular CLI Globally

```powershell
npm install -g @angular/cli@21
```

This installs the Angular CLI globally, allowing you to use the `ng` command anywhere on your system.

### Step 2: Verify Angular CLI Installation

```powershell
ng version
```

You should see output similar to:
```
Angular CLI                 : 21.2.15
Node.js                     : 24.13.0
Package Manager             : npm 11.6.2
Operating System            : win32 x64
```

### Step 3: Install Core Dependencies

Navigate to the `angular-supabase-app` directory and install frontend packages:

```powershell
cd angular-supabase-app
npm install
```

This installs all dependencies defined in `package.json`.

### Step 4: Install Angular Animations

Add Angular Animations for enhanced UI interactions:

```powershell
ng add @angular/animations
```

**What it does:**
- Installs `@angular/animations` package
- Updates `angular.json` configuration
- Prepares your app for transition and animation features

### Step 5: Install Angular Material

Add Angular Material for a professional UI component library:

```powershell
ng add @angular/material
```

**Follow the prompts:**
- **Choose a prebuilt theme**: Select `Azure/Blue` (as shown in the workshop images)
- **Include global typography**: `Yes`
- **Include Angular animations**: `Yes`

**What it does:**
- Installs Material components (buttons, forms, cards, dialogs, etc.)
- Configures Material theming
- Adds Roboto font for typography
- Updates your global styles

### Step 6: Install Supabase Client Library

Add Supabase for backend integration:

```powershell
ng add @supabase/supabase-js
```

**What it does:**
- Installs the Supabase JavaScript client
- Enables real-time database and authentication features
- Provides APIs for OAuth integration

---

## 🔐 Setting Up Supabase Backend

### Step 1: Initialize Supabase Locally

```powershell
cd ..
npx supabase init
```

This creates a `supabase/` directory with:
- `config.toml` - Local Supabase configuration
- Database migration files
- Function definitions
- And more...

### Step 2: Configure OAuth Providers

1. Go to [Supabase Console](https://supabase.com)
2. Create a new project or use an existing one
3. Navigate to **Authentication > Providers**
4. Enable and configure:
   - **Google OAuth**
     - Get credentials from [Google Cloud Console](https://console.cloud.google.com/)
     - Add Authorized redirect URIs
   - **GitHub OAuth**
     - Register app at [GitHub Developer Settings](https://github.com/settings/developers)
     - Add Authorization callback URL

### Step 3: Create Database Tables

Execute the following SQL in your Supabase project:

```sql
-- Users table (extends Supabase auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own data
CREATE POLICY "Users can view own user data"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

-- Allow users to update their own data
CREATE POLICY "Users can update own user data"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);
```

---

## ⚙️ Environment Configuration

### Create Environment Files

Create `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'YOUR_SUPABASE_PROJECT_URL',
    anonKey: 'YOUR_SUPABASE_ANON_KEY'
  }
};
```

Create `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  supabase: {
    url: 'YOUR_SUPABASE_PROJECT_URL',
    anonKey: 'YOUR_SUPABASE_ANON_KEY'
  }
};
```

> **Note**: Get your Supabase credentials from **Project Settings > API** in the Supabase Console.

---

## 🚀 Running the Application

### Development Server

Start the Angular development server with Server-Side Rendering:

```powershell
npm start
```

Or explicitly:

```powershell
ng serve
```

**Expected output:**
```
Application bundle generation complete. [X.XXX seconds]

Watch mode enabled. Watching for file changes...

→ Local:   http://localhost:4200/
→ press h + enter to show help
```

### Open in Browser

Navigate to [http://localhost:4200](http://localhost:4200)

### Build for Production

```powershell
npm run build
```

Or:

```powershell
ng build
```

This creates an optimized production build in the `dist/` directory.

---

## � Deployment on Vercel

Vercel is the recommended platform for deploying your Angular 21 application with built-in support for Server-Side Rendering (SSR) and optimal performance.

### Prerequisites for Deployment

- GitHub account with your repository pushed
- Vercel account ([Sign up free](https://vercel.com/signup))
- Supabase project URL and API keys

### Step 1: Push Your Code to GitHub

```powershell
git init
git add .
git commit -m "Initial commit: Angular 21 + Supabase app"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/iet-se-workshop.git
git push -u origin main
```

### Step 2: Connect GitHub to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Select **"Import Git Repository"**
4. Search for and select your repository: `iet-se-workshop`
5. Click **"Import"**

### Step 3: Configure Environment Variables

In the Vercel project settings:

1. Click **"Settings"** → **"Environment Variables"**
2. Add the following variables:

```
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

> Get these values from **Supabase Console > Project Settings > API**

### Step 4: Configure Build Settings (if needed)

Vercel usually auto-detects Angular projects. Verify:

- **Framework**: Angular
- **Build Command**: `npm run build`
- **Output Directory**: `dist/angular-supabase-app/browser`
- **Install Command**: `npm install`

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app will be live at `https://your-project.vercel.app`

### Post-Deployment Steps

1. **Update OAuth Redirect URIs** in Supabase:
   - Go to **Authentication > Providers > OAuth**
   - For Google: Update redirect URIs to include `https://your-project.vercel.app/auth/callback`
   - For GitHub: Update Authorization callback URL

2. **Monitor Your Deployment**:
   - View logs: **Deployments** tab
   - Check performance: **Analytics** tab
   - Monitor errors: **Monitoring** tab

### Continuous Deployment

Once connected:
- Every `git push` to `main` triggers automatic deployment
- Preview deployments for pull requests
- Automatic rollback if build fails

### Useful Vercel Commands

```powershell
# Install Vercel CLI
npm install -g vercel

# Deploy from terminal
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs
```

---

## 🐳 Running Supabase Locally with Docker (Optional)

If you prefer to run Supabase locally instead of using the cloud-hosted version:

### Step 1: Install Docker Desktop

Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop)

### Step 2: Start Supabase Locally

```powershell
cd supabase
supabase start
```

This will:
- Start PostgreSQL database
- Start Supabase API server
- Display local connection credentials

### Step 3: Update Environment Variables

Update `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  supabase: {
    url: 'http://localhost:54321',  // Local Supabase URL
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'  // From supabase start output
  }
};
```

### Step 4: Stop Supabase

```powershell
supabase stop
```

---

## �📁 Project Structure

```
angular-supabase-app/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── landing/              # Landing page component
│   │   │   ├── login/                # Login component with OAuth
│   │   │   ├── signup/               # Sign-up component
│   │   │   ├── dashboard/            # User dashboard
│   │   │   └── admin/                # Admin panel
│   │   ├── services/
│   │   │   ├── auth.service.ts       # Authentication service
│   │   │   ├── supabase.service.ts   # Supabase integration
│   │   │   └── user.service.ts       # User management
│   │   ├── guards/
│   │   │   ├── auth.guard.ts         # Authentication guard
│   │   │   └── role.guard.ts         # Role-based access guard
│   │   ├── app.routes.ts             # Route configuration
│   │   └── app.ts                    # Root component
│   ├── styles.scss                   # Global styles
│   ├── main.ts                       # Application entry point
│   └── main.server.ts                # SSR entry point
├── supabase/
│   └── config.toml                   # Supabase configuration
├── angular.json                      # Angular CLI configuration
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript configuration
└── README.md                         # This file
```

---

## 🎓 Workshop Features to Implement

### Phase 1: Foundation (Day 1)
- [ ] Set up Angular 21 project with SSR
- [ ] Configure Angular Material theming
- [ ] Create responsive landing page layout
- [ ] Set up routing structure

### Phase 2: Authentication (Week 3-4)
- [ ] Implement Supabase authentication service
- [ ] Create login component with form validation
- [ ] Create sign-up component with email verification
- [ ] Integrate Google OAuth flow
- [ ] Integrate GitHub OAuth flow

### Phase 3: Authorization & Roles (Week 5-6)
- [ ] Design and create users database table
- [ ] Implement role assignment logic (User vs Admin)
- [ ] Create route guards for protected pages
- [ ] Build role-based dashboards

### Phase 4: Polish & Deployment (Week 7-8)
- [ ] Add error handling and user feedback
- [ ] Implement loading states and animations
- [ ] Write unit and integration tests
- [ ] Deploy to production on Vercel

---

## 🔑 Key Services to Create

### AuthService
Handles authentication operations:
- Sign up with email/password
- Sign in with OAuth providers
- Sign out
- Session management
- User role retrieval

### SupabaseService
Manages Supabase client:
- Database CRUD operations
- Real-time subscriptions
- File storage operations
- OAuth provider setup

### RoleGuard
Protects routes based on user roles:
- Redirects unauthorized users
- Validates user permissions
- Implements role-based access control

---

## 📚 Useful Commands

```powershell
# Generate a new component
ng generate component components/landing

# Generate a new service
ng generate service services/auth

# Generate a route guard
ng generate guard guards/auth

# Run tests
ng test

# Format code
ng lint

# Build for production with optimization
ng build --configuration production
```

---

## 🔗 Useful Resources

- [Angular 21 Documentation](https://angular.io/docs)
- [Angular Material Components](https://material.angular.io/)
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [OAuth 2.0 Explained](https://oauth.net/2/)
- [Google OAuth Setup](https://developers.google.com/identity/oauth2/web)
- [GitHub OAuth Setup](https://docs.github.com/en/developers/apps/building-oauth-apps)

---

## 📝 Notes for Workshop Participants

1. **Environment Variables**: Never commit `.env` files to version control. Use `.env.example` instead.
2. **Authentication Flow**: OAuth tokens are handled server-side for security.
3. **Database Migrations**: Use Supabase migrations for schema changes.
4. **SSR Benefits**: Server-Side Rendering improves SEO and initial page load performance.
5. **Role-Based Access**: Always validate permissions on both frontend and backend.

---

## 🤝 Contributing

This is a workshop project. Please follow these guidelines:
- Create feature branches for each component
- Write meaningful commit messages
- Test your changes before pushing
- Document your code with comments

---

## 📄 License

This project is provided as-is for educational purposes in the IET Software Engineering Workshop.

---

## ❓ Support

For questions or issues:
- Check the [Discussions](./discussions) section
- Review the [Angular](https://angular.io/) and [Supabase](https://supabase.com/) documentation
- Ask during workshop sessions

---

**Happy coding! 🚀**