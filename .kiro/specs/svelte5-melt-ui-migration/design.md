# Design Document

## Overview

This design outlines the migration strategy from Svelte 4 to Svelte 5 and the replacement of Flowbite with Melt UI. The migration will be executed in phases to minimize risk and ensure continuous functionality. The design maintains the neo-brutalist aesthetic while adopting modern Svelte patterns and a more flexible component architecture.

### Key Goals

1. Upgrade to Svelte 5 with runes-based reactivity
2. Replace Flowbite with Melt UI for better customization and accessibility
3. Maintain all existing functionality and visual design
4. Ensure zero regressions in user experience
5. Update development tooling and documentation

### Migration Strategy

The migration will follow a phased approach:

**Phase 1: Dependency Updates**

- Update Svelte and SvelteKit to version 5
- Install Melt UI and remove Flowbite dependencies
- Update build configuration and tooling

**Phase 2: Core Infrastructure**

- Migrate stores to Svelte 5 patterns
- Update TypeScript configurations
- Migrate utility functions and actions

**Phase 3: Base Components**

- Convert base components to Svelte 5 runes syntax
- Replace Flowbite usage with native implementations or Melt UI
- Maintain neo-brutalist styling

**Phase 4: Wrapper Components**

- Rename BrutalDropdown to Dropdown and migrate to Melt UI's dropdown builder
- Rename BrutalNavbar to Navbar and migrate to Melt UI patterns
- Update all imports and usages throughout the application

**Phase 5: Application Routes**

- Update page components to Svelte 5 syntax
- Migrate layout components
- Update form handling patterns

**Phase 6: Storybook Validation**

- Update Storybook configuration for Svelte 5
- Migrate all component stories

**Phase 7: Testing and Validation**

- Update test utilities for Svelte 5
- Run full test suite
- Perform manual QA

## Architecture

### Component Architecture

```
src/lib/frontend/components/
├── base/                    # Design system primitives
│   ├── Button.svelte       # Native button with neo-brutalist styling
│   ├── Card.svelte         # Native card component
│   ├── Modal.svelte        # Melt UI dialog builder
│   ├── form/
│   │   ├── Input.svelte    # Native input with styling
│   │   ├── Select.svelte   # Melt UI select builder
│   │   ├── Checkbox.svelte # Native checkbox
│   │   ├── Radio.svelte    # Melt UI radio group builder
│   │   ├── Toggle.svelte   # Melt UI switch builder
│   │   └── Textarea.svelte # Native textarea
│   └── typography/         # Native typography components
└── wrappers/               # Composed components
    ├── Dropdown.svelte        # Melt UI dropdown builder (renamed from BrutalDropdown)
    └── Navbar.svelte          # Composition of base components (renamed from BrutalNavbar)
```

### Reactivity Patterns

**Svelte 4 (Current):**

```svelte
<script lang="ts">
	export let count = 0;
	$: doubled = count * 2;
	$: {
		console.log('count changed:', count);
	}
</script>
```

**Svelte 5 (Target):**

```svelte
<script lang="ts">
	let { count = 0 }: { count?: number } = $props();
	let doubled = $derived(count * 2);
	$effect(() => {
		console.log('count changed:', count);
	});
</script>
```

### Store Patterns

**Current (Svelte 4):**

```typescript
import { writable } from 'svelte/store';
export const theme = writable<Theme>('light');
```

**Target (Svelte 5):**
Stores remain compatible, but component usage changes:

```svelte
<script lang="ts">
	import { theme } from '$lib/stores/theme';
	// Still use $ prefix for auto-subscription
	// Or use get() for one-time reads
</script>

<div class={$theme === 'dark' ? 'dark' : 'light'}>
	<!-- content -->
</div>
```

## Components and Interfaces

### Melt UI Integration

Melt UI provides headless builders that return stores and action functions. We'll wrap these in our styled components.

**Example: Dropdown Component**

