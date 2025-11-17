<script lang="ts">
	import { Navbar as FlowbiteNavbar } from 'flowbite-svelte';

	// Export Flowbite Navbar props
	export let fluid: boolean = false;

	// Neo-brutalist styling
	const brutalClass =
		'border-b-4 border-brutal-border bg-brutal-surface text-brutal-text shadow-none';

	// Merge with user-provided class
	$: finalClass = `${brutalClass} ${$$props.class || ''}`;
</script>

<FlowbiteNavbar {fluid} class={finalClass} shadow={false} {...$$restProps}>
	<slot />
</FlowbiteNavbar>
