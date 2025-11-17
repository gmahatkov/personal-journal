# Neo-Brutalist Design System - Design Document

## Overview

This design document outlines the implementation of a neo-brutalist design system with dark/light theme support for the image reference management application. The system will extend the existing Flowbite Svelte + Tailwind CSS setup with custom design tokens, component styles, and a Storybook integration for visual documentation and testing.

Neo-brutalism is characterized by:

- Bold, thick borders (2-4px)
- Hard, offset shadows (no blur)
- High contrast color combinations
- Flat, solid colors (no gradients)
- Raw, honest visual language
- Strong geometric shapes
- Clear visual hierarchy

## Architecture

### Design Token System

Design tokens will be implemented as CSS custom properties defined in the root stylesheet, with theme-specific values controlled by a `dark` class on the HTML element. This approach integrates seamlessly with Tailwind CSS and allows runtime theme switching.

**Token Categories:**

1. **Colors**: Primary, secondary, accent, background, surface, text, border
2. **Spacing**: 4px base scale (4, 8, 16, 24, 32, 48, 64)
3. **Typography**: Font families, sizes, weights, line heights
4. **Borders**: Widths (2px, 3px, 4px)
5. **Shadows**: Hard shadow offsets and colors
6. **Transitions**: Duration and easing for theme switches

### Theme Management

A Svelte store will manage theme state and persistence:

- Detects system preference on initial load
- Persists user selection to localStorage
- Provides reactive theme state to components
- Applies theme class to document root

### Component Architecture

Components will be organized in three layers:

1. **Base Components** (`src/lib/frontend/components/base/`): Core reusable components with neo-brutalist styling
2. **Flowbite Wrappers** (`src/lib/frontend/components/wrappers/`): Styled wrappers for Flowbite components that need custom styling
3. **Feature Components** (existing structure): Application-specific components that use base components

### Storybook Integration

Storybook will run alongside the SvelteKit dev server:

- Configured with `@storybook/sveltekit` for proper SvelteKit integration
- Custom theme decorator for light/dark mode switching
- Tailwind CSS and design tokens available in stories
- Organized by component category

## Components and Interfaces

### 1. Theme Store (`src/lib/frontend/stores/theme.ts`)

```typescript
interface ThemeStore {
	// Current theme ('light' | 'dark')
	subscribe: (callback: (theme: Theme) => void) => void;

	// Toggle between themes
	toggle: () => void;

	// Set specific theme
	set: (theme: Theme) => void;

	// Initialize theme from system/storage
	initialize: () => void;
}

type Theme = 'light' | 'dark';
```

**Responsibilities:**

- Detect system theme preference via `prefers-color-scheme`
- Read/write theme preference to localStorage
- Apply theme class to document root
- Provide reactive theme state

### 2. Design Tokens Configuration

**Tailwind Config Extension** (`tailwind.config.js`):

```javascript
theme: {
  extend: {
    colors: {
      // Neo-brutalist color palette
      brutal: {
        // Light theme
        bg: 'var(--brutal-bg)',
        surface: 'var(--brutal-surface)',
        text: 'var(--brutal-text)',
        border: 'var(--brutal-border)',
        // Accent colors
        primary: 'var(--brutal-primary)',
        secondary: 'var(--brutal-secondary)',
        accent: 'var(--brutal-accent)',
        // Semantic colors
        success: 'var(--brutal-success)',
        warning: 'var(--brutal-warning)',
        error: 'var(--brutal-error)',
      }
    },
    borderWidth: {
      '3': '3px',
      '5': '5px',
    },
    boxShadow: {
      'brutal-sm': 'var(--shadow-brutal-sm)',
      'brutal': 'var(--shadow-brutal)',
      'brutal-lg': 'var(--shadow-brutal-lg)',
    }
  }
}
```

**CSS Custom Properties** (`src/app.css`):

```css
:root {
	/* Light theme colors */
	--brutal-bg: #fafafa;
	--brutal-surface: #ffffff;
	--brutal-text: #0a0a0a;
	--brutal-text-secondary: #525252;
	--brutal-border: #0a0a0a;

	--brutal-primary: #ff6b35;
	--brutal-secondary: #4ecdc4;
	--brutal-accent: #ffe66d;

	--brutal-success: #06d6a0;
	--brutal-warning: #ffd23f;
	--brutal-error: #ef476f;

	/* Hard shadows */
	--shadow-brutal-sm: 2px 2px 0px #0a0a0a;
	--shadow-brutal: 4px 4px 0px #0a0a0a;
	--shadow-brutal-lg: 6px 6px 0px #0a0a0a;
}

.dark {
	/* Dark theme colors */
	--brutal-bg: #0a0a0a;
	--brutal-surface: #1a1a1a;
	--brutal-text: #fafafa;
	--brutal-text-secondary: #a3a3a3;
	--brutal-border: #fafafa;

	--brutal-primary: #ff8c61;
	--brutal-secondary: #6fe7dd;
	--brutal-accent: #ffed8f;

	--brutal-success: #2ee5b5;
	--brutal-warning: #ffe066;
	--brutal-error: #ff6b8e;

	/* Hard shadows for dark theme */
	--shadow-brutal-sm: 2px 2px 0px #fafafa;
	--shadow-brutal: 4px 4px 0px #fafafa;
	--shadow-brutal-lg: 6px 6px 0px #fafafa;
}
```

