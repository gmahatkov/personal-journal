# Tech Stack

## Core Framework

- **SvelteKit** - Full-stack framework with SSR
- **Svelte 4** - Component framework
- **TypeScript** - Strict mode enabled
- **Vite** - Build tool and dev server

## Backend

- **Prisma** - ORM for PostgreSQL
- **PostgreSQL** - Primary database
- **Auth.js (@auth/sveltekit)** - Authentication with Prisma adapter
- **googleapis** - Google Drive API integration
- **sharp** - Image processing

## Frontend

- **Tailwind CSS** - Utility-first styling
- **Flowbite Svelte** - UI component library
- **Popper.js** - Positioning engine for tooltips/popovers

## Development Tools

- **ESLint** - Linting with TypeScript and Svelte plugins
- **Prettier** - Code formatting
- **Playwright** - E2E testing
- **Vitest** - Unit testing
- **svelte-check** - Type checking for Svelte

## Deployment

- **@sveltejs/adapter-node** - Node.js production adapter
- **Docker** - Containerization support

## Package Manager

- **pnpm** - Fast, disk space efficient package manager (NOT npm or yarn)

## Common Commands

```bash
# Package Management
pnpm install             # Install dependencies
pnpm add <package>       # Add a dependency
pnpm add -D <package>    # Add a dev dependency

# Development
pnpm dev                 # Start dev server
pnpm build               # Production build
pnpm preview             # Preview production build

# Code Quality
pnpm check               # Type check
pnpm lint                # Run ESLint
pnpm format              # Format with Prettier

# Testing
pnpm test                # Run all tests
pnpm test:unit           # Run Vitest unit tests
pnpm test:integration    # Run Playwright E2E tests

# Database
pnpm prisma migrate dev  # Run migrations in dev
pnpm prisma generate     # Generate Prisma client
pnpm prisma studio       # Open Prisma Studio GUI

# Storybook
pnpm storybook           # Start Storybook dev server
pnpm build-storybook     # Build Storybook static site
```