```svelte
<script lang="ts">
	import { createDropdownMenu } from '@melt-ui/svelte';
	import type { Placement } from '@floating-ui/dom';

	let {
		open = $bindable(false),
		placement = 'bottom',
		class: className = ''
	}: {
		open?: boolean;
		placement?: Placement;
		class?: string;
	} = $props();

	const {
		elements: { trigger, menu, item },
		states: { open: openState }
	} = createDropdownMenu({
		positioning: { placement },
		open: { get: () => open, set: (v) => (open = v) }
	});

	// Neo-brutalist styling
	const menuClasses = 'border-3 border-brutal-border shadow-brutal bg-brutal-surface';
</script>

<div use:melt={$menu} class="{menuClasses} {className}">
	<slot {item} />
</div>
```

### Component Migration Patterns

#### Simple Components (Button, Card)

- Remove Flowbite imports
- Implement native HTML elements with styling
- Convert props to $props() rune
- Maintain existing prop interfaces

#### Complex Components (Modal, Select, Dropdown)

- Use Melt UI builders for accessibility and behavior
- Wrap with neo-brutalist styling
- Convert reactive statements to $derived
- Use $effect for side effects

#### Form Components

- Input, Textarea, Checkbox: Native HTML with styling
- Select, Radio, Toggle: Melt UI builders for better UX
- Maintain form validation patterns
- Ensure accessibility attributes

### TypeScript Interfaces

```typescript
// Base component props
interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
	class?: string;
	onclick?: (event: MouseEvent) => void;
}

interface CardProps {
	variant?: 'default' | 'elevated' | 'bordered';
	padding?: 'none' | 'sm' | 'md' | 'lg';
	href?: string;
	class?: string;
}

// Melt UI wrapper props
interface DropdownProps {
	open?: boolean;
	placement?: Placement;
	trigger?: 'click' | 'hover';
	class?: string;
}
```

## Data Models

### Theme Store Model

```typescript
type Theme = 'light' | 'dark';

interface ThemeStore {
	subscribe: (fn: (theme: Theme) => void) => () => void;
	set: (theme: Theme) => void;
	toggle: () => void;
	initialize: () => void;
}
```

### Component State Models

```typescript
// Dropdown state (from Melt UI)
interface DropdownState {
	open: Readable<boolean>;
	selected: Readable<string | undefined>;
}

// Modal state (from Melt UI)
interface DialogState {
	open: Readable<boolean>;
}

// Select state (from Melt UI)
interface SelectState {
	value: Readable<string | undefined>;
	open: Readable<boolean>;
}
```

##

Correctness Properties

_A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees._

After reviewing the prework analysis, several properties were identified as redundant or overlapping. The following properties represent the unique, non-redundant correctness guarantees for this migration:

### Property 1: Runes usage consistency

_For all_ migrated Svelte components, reactive state should use Svelte 5 runes ($state, $derived, $effect) and not legacy reactive declarations ($:)
**Validates: Requirements 1.2, 3.1, 6.1**

### Property 2: Props pattern consistency

_For all_ migrated Svelte components, props should be declared using the $props() rune with TypeScript types and not export let syntax
**Validates: Requirements 1.3, 3.2, 6.2**

### Property 3: Derived values pattern

_For all_ components with computed values, those values should use the $derived rune
**Validates: Requirements 3.3**

### Property 4: Side effects pattern

_For all_ components with side effects, those effects should use the $effect rune instead of reactive statements
**Validates: Requirements 3.4**

### Property 5: Event handler modernization

_For all_ components with event handlers, they should use modern syntax (onclick, onsubmit) compatible with Svelte 5
**Validates: Requirements 3.5**

### Property 6: Store usage pattern

_For all_ components that access store values, they should use either the $ prefix for auto-subscription or the get() function for one-time reads
**Validates: Requirements 7.2**

### Property 7: Store reactivity

_For all_ store updates, components subscribed to that store should trigger reactive updates
**Validates: Requirements 7.3**

### Property 8: Custom store contract

_For all_ custom stores, they should implement the Svelte store contract (subscribe method returning unsubscribe function)
**Validates: Requirements 7.4**

### Property 9: Story syntax consistency

_For all_ Storybook story files, they should use Svelte 5-compatible syntax
**Validates: Requirements 5.5**

### Property 10: Form handling patterns

_For all_ form components, they should use Svelte 5-compatible form handling patterns
**Validates: Requirements 6.3**

