# Flowbite Component Wrappers

## Overview

This directory contains wrapper components that apply neo-brutalist styling to Flowbite Svelte components. These wrappers maintain full compatibility with Flowbite's API while providing consistent design system styling.

## Wrapper Strategy

### When to Create a Wrapper

Create a wrapper component when:

1. The Flowbite component is used directly in layout/feature components
2. The component requires complex styling that can't be easily applied via class props
3. The component needs consistent neo-brutalist styling across the application
4. Multiple style overrides are needed for theme compatibility

### When NOT to Create a Wrapper

Don't create a wrapper when:

1. A base component already exists (Button, Card, Input, etc.)
2. The component is only used once in a specific context
3. Simple class prop styling is sufficient
4. The component is rarely used in the application

## Components Requiring Wrappers

Based on current usage analysis:

### High Priority (Currently Used)

1. **Navbar** - Used in `AppTopNav.svelte`
   - Components: Navbar, NavBrand, NavHamburger
   - Needs: Bold borders, neo-brutalist shadow, theme-aware colors
2. **Dropdown** - Used in `AppTopNav.svelte`
   - Components: Dropdown, DropdownItem, DropdownHeader
   - Needs: Bold borders, hard shadows, theme-aware backgrounds

3. **Sidebar** - Used in `AppSideNav.svelte`
   - Components: Sidebar, SidebarWrapper, SidebarGroup, SidebarItem
   - Needs: Bold borders, neo-brutalist styling, theme compatibility

4. **Avatar** - Used in `AppTopNav.svelte`
   - Needs: Bold border, optional shadow

5. **Spinner** - Used in `AppImageSearch.svelte`
   - Needs: Theme-aware colors, bold styling

### Medium Priority (Potentially Needed)

6. **Footer** - Used in `app/+layout.svelte`
   - Needs: Bold top border, theme-aware styling

### Low Priority (Consider Later)

7. **Toast** - Not currently used but common pattern
8. **Tooltip** - Not currently used but common pattern
9. **Popover** - Not currently used but common pattern

## Wrapper Implementation Pattern

```svelte
<script lang="ts">
	import { ComponentName as FlowbiteComponent } from 'flowbite-svelte';

	// Export all Flowbite props
	export let prop1: Type1 = defaultValue;
	export let prop2: Type2 = defaultValue;
	// ... all other props

	// Custom class for neo-brutalist styling
	let customClass = 'border-3 border-brutal-border shadow-brutal bg-brutal-surface';

	// Merge with user-provided classes
	$: finalClass = `${customClass} ${$$props.class || ''}`;
</script>

<FlowbiteComponent {...$$props} class={finalClass}>
	<slot />
	<!-- Named slots as needed -->
</FlowbiteComponent>
```

## Usage Guidelines

1. **Import from wrappers directory**: Use `import { BrutalNavbar } from '$lib/frontend/components/wrappers'`
2. **Maintain Flowbite API**: All props and slots should work identically to Flowbite components
3. **Theme compatibility**: Ensure all wrappers use design tokens for theme switching
4. **Document in Storybook**: Create stories showing wrapper usage and comparison with unwrapped components

## Migration Path

For existing components using Flowbite directly:

1. Create the wrapper component
2. Add Storybook stories
3. Update layout/feature components to use wrapper
4. Test theme switching and functionality
5. Document any breaking changes (should be none)

## Components Already Wrapped as Base Components

These Flowbite components already have custom base component implementations and don't need wrappers:

- Button → `base/Button.svelte`
- Card → `base/Card.svelte`
- Input → `base/form/Input.svelte`
- Checkbox → `base/form/Checkbox.svelte`
- Radio → `base/form/Radio.svelte`
- Select → `base/form/Select.svelte`
- Textarea → `base/form/Textarea.svelte`
- Toggle → `base/form/Toggle.svelte`
- Label → `base/form/Label.svelte`
- Modal → `base/Modal.svelte`
- P → `base/typography/P.svelte`
- Heading → `base/typography/Heading.svelte`
- A → `base/typography/A.svelte`
- Blockquote → `base/typography/Blockquote.svelte`
- Hr → `base/typography/Hr.svelte`
- Img → `base/typography/Img.svelte`
- List → `base/typography/List.svelte`
- Li → `base/typography/Li.svelte`
