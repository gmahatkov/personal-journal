# Project Structure

## Directory Organization

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
├── params/            # Route parameter matchers
└── hooks.server.ts    # SvelteKit server hooks

prisma/
├── schema.prisma      # Database schema
└── migrations/        # Database migrations
```

## Key Conventions

### Routing

- Use SvelteKit's file-based routing in `src/routes/`
- API routes go in `src/routes/api/` with `+server.ts` files
- Page routes use `+page.svelte` and `+page.server.ts`
- Layout files: `+layout.svelte` and `+layout.server.ts`

### Code Organization

- **Server-only code** must be in `src/lib/server/` (never imported on client)
- **Frontend code** goes in `src/lib/frontend/`
- **Shared types** go in `src/lib/types/`
- Use `$lib` alias for imports from `src/lib/`

### API Routes

- Use the `useAPIRoutes` utility from `$lib/server/utils/APIRoute.ts`
- Protect routes with role-based access control via `protectedRoutes` parameter
- Returns 401 for unauthorized, 501 for unimplemented methods

### Authentication

- Auth.js handles authentication via `hooks.server.ts`
- Access session via `event.locals.auth()`
- User roles defined in Prisma schema (currently: EDITOR)
- Protected handles check user role before allowing access

### Database

- Prisma client accessed via `$lib/server/data/utils/db.ts`
- Run migrations before deploying
- Use Prisma enums for type-safe role management

### Components

- Organize components by feature in `src/lib/frontend/components/`
- Component folders use PascalCase (e.g., `AppImageSearch/`)
- Flowbite Svelte provides base UI components

### Styling

- Tailwind CSS with Flowbite plugin
- Custom theme colors defined in `tailwind.config.js`
- Component styles use Tailwind utility classes
