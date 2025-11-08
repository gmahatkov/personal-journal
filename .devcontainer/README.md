# DevContainer Setup Guide

This project uses VS Code DevContainers to provide a consistent development environment across all team members.

## Prerequisites

- **Docker Desktop**: Install from [docker.com](https://www.docker.com/products/docker-desktop)
  - Windows: Requires WSL2
  - macOS: Native support
  - Linux: Native support
- **VS Code**: Install from [code.visualstudio.com](https://code.visualstudio.com/)
- **Dev Containers Extension**: Install from VS Code marketplace (`ms-vscode-remote.remote-containers`)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Set Up Environment Variables

Copy the example environment file and configure it:

```bash
cp .env.example .env
```

Edit `.env` and add your configuration:

- **DATABASE_URL**: Your Neon PostgreSQL connection string (see Database Setup below)
- **GOOGLE_CLIENT_ID** and **GOOGLE_CLIENT_SECRET**: OAuth credentials from Google Cloud Console
- **AUTH_SECRET** and **AUTH_SALT**: Generate random secrets (see below)

Generate random secrets:

```bash
# For AUTH_SECRET
openssl rand -base64 32

# For AUTH_SALT
openssl rand -base64 32
```

### 3. Open in DevContainer

1. Open the project folder in VS Code
2. When prompted, click "Reopen in Container" (or use Command Palette: `Dev Containers: Reopen in Container`)
3. Wait for the container to build (first time takes 2-5 minutes)
4. The container will automatically:
   - Install Node.js 20 LTS
   - Install pnpm
   - Run `pnpm install` to install dependencies
   - Run `prisma generate` to generate the Prisma client

### 4. Verify Setup

Once the container is running, open a terminal in VS Code and verify:

```bash
# Check Node.js version
node --version  # Should show v20.x.x

# Check pnpm version
pnpm --version  # Should show 8.x.x or higher

# Check database connection
pnpm prisma studio  # Opens Prisma Studio on port 5555
```

## Database Setup (Neon)

This project uses [Neon](https://neon.tech) as the PostgreSQL database provider.

### Create a Neon Account and Database

1. Sign up at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string from the dashboard
4. Add it to your `.env` file as `DATABASE_URL`

### Development Workflow with Neon Branching

Neon supports database branching, which is perfect for development:

1. **Main Branch**: Use for production
2. **Development Branch**: Create a branch for local development

```bash
# Create a development branch (via Neon Console or CLI)
# Then update your .env with the development branch connection string
```

### Run Migrations

```bash
# Apply existing migrations
pnpm prisma migrate deploy

# Create a new migration (if you changed schema.prisma)
pnpm prisma migrate dev --name your_migration_name
```

## Development Workflow

### Start Development Server

```bash
pnpm dev
```

The app will be available at `http://localhost:5173` (automatically forwarded from the container).

### Common Commands

```bash
# Install dependencies
pnpm install

# Run type checking
pnpm check

# Run linting
pnpm lint

# Format code
pnpm format

# Run tests
pnpm test

# Build for production
pnpm build

# Preview production build
pnpm preview

# Open Prisma Studio
pnpm prisma studio  # Available at http://localhost:5555
```

## Installed Extensions

The devcontainer automatically installs these VS Code extensions:

- **Svelte for VS Code**: Syntax highlighting and IntelliSense for Svelte
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Prisma**: Schema syntax highlighting and formatting
- **Tailwind CSS IntelliSense**: Tailwind class name completion

## Port Forwarding

The following ports are automatically forwarded:

- **5173**: Vite development server
- **5555**: Prisma Studio

## Troubleshooting

### Container Won't Start

1. Ensure Docker Desktop is running
2. Check Docker Desktop has enough resources (2GB+ RAM recommended)
3. Try rebuilding the container: Command Palette → `Dev Containers: Rebuild Container`

### Database Connection Fails

1. Verify your `DATABASE_URL` in `.env` is correct
2. Check that your Neon database is active (not paused)
3. Ensure the connection string includes `?sslmode=require`
4. Test connection with: `pnpm prisma db pull`

### Dependencies Not Installing

1. Clear pnpm cache: `pnpm store prune`
2. Remove node_modules: `rm -rf node_modules`
3. Reinstall: `pnpm install`

### Extensions Not Working

1. Reload VS Code window: Command Palette → `Developer: Reload Window`
2. Check that extensions are enabled in the container
3. Rebuild container if issues persist

## Performance Tips

### macOS and Windows

- Docker Desktop performance can vary
- Consider increasing Docker Desktop memory allocation (Settings → Resources)
- Use Docker Desktop's "VirtioFS" file sharing on macOS for better performance

### Linux

- Native Docker performance is generally excellent
- No special configuration needed

## Exiting the DevContainer

To return to your local environment:

1. Command Palette → `Dev Containers: Reopen Folder Locally`
2. Or simply close VS Code

Your work is saved in the project directory and persists outside the container.

## Additional Resources

- [VS Code DevContainers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [Neon Documentation](https://neon.tech/docs)
- [pnpm Documentation](https://pnpm.io/)
- [SvelteKit Documentation](https://kit.svelte.dev/)
