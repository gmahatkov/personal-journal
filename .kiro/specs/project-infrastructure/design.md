# Design Document

## Overview

This design outlines the infrastructure improvements for the image reference management application, including devcontainer setup, pnpm migration, and Vercel deployment optimization. The changes will provide a consistent development environment, faster dependency management, and optimized cloud deployment.

## Architecture

### Development Environment Architecture

```
┌─────────────────────────────────────────┐
│         VS Code + Dev Containers        │
├─────────────────────────────────────────┤
│  ┌───────────────────────────────────┐  │
│  │     Docker Container              │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  Node.js 20 LTS + pnpm      │  │  │
│  │  │  - Svelte Extension         │  │  │
│  │  │  - ESLint/Prettier          │  │  │
│  │  │  - Prisma Extension         │  │  │
│  │  │  - Tailwind Intellisense    │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│      Neon PostgreSQL (Cloud)            │
│      - Development Branch               │
│      - Branching Support                │
└─────────────────────────────────────────┘
```

### Deployment Architecture

```
┌──────────────────────────────────────────┐
│            Vercel Platform               │
├──────────────────────────────────────────┤
│  Build Process:                          │
│  1. pnpm install                         │
│  2. prisma generate                      │
│  3. pnpm build (SvelteKit + Vercel)      │
│                                          │
│  Runtime:                                │
│  - Serverless Functions (API routes)     │
│  - Edge Network (Static assets)          │
│  - Environment Variables                 │
└──────────────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────────┐
│      Neon PostgreSQL (Cloud)             │
│      - Production Branch                 │
│      - Connection Pooling                │
└──────────────────────────────────────────┘
```

## Components and Interfaces

### 1. DevContainer Configuration

**File**: `.devcontainer/devcontainer.json`

**Purpose**: Define the development container environment with all necessary tools and extensions.

**Key Configuration**:

- Base image: `mcr.microsoft.com/devcontainers/typescript-node:20`
- Features: Git, pnpm
- Extensions: Svelte, ESLint, Prettier, Prisma, Tailwind CSS IntelliSense
- Port forwarding: 5173 (Vite dev server), 5555 (Prisma Studio)
- Post-create command: Install dependencies and generate Prisma client

**Note**: No docker-compose.yml needed as the database is hosted on Neon. The devcontainer will connect directly to Neon using the DATABASE_URL environment variable.

### 2. pnpm Configuration

**File**: `pnpm-lock.yaml`

**Purpose**: Lock file for pnpm dependencies (generated automatically).

**File**: `.npmrc`

**Purpose**: Configure pnpm behavior.

**Settings**:

```
shamefully-hoist=true
strict-peer-dependencies=false
auto-install-peers=true
```

**Rationale**:

- `shamefully-hoist=true`: Ensures compatibility with tools expecting flat node_modules
- `strict-peer-dependencies=false`: Prevents installation failures from peer dependency warnings
- `auto-install-peers=true`: Automatically installs peer dependencies

**File**: `package.json` (updated)

**Changes**:

- Update all script commands from `npm` to `pnpm`
- Add `packageManager` field: `"packageManager": "pnpm@8.15.0"`
- Replace `@sveltejs/adapter-node` with `@sveltejs/adapter-vercel`

### 3. Vercel Configuration

**File**: `vercel.json`

**Purpose**: Configure Vercel deployment settings.

**Configuration**:

```json
{
	"buildCommand": "prisma generate && pnpm build",
	"installCommand": "pnpm install",
	"framework": "sveltekit",
	"regions": ["iad1"]
}
```

**File**: `svelte.config.js` (updated)

**Changes**:

- Replace `@sveltejs/adapter-node` with `@sveltejs/adapter-vercel`
- Configure adapter options for edge functions where appropriate

**File**: `.vercelignore`

**Purpose**: Exclude unnecessary files from Vercel deployment.

**Excluded**:

- `.devcontainer/`
- `tests/`
- `*.test.ts`
- `.env.local`
- `node_modules/` (handled by Vercel)

### 4. VS Code Workspace Settings

**File**: `.vscode/settings.json`

**Purpose**: Provide consistent editor settings for all developers.

**Settings**:

- Svelte: Enable type checking
- ESLint: Auto-fix on save
- Prettier: Format on save
- Tailwind CSS: Enable intellisense
- Files: Auto-save configuration

**File**: `.vscode/extensions.json`

**Purpose**: Recommend extensions for developers not using devcontainers.

**Recommended Extensions**:

- `svelte.svelte-vscode`
- `dbaeumer.vscode-eslint`
- `esbenp.prettier-vscode`
- `Prisma.prisma`
- `bradlc.vscode-tailwindcss`

## Data Models

No database schema changes required. This is purely infrastructure work.

## Error Handling

### DevContainer Issues

**Problem**: Container fails to build
**Solution**:

- Provide clear error messages in post-create script
- Include fallback commands for manual setup
- Document common issues in README

**Problem**: Database connection fails
**Solution**:

- Verify DATABASE_URL is set in .env file
- Provide .env.example template with Neon connection string format
- Document Neon branching workflow for development
- Include connection retry logic in application

### pnpm Migration Issues

