# DevContainer Setup Guide

This project includes a DevContainer configuration for a consistent development environment across all team members.

## Prerequisites

- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- [Visual Studio Code](https://code.visualstudio.com/) with the [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)

## Getting Started

1. **Set up environment variables**:
   - Copy `.env.example` to `.env` in the project root
   - Add your Neon PostgreSQL `DATABASE_URL` to the `.env` file
   - The devcontainer will automatically mount this file

2. **Open in DevContainer**:
   - Open the project in VS Code
   - Press `F1` or `Cmd/Ctrl+Shift+P` to open the command palette
   - Select "Dev Containers: Reopen in Container"
   - Wait for the container to build (first time takes 2-5 minutes)

3. **Verify setup**:
   - The container will automatically run `pnpm install` and `prisma generate`
   - All VS Code extensions will be installed automatically
   - Ports 5173 (dev server) and 5555 (Prisma Studio) are forwarded

## What's Included

### Development Tools
- Node.js 20 LTS
- pnpm 8.x package manager
- Git

### VS Code Extensions
- **Svelte for VS Code** - Svelte language support
- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **Prisma** - Database schema support
- **Tailwind CSS IntelliSense** - Tailwind class completion

### Port Forwarding
- **5173** - Vite development server
- **5555** - Prisma Studio (database GUI)

## Common Tasks

### Start Development Server
```bash
pnpm dev
```

### Run Prisma Studio
```bash
npx prisma studio
```

### Run Database Migrations
```bash
npx prisma migrate dev
```

### Run Tests
```bash
pnpm test
```

## Troubleshooting

### Container fails to build
- Ensure Docker Desktop is running
- Try rebuilding: `F1` → "Dev Containers: Rebuild Container"
- Check Docker Desktop has enough resources (2GB+ RAM recommended)

### Database connection fails
- Verify `DATABASE_URL` is set in `.env` file
- Check the connection string format matches Neon's requirements
- Ensure your Neon database is accessible from your network

### Extensions not loading
- Rebuild the container: `F1` → "Dev Containers: Rebuild Container"
- Check the extensions are listed in `.devcontainer/devcontainer.json`

### pnpm commands not working
- The container should have pnpm pre-installed
- If missing, run: `npm install -g pnpm`

## Platform-Specific Notes

### Windows (WSL2)
- Ensure WSL2 is enabled and Docker Desktop is configured to use it
- Store the project in the WSL2 filesystem for better performance
- Access via `\\wsl$\Ubuntu\home\...` in Windows Explorer

### macOS
- Docker Desktop on Apple Silicon (M1/M2) works with the devcontainer
- First build may take longer on Apple Silicon

### Linux
- Ensure your user is in the `docker` group
- Run: `sudo usermod -aG docker $USER` and restart

## Environment Variables

The devcontainer automatically mounts your `.env` file. Required variables:

- `DATABASE_URL` - Neon PostgreSQL connection string
- `AUTH_SECRET` - Auth.js secret (for authentication)
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

See `.env.example` for the complete list and format.