### Property 11: Layout slot patterns

_For all_ layout components, they should use Svelte 5 slot syntax and patterns
**Validates: Requirements 6.5**

### Property 12: Test reactivity patterns

_For all_ component tests, they should correctly test runes-based reactivity
**Validates: Requirements 10.4**

## Error Handling

### Migration Errors

**Build Errors:**

- Svelte 5 introduces stricter type checking
- Components must properly type $props() destructuring
- Error messages will indicate missing or incorrect types
- Solution: Add explicit TypeScript interfaces for all props

**Runtime Errors:**

- Incorrect rune usage can cause runtime errors
- $effect must not return values (use $derived instead)
- $state must be used for mutable state
- Solution: Follow Svelte 5 rune guidelines strictly

**Melt UI Integration Errors:**

- Melt UI builders return stores and actions
- Must use `use:melt` directive correctly
- Positioning requires @floating-ui/dom
- Solution: Follow Melt UI documentation patterns

### Backward Compatibility

**Breaking Changes:**

1. `export let` syntax no longer works for props
2. Reactive declarations ($:) are deprecated
3. Event handlers use new syntax (on:click → onclick)
4. Component events require explicit event dispatching
5. Slots have new syntax for typed slots

**Mitigation Strategy:**

- Update all components systematically
- Use TypeScript to catch breaking changes
- Run full test suite after each phase
- Maintain feature parity during migration

### Fallback Strategies

**If Melt UI doesn't meet needs:**

- Implement native HTML with ARIA attributes
- Use Svelte's built-in transition and animation
- Maintain accessibility through manual implementation

**If Svelte 5 causes issues:**

- Svelte 4 and 5 can coexist during migration
- Use `svelte.config.js` to configure compatibility mode
- Gradually migrate components one at a time

## Testing Strategy

### Dual Testing Approach

This migration requires both unit testing and property-based testing to ensure correctness:

- **Unit tests** verify specific examples, edge cases, and integration points
- **Property tests** verify universal properties hold across all components
- Together they provide comprehensive coverage: unit tests catch concrete bugs, property tests verify general correctness

### Unit Testing

**Component Testing:**

- Test each migrated component renders correctly
- Test prop changes trigger updates
- Test event handlers fire correctly
- Test accessibility attributes are present
- Use @testing-library/svelte for component tests

**Integration Testing:**

- Test user flows with Playwright
- Test navigation between pages
- Test form submissions
- Test theme switching
- Test dropdown and modal interactions

**Store Testing:**

- Test theme store toggle functionality
- Test localStorage persistence
- Test store subscriptions and updates
- Test custom store implementations

**Example Unit Tests:**

```typescript
// Button component test
test('Button renders with correct variant classes', () => {
	const { container } = render(Button, { variant: 'primary' });
	expect(container.querySelector('button')).toHaveClass('bg-brutal-primary');
});

// Theme store test
test('Theme store toggles between light and dark', () => {
	const store = createThemeStore();
	let value;
	store.subscribe((v) => (value = v));

	store.toggle();
	expect(value).toBe('dark');

	store.toggle();
	expect(value).toBe('light');
});
```

### Property-Based Testing

**Property Testing Library:**
We will use **fast-check** for property-based testing in TypeScript/JavaScript. Fast-check is the standard PBT library for JavaScript and integrates well with Vitest.

**Configuration:**

- Each property-based test should run a minimum of 100 iterations
- Tests should be tagged with comments referencing the design document property
- Tag format: `// Feature: svelte5-melt-ui-migration, Property {number}: {property_text}`

**Property Test Examples:**