**Problem**: Existing node_modules conflicts
**Solution**:

- Document clean migration steps (remove node_modules, package-lock.json)
- Add `.gitignore` entries for pnpm-specific files
- Provide migration script if needed

**Problem**: Dependency compatibility issues
**Solution**:

- Use `.npmrc` settings to handle peer dependencies
- Test all scripts after migration
- Document any package-specific workarounds

### Vercel Deployment Issues

**Problem**: Prisma client not generated
**Solution**:

- Include `prisma generate` in build command
- Add postinstall script as backup
- Document environment variable requirements

**Problem**: Build timeouts
**Solution**:

- Optimize build process with pnpm
- Use Vercel's caching effectively
- Consider splitting large dependencies

## Testing Strategy

### DevContainer Testing

1. **Manual Testing**:
   - Open project in VS Code with Dev Containers extension
   - Verify all extensions are installed
   - Verify DATABASE_URL environment variable is loaded
   - Run `pnpm dev` and verify application starts
   - Run `pnpm test` and verify tests pass
   - Connect to Neon database and verify Prisma Studio works

2. **Cross-platform Testing**:
   - Test on Windows (WSL2), macOS, and Linux
   - Verify Docker performance on each platform
   - Document platform-specific issues

3. **Neon Integration Testing**:
   - Verify connection to Neon development branch
   - Test Prisma migrations against Neon
   - Verify connection pooling works correctly

### pnpm Migration Testing

1. **Dependency Installation**:
   - Clean install: Remove node_modules and install with pnpm
   - Verify all dependencies resolve correctly
   - Check for missing peer dependencies

2. **Script Execution**:
   - Run all package.json scripts
   - Verify build output is identical to npm
   - Test development server startup time

3. **CI/CD Compatibility**:
   - Update GitHub Actions (if exists) to use pnpm
   - Verify Vercel build process works

### Vercel Deployment Testing

1. **Preview Deployments**:
   - Create test branch and verify preview deployment
   - Check build logs for errors
   - Verify environment variables are loaded

2. **Production Deployment**:
   - Deploy to production and verify functionality
   - Test API routes and serverless functions
   - Monitor performance metrics

3. **Database Connectivity**:
   - Verify Prisma client connects to production database
   - Test database migrations on Vercel
   - Verify connection pooling works correctly

## Migration Steps

### Phase 1: pnpm Migration (Local)

1. Remove existing npm artifacts:

   ```bash
   rm -rf node_modules package-lock.json
   ```

2. Install pnpm globally (if not installed):

   ```bash
   npm install -g pnpm
   ```

3. Install dependencies with pnpm:

   ```bash
   pnpm install
   ```

4. Update package.json scripts to use pnpm

5. Test all scripts and verify application works

### Phase 2: DevContainer Setup

1. Create `.devcontainer/` directory structure

2. Add devcontainer.json configuration

3. Create .env.example with Neon DATABASE_URL template

4. Add VS Code settings and extensions

5. Test devcontainer build and functionality

6. Verify Neon database connection from devcontainer

### Phase 3: Vercel Optimization

1. Install Vercel adapter:

   ```bash
   pnpm add -D @sveltejs/adapter-vercel
   ```

2. Update svelte.config.js to use Vercel adapter

3. Create vercel.json configuration

4. Update environment variables in Vercel dashboard

5. Test preview deployment

6. Deploy to production

## Performance Considerations

### pnpm Benefits

- **Installation Speed**: 2-3x faster than npm due to content-addressable storage
- **Disk Space**: Saves disk space through hard linking
- **Monorepo Support**: Better support if project grows to monorepo

### Vercel Benefits

- **Edge Network**: Static assets served from CDN
- **Serverless Functions**: Auto-scaling API routes
- **Build Caching**: Faster subsequent deployments
- **Zero-Config**: Optimized for SvelteKit out of the box

### DevContainer Considerations

- **Initial Build Time**: First container build takes 2-5 minutes
- **Subsequent Starts**: Container starts in 10-30 seconds
- **Resource Usage**: Requires Docker Desktop (2GB+ RAM recommended)
- **Consistency**: Eliminates "works on my machine" issues

## Documentation Updates

### README.md Updates

1. Add devcontainer setup instructions
2. Update all npm commands to pnpm
3. Add Vercel deployment guide
4. Document environment variables (including Neon DATABASE_URL)
5. Add Neon branching workflow for development
6. Add troubleshooting section

### New Documentation Files

1. `.devcontainer/README.md`: DevContainer usage guide
2. `docs/DEPLOYMENT.md`: Vercel deployment guide
3. `docs/DEVELOPMENT.md`: Local development setup with Neon
4. `.env.example`: Environment variable template

## Security Considerations

### Environment Variables

- Never commit `.env` files
- Use Vercel's environment variable management
- Document required variables in README
- Use different credentials for dev/prod

### DevContainer Security

- Use official Microsoft devcontainer images
- Keep base images updated
- Don't expose unnecessary ports
- Use non-root user in container

### Vercel Security

- Enable Vercel's security headers
- Use environment variables for secrets
- Enable deployment protection for production
- Review Vercel's security best practices
