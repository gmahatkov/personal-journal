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

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run preview          # Preview production build

# Code Quality
npm run check            # Type check
npm run lint             # Run ESLint
npm run format           # Format with Prettier

# Testing
npm test                 # Run all tests
npm run test:unit        # Run Vitest unit tests
npm run test:integration # Run Playwright E2E tests

# Database
npx prisma migrate dev   # Run migrations in dev
npx prisma generate      # Generate Prisma client
npx prisma studio        # Open Prisma Studio GUI
```