```typescript
import fc from 'fast-check';
import { test } from 'vitest';

// Feature: svelte5-melt-ui-migration, Property 1: Runes usage consistency
test('all migrated components use runes not reactive declarations', () => {
	fc.assert(
		fc.property(
			fc.array(fc.string()), // component file paths
			(componentPaths) => {
				for (const path of componentPaths) {
					const content = readComponentFile(path);
					// Should not contain $: reactive declarations
					expect(content).not.toMatch(/\$:\s*\w+\s*=/);
					// Should use runes if reactive
					if (hasReactiveState(content)) {
						expect(content).toMatch(/\$(state|derived|effect)/);
					}
				}
			}
		),
		{ numRuns: 100 }
	);
});

// Feature: svelte5-melt-ui-migration, Property 2: Props pattern consistency
test('all migrated components use $props() not export let', () => {
	fc.assert(
		fc.property(
			fc.array(fc.string()), // component file paths
			(componentPaths) => {
				for (const path of componentPaths) {
					const content = readComponentFile(path);
					// Should not use export let for props
					expect(content).not.toMatch(/export\s+let\s+\w+/);
					// Should use $props() if has props
					if (hasProps(content)) {
						expect(content).toMatch(/\$props\(\)/);
					}
				}
			}
		),
		{ numRuns: 100 }
	);
});

// Feature: svelte5-melt-ui-migration, Property 7: Store reactivity
test('store updates trigger component reactivity', () => {
	fc.assert(
		fc.property(
			fc.string(), // store value
			(newValue) => {
				const store = writable('initial');
				let componentValue;

				// Simulate component subscription
				const unsubscribe = store.subscribe((v) => (componentValue = v));

				// Update store
				store.set(newValue);

				// Component should have new value
				expect(componentValue).toBe(newValue);

				unsubscribe();
			}
		),
		{ numRuns: 100 }
	);
});
```

### Testing Phases

**Phase 1: Pre-Migration Testing**

- Run full test suite on Svelte 4 codebase
- Document all passing tests as baseline
- Capture screenshots for visual regression

**Phase 2: During Migration Testing**

- Run tests after each component migration
- Fix any failing tests immediately
- Add new tests for Svelte 5 specific behavior

**Phase 3: Post-Migration Testing**

- Run full unit test suite
- Run full integration test suite
- Run property-based tests
- Perform manual QA on all features
- Run accessibility audit with axe
- Test in multiple browsers
- Test responsive design

**Phase 4: Regression Testing**

- Compare screenshots for visual regressions
- Verify all user flows work identically
- Test edge cases and error scenarios
- Verify performance hasn't degraded

### Test Coverage Goals

- Unit test coverage: >80% of component code
- Integration test coverage: All critical user flows
- Property test coverage: All identified correctness properties
- Accessibility: 100% WCAG AA compliance
- Browser coverage: Chrome, Firefox, Safari, Edge

## Implementation Phases

### Phase 1: Dependency Updates (1-2 days)

**Tasks:**

1. Update package.json dependencies
   - Upgrade svelte to ^5.0.0
   - Upgrade @sveltejs/kit to ^2.0.0
   - Upgrade @sveltejs/vite-plugin-svelte to ^4.0.0
   - Add @melt-ui/svelte
   - Add @melt-ui/pp (preprocessor)
   - Remove flowbite, flowbite-svelte, flowbite-svelte-icons

2. Update build configuration
   - Update vite.config.ts for Svelte 5
   - Update svelte.config.js
   - Update tsconfig.json for Svelte 5 types

3. Update Storybook
   - Upgrade @storybook/sveltekit to latest
   - Update Storybook configuration for Svelte 5

**Validation:**

- Application builds without errors
- Development server starts
- TypeScript compilation succeeds

### Phase 2: Core Infrastructure (2-3 days)

**Tasks:**

1. Update stores
   - Theme store remains compatible
   - Verify store subscriptions work in Svelte 5
   - Update any custom stores if needed

2. Update utilities
   - Svelte actions (trapIntersection.ts)
   - Server utilities (no changes needed)
   - Type definitions

3. Update TypeScript configuration
   - Add Svelte 5 type definitions
   - Configure for runes support

**Validation:**

- Stores work correctly
- Actions work with Svelte 5
- TypeScript recognizes runes

### Phase 3: Base Components (5-7 days)

**Priority Order:**

1. Typography components (simplest, no Flowbite)
2. Button (remove Flowbite, native implementation)
3. Card (remove Flowbite, native implementation)
4. Form inputs (Input, Textarea, Checkbox - native)
5. Form components with Melt UI (Select, Radio, Toggle)
6. Modal (Melt UI dialog builder)

**For Each Component:**

