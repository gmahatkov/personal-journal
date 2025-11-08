# Image Reference Management Tool

An image reference management tool designed for UX/UI designers to organize and search screenshots from cloud storage providers. Connect to Google Drive (with more providers coming soon) and organize images using hashtags for quick retrieval.

## Features

- OAuth authentication with Google Drive
- Image loading from cloud storage (no local uploads)
- Role-based access control
- PostgreSQL database with Prisma ORM
- Server-side rendering with SvelteKit

## Tech Stack

- **Frontend**: SvelteKit, Svelte 4, TypeScript, Tailwind CSS, Flowbite Svelte
- **Backend**: Node.js, Prisma ORM, Auth.js
- **Database**: PostgreSQL (hosted on Neon)
- **Deployment**: Vercel
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- **Node.js 20 LTS** or higher
- **pnpm 8.x** or higher
- **Docker Desktop** (if using DevContainer)
- **Neon Account** for PostgreSQL database

### Option 1: DevContainer Setup (Recommended)

The easiest way to get started is using VS Code DevContainers, which provides a fully configured development environment.

1. **Install Prerequisites**:
   - [Docker Desktop](https://www.docker.com/products/docker-desktop)
   - [VS Code](https://code.visualstudio.com/)
   - [Dev Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

2. **Clone and Configure**:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   cp .env.example .env
   ```

3. **Set Up Environment Variables**:
   Edit `.env` and configure:
   - `DATABASE_URL`: Your Neon PostgreSQL connection string
   - `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: OAuth credentials
   - `AUTH_SECRET` and `AUTH_SALT`: Generate with `openssl rand -base64 32`

4. **Open in DevContainer**:
   - Open the project in VS Code
   - Click "Reopen in Container" when prompted
   - Wait for the container to build and dependencies to install

5. **Start Developing**:
   ```bash
   pnpm dev
   ```

See [.devcontainer/README.md](.devcontainer/README.md) for detailed DevContainer documentation.

### Option 2: Local Setup

If you prefer to develop locally without Docker:

1. **Install pnpm**:

   ```bash
   npm install -g pnpm
   ```

2. **Clone and Install**:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   pnpm install
   ```

3. **Configure Environment**:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration (see Environment Variables section below).

4. **Set Up Database**:

   ```bash
   pnpm prisma generate
   pnpm prisma migrate deploy
   ```

5. **Start Development Server**:
   ```bash
   pnpm dev
   ```

## Environment Variables

Create a `.env` file in the project root with the following variables:

### Required Variables

- **`DATABASE_URL`**: PostgreSQL connection string from Neon
  - Format: `postgresql://user:password@host/database?sslmode=require`
  - Get from [Neon Console](https://console.neon.tech)

- **`AUTH_SECRET`**: Secret for Auth.js session encryption
  - Generate: `openssl rand -base64 32`

- **`AUTH_SALT`**: Salt for Auth.js password hashing
  - Generate: `openssl rand -base64 32`

- **`GOOGLE_CLIENT_ID`**: OAuth client ID from Google Cloud Console
  - Create at [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

- **`GOOGLE_CLIENT_SECRET`**: OAuth client secret from Google Cloud Console

### Optional Variables

- **`AUTH_RESEND_KEY`**: API key for Resend email service (if using email notifications)
- **`DOMAIN_NAME`**: Your domain name for production

See `.env.example` for a complete template.

## Database Setup (Neon)

This project uses [Neon](https://neon.tech) as the PostgreSQL provider.

### Create a Neon Database

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string from the dashboard
4. Add it to your `.env` file as `DATABASE_URL`

### Development Workflow with Neon Branching

Neon supports database branching for isolated development:

1. **Production Branch**: Use the main branch for production
2. **Development Branch**: Create a branch for local development
   - Go to Neon Console → Branches → Create Branch
   - Use the development branch connection string in your local `.env`

### Run Migrations

```bash
# Apply existing migrations
pnpm prisma migrate deploy

# Create a new migration (after schema changes)
pnpm prisma migrate dev --name migration_name

# Open Prisma Studio to view/edit data
pnpm prisma studio
```

## Development

### Common Commands

```bash
# Development
pnpm dev              # Start dev server (http://localhost:5173)
pnpm build            # Production build
pnpm preview          # Preview production build

# Code Quality
pnpm check            # Type check
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier

# Testing
pnpm test             # Run all tests
pnpm test:unit        # Run Vitest unit tests
pnpm test:integration # Run Playwright E2E tests

# Database
pnpm prisma migrate dev    # Run migrations in dev
pnpm prisma generate       # Generate Prisma client
pnpm prisma studio         # Open Prisma Studio GUI
pnpm prisma db pull        # Pull schema from database
pnpm prisma db push        # Push schema to database (dev only)
```

### Project Structure

```
src/
├── routes/              # SvelteKit file-based routing
│   ├── api/            # API endpoints (+server.ts files)
│   ├── app/            # Protected app pages
│   └── signin/         # Authentication pages
├── lib/
│   ├── frontend/       # Client-side code
│   │   ├── actions/   # Svelte actions
│   │   ├── components/ # Svelte components
│   │   └── stores/    # Svelte stores
│   ├── server/        # Server-only code
│   │   ├── auth/      # Authentication logic
│   │   ├── data/      # Data layer (Prisma)
│   │   ├── services/  # Business logic services
│   │   └── utils/     # Server utilities
│   ├── types/         # Shared TypeScript types
│   └── config/        # Configuration constants
└── hooks.server.ts    # SvelteKit server hooks

prisma/
├── schema.prisma      # Database schema
└── migrations/        # Database migrations
```

## Deployment (Vercel)

This project is optimized for deployment on Vercel.

### Prerequisites

- Vercel account ([vercel.com](https://vercel.com))
- Neon production database

### Deploy to Vercel

1. **Connect Repository**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository

2. **Configure Build Settings**:
   - Framework Preset: SvelteKit
   - Build Command: `prisma generate && pnpm build`
   - Install Command: `pnpm install`
   - Output Directory: `.vercel/output` (auto-detected)

3. **Set Environment Variables**:
   Add the following in Vercel Dashboard → Settings → Environment Variables:
   - `DATABASE_URL`: Your Neon production connection string
   - `AUTH_SECRET`: Same as local (or generate new for production)
   - `AUTH_SALT`: Same as local (or generate new for production)
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
   - `DOMAIN_NAME`: Your production domain (optional)

4. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your application
   - Preview deployments are created automatically for pull requests

### Vercel Configuration

The project includes a `vercel.json` configuration file:

```json
{
	"buildCommand": "prisma generate && pnpm build",
	"installCommand": "pnpm install",
	"framework": "sveltekit"
}
```

### Database Migrations on Vercel

Migrations are applied during the build process via the `prisma generate` command. For production migrations:

```bash
# Run migrations against production database
DATABASE_URL="your-production-url" pnpm prisma migrate deploy
```

**Important**: Always test migrations on a Neon branch before applying to production.

## Package Manager (pnpm)

This project uses **pnpm** instead of npm for faster installs and better disk space efficiency.

### Why pnpm?

- **2-3x faster** than npm
- **Saves disk space** through content-addressable storage
- **Strict dependency resolution** prevents phantom dependencies
- **Better monorepo support** for future scaling

### Installing pnpm

```bash
# Using npm
npm install -g pnpm

# Using Homebrew (macOS)
brew install pnpm

# Using Corepack (Node.js 16.13+)
corepack enable
corepack prepare pnpm@latest --activate
```

### pnpm Commands

pnpm commands are similar to npm:

```bash
pnpm install          # Install dependencies
pnpm add <package>    # Add dependency
pnpm remove <package> # Remove dependency
pnpm run <script>     # Run script
pnpm dev              # Run dev script
```

### Migration from npm

If you previously used npm:

```bash
# Remove npm artifacts
rm -rf node_modules package-lock.json

# Install with pnpm
pnpm install
```

## Troubleshooting

### Database Connection Issues

- Verify `DATABASE_URL` in `.env` is correct
- Ensure Neon database is active (not paused)
- Check connection string includes `?sslmode=require`
- Test with: `pnpm prisma db pull`

### Build Failures

- Clear build cache: `rm -rf .svelte-kit build`
- Regenerate Prisma client: `pnpm prisma generate`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`

### DevContainer Issues

- Ensure Docker Desktop is running
- Rebuild container: Command Palette → `Dev Containers: Rebuild Container`
- Check Docker Desktop has 2GB+ RAM allocated

### pnpm Issues

- Clear pnpm cache: `pnpm store prune`
- Update pnpm: `pnpm add -g pnpm`
- Check `.npmrc` configuration

## Contributing

1. Create a feature branch from `main`
2. Make your changes
3. Run tests and linting: `pnpm test && pnpm lint`
4. Format code: `pnpm format`
5. Submit a pull request

## License

[Your License Here]

## Resources

- [SvelteKit Documentation](https://kit.svelte.dev/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [pnpm Documentation](https://pnpm.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