### 3. Base Components

#### Button Component (`src/lib/frontend/components/base/Button.svelte`)

**Props:**

```typescript
interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
	class?: string;
}
```

**Styling Approach:**

- Base classes: `border-3 font-bold transition-all duration-150`
- Variant-specific colors and backgrounds
- Hover state: Shift shadow up and left (`hover:-translate-x-0.5 hover:-translate-y-0.5`)
- Active state: Remove shadow and translate down (`active:translate-x-1 active:translate-y-1 active:shadow-none`)
- Focus state: Bold outline ring

#### Card Component (`src/lib/frontend/components/base/Card.svelte`)

**Props:**

```typescript
interface CardProps {
	variant?: 'default' | 'elevated' | 'bordered';
	padding?: 'none' | 'sm' | 'md' | 'lg';
	class?: string;
}
```

**Styling Approach:**

- Base: `border-3 border-brutal-border bg-brutal-surface`
- Elevated variant: `shadow-brutal-lg`
- Hover effect on interactive cards: Slight shadow shift

#### Input Component (`src/lib/frontend/components/base/Input.svelte`)

**Props:**

```typescript
interface InputProps {
	type?: string;
	value?: string;
	placeholder?: string;
	disabled?: boolean;
	error?: boolean;
	class?: string;
}
```

**Styling Approach:**

- Base: `border-3 border-brutal-border bg-brutal-surface px-4 py-2`
- Focus: `focus:ring-4 focus:ring-brutal-primary focus:border-brutal-primary`
- Error state: `border-brutal-error focus:ring-brutal-error`

#### Badge Component (`src/lib/frontend/components/base/Badge.svelte`)

**Props:**

```typescript
interface BadgeProps {
	variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
	size?: 'sm' | 'md';
	class?: string;
}
```

**Styling Approach:**

- Base: `border-2 font-bold inline-flex items-center`
- High contrast color combinations
- Small shadow for depth

#### Modal Component (`src/lib/frontend/components/base/Modal.svelte`)

**Props:**

```typescript
interface ModalProps {
	open: boolean;
	title?: string;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	class?: string;
}
```

**Styling Approach:**

- Backdrop: Semi-transparent with backdrop blur
- Modal container: `border-5 border-brutal-border shadow-brutal-lg bg-brutal-surface`
- Strong visual hierarchy with bold header border

### 4. Flowbite Component Wrappers

Some Flowbite components will need wrapper components to apply neo-brutalist styling:

**Wrapper Strategy:**

- Import Flowbite component
- Pass through all props
- Apply custom classes via `class` prop
- Override specific slots if needed

**Components Requiring Wrappers:**

- `Dropdown` → `BrutalDropdown`
- `Navbar` → `BrutalNavbar`
- `Sidebar` → `BrutalSidebar`
- `Toast` → `BrutalToast`

### 5. Storybook Configuration

**File Structure:**

```
.storybook/
├── main.ts           # Storybook configuration
├── preview.ts        # Global decorators and parameters
└── theme-decorator.ts # Custom theme switcher decorator

src/stories/
├── Introduction.mdx  # Design system overview
├── Tokens.stories.ts # Design tokens documentation
├── base/
│   ├── Button.stories.ts
│   ├── Card.stories.ts
│   ├── Input.stories.ts
│   ├── Badge.stories.ts
│   └── Modal.stories.ts
└── wrappers/
    └── [Flowbite wrapper stories]
```

**Storybook Configuration** (`.storybook/main.ts`):

```typescript
import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
	stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|ts|svelte)'],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		'@storybook/addon-interactions',
		'@storybook/addon-svelte-csf',
		'@storybook/addon-a11y'
	],
	framework: { name: '@storybook/sveltekit', options: {} }
};

export default config;
```

**Theme Decorator** (`.storybook/preview.ts`):

```typescript
import type { Preview } from '@storybook/svelte';
import '../src/app.css';

const preview: Preview = {
	parameters: { controls: { matchers: { color: /(background|color)$/i, date: /Date$/ } } },
	globalTypes: {
		theme: {
			description: 'Global theme for components',
			defaultValue: 'light',
			toolbar: {
				title: 'Theme',
				icon: 'circlehollow',
				items: ['light', 'dark'],
				dynamicTitle: true
			}
		}
	},
	decorators: [
		(story, context) => {
			const theme = context.globals.theme || 'light';
			document.documentElement.classList.toggle('dark', theme === 'dark');
			return story();
		}
	]
};

export default preview;
```