1. Convert props to $props() with TypeScript types
2. Convert reactive declarations to $derived
3. Convert side effects to $effect
4. Remove Flowbite imports
5. Implement with native HTML or Melt UI
6. Maintain neo-brutalist styling
7. Update corresponding story
8. Write/update tests
9. Verify in Storybook

**Validation:**

- Each component renders correctly
- Props work as expected
- Styling matches original
- Storybook story works
- Tests pass

### Phase 4: Wrapper Components (3-4 days)

**Components:**

1. Dropdown (renamed from BrutalDropdown)
   - Rename file from BrutalDropdown.svelte to Dropdown.svelte
   - Use Melt UI createDropdownMenu
   - Maintain neo-brutalist styling
   - Ensure keyboard navigation
   - Update story and all imports

2. Navbar (renamed from BrutalNavbar)
   - Rename file from BrutalNavbar.svelte to Navbar.svelte
   - Compose from base components
   - Use Melt UI if needed for mobile menu
   - Maintain styling
   - Update story and all imports

3. Update all usages
   - Find and replace all BrutalDropdown imports with Dropdown
   - Find and replace all BrutalNavbar imports with Navbar
   - Update component references in routes and pages

**Validation:**

- Dropdowns work with keyboard
- Navigation is accessible
- Styling is consistent
- Stories demonstrate functionality
- All imports updated correctly
- No references to 'Brutal' prefix remain

### Phase 5: Application Routes (4-5 days)

**Tasks:**

1. Update layout components
   - Convert +layout.svelte to Svelte 5
   - Update slot usage
   - Convert reactive state to runes

2. Update page components
   - Convert all +page.svelte files
   - Update data prop access with $props()
   - Convert forms to Svelte 5 patterns

3. Update API routes (no changes needed)

4. Update authentication pages
   - signin page to Svelte 5
   - Update form handling

**Validation:**

- All routes render correctly
- Navigation works
- Forms submit correctly
- Authentication flow works
- Data loading works

### Phase 6: Storybook Validation (1-2 days)

**Tasks:**

1. Verify all stories work
2. Update story syntax if needed
3. Build Storybook static site

**Validation:**

- Storybook builds successfully
- All stories render correctly

### Phase 7: Testing and Validation (3-4 days)

**Tasks:**

1. Update test utilities for Svelte 5
2. Fix any failing unit tests
3. Run integration tests
4. Write property-based tests
5. Manual QA of all features
6. Accessibility audit
7. Performance testing
8. Cross-browser testing

**Validation:**

- All tests pass
- No regressions found
- Accessibility maintained
- Performance acceptable
- Works in all browsers

### Total Estimated Time: 18-25 days

## Rollback Plan

If critical issues are discovered:

1. **Immediate Rollback:**
   - Revert to previous commit
   - Restore Svelte 4 and Flowbite dependencies
   - Redeploy previous version

2. **Partial Rollback:**
   - Keep Svelte 5, revert Melt UI
   - Keep Flowbite temporarily
   - Complete Svelte 5 migration first

3. **Component-Level Rollback:**
   - Revert specific problematic components
   - Keep other migrations
   - Fix issues incrementally

## Success Criteria

Migration is complete when:

1. ✅ All dependencies updated to Svelte 5 and Melt UI
2. ✅ All components use Svelte 5 runes syntax
3. ✅ No Flowbite dependencies remain
4. ✅ All tests pass (unit, integration, property-based)
5. ✅ Storybook builds and displays all components
6. ✅ Application builds without errors
7. ✅ All features work identically to before
8. ✅ Accessibility maintained or improved
9. ✅ Documentation updated
10. ✅ No visual regressions
11. ✅ Performance maintained or improved
12. ✅ Successfully deployed to production

## References

- [Svelte 5 Migration Guide](https://svelte.dev/docs/svelte/v5-migration-guide)
- [Svelte 5 Runes Documentation](https://svelte.dev/docs/svelte/what-are-runes)
- [Melt UI Documentation](https://melt-ui.com/)
- [Melt UI Builders](https://melt-ui.com/docs/builders)
- [fast-check Documentation](https://fast-check.dev/)
- [Testing Library Svelte](https://testing-library.com/docs/svelte-testing-library/intro)