## Data Models

No database models are required for the design system. All theme preferences are stored in browser localStorage:

```typescript
interface ThemePreference {
	theme: 'light' | 'dark';
	timestamp: number;
}
```

## Error Handling

### Theme Store Errors

**localStorage Access Errors:**

- Gracefully fall back to system preference if localStorage is unavailable
- Log warning to console but don't break functionality
- Continue with in-memory theme state

**System Preference Detection Errors:**

- Default to 'light' theme if `matchMedia` is unavailable
- Provide manual theme toggle as fallback

### Component Rendering Errors

**Missing Design Tokens:**

- Components should have fallback values for critical CSS properties
- Use Tailwind's default values as fallbacks
- Log warnings in development mode

**Storybook Build Errors:**

- Ensure all component dependencies are properly imported
- Provide mock data for components requiring context
- Document any special setup requirements in story files

## Testing Strategy

### Visual Regression Testing

**Storybook + Chromatic (optional):**

- Capture screenshots of all component states
- Compare against baseline on each commit
- Flag visual changes for review

**Manual Testing Checklist:**

- Verify all components in both light and dark themes
- Test theme switching transitions
- Verify contrast ratios meet WCAG AA standards
- Test keyboard navigation and focus states
- Verify responsive behavior at different breakpoints

### Unit Testing

**Theme Store Tests** (Vitest):

- Test theme initialization from system preference
- Test theme persistence to localStorage
- Test theme toggle functionality
- Test localStorage error handling

**Component Tests:**

- Test component rendering with different props
- Test accessibility attributes (ARIA labels, roles)
- Test keyboard interactions
- Test theme-aware styling

### Accessibility Testing

**Automated Testing:**

- Use `@storybook/addon-a11y` for automated accessibility checks
- Run axe-core tests on all component stories
- Verify color contrast ratios programmatically

**Manual Testing:**

- Screen reader testing (VoiceOver on macOS)
- Keyboard-only navigation testing
- Focus indicator visibility testing
- Reduced motion preference testing

### Integration Testing

**Theme Switching:**

- Test theme persistence across page navigation
- Test theme application to dynamically loaded components
- Test theme switching performance (< 100ms)

**Component Integration:**

- Test base components within feature components
- Test Flowbite wrapper compatibility
- Test component composition patterns

## Implementation Phases

### Phase 1: Foundation

1. Set up design tokens in CSS and Tailwind config
2. Create theme store with localStorage persistence
3. Add theme toggle UI component
4. Configure Storybook with SvelteKit

### Phase 2: Base Components

1. Implement Button component with all variants
2. Implement Card component
3. Implement Input component
4. Implement Badge component
5. Implement Modal component
6. Create Storybook stories for each component

### Phase 3: Flowbite Integration

1. Identify Flowbite components needing wrappers
2. Create wrapper components
3. Test wrapper compatibility
4. Document wrapper usage patterns

### Phase 4: Documentation & Polish

1. Create design tokens documentation page in Storybook
2. Write component usage guidelines
3. Add accessibility documentation
4. Create example compositions
5. Perform accessibility audit
6. Optimize theme switching performance

## Design Decisions & Rationales

### CSS Custom Properties vs Tailwind Classes

**Decision:** Use CSS custom properties for theme values, exposed through Tailwind config

**Rationale:**

- Allows runtime theme switching without rebuilding CSS
- Provides single source of truth for theme values
- Integrates seamlessly with Tailwind's utility classes
- Enables smooth transitions between themes

### Hard Shadows vs Soft Shadows

**Decision:** Use hard, offset shadows with no blur

**Rationale:**

- Core characteristic of neo-brutalism aesthetic
- Creates strong visual hierarchy
- Provides clear depth perception
- Performs better (no blur calculations)

### Component Library Structure

**Decision:** Three-layer architecture (base, wrappers, features)

**Rationale:**

- Clear separation of concerns
- Reusable base components
- Maintains Flowbite compatibility
- Easy to extend and maintain

### Storybook Integration

**Decision:** Use `@storybook/sveltekit` with custom theme decorator

**Rationale:**

- Proper SvelteKit integration (aliases, routing)
- Visual component development and testing
- Living documentation for design system
- Accessibility testing integration
- Team collaboration tool

### Theme Storage

**Decision:** localStorage with system preference fallback

**Rationale:**

- Persists user preference across sessions
- Respects user's system settings by default
- Works without backend/authentication
- Graceful degradation if unavailable

### Color Palette

**Decision:** High contrast, vibrant colors with distinct light/dark variants

**Rationale:**

- Meets WCAG AA contrast requirements
- Aligns with neo-brutalist aesthetic
- Provides clear visual feedback
- Maintains readability in both themes
- Suitable for design tool context (designers appreciate bold colors)
