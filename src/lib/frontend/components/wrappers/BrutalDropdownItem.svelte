<script lang="ts">
	import { DropdownItem as FlowbiteDropdownItem } from 'flowbite-svelte';

	// Export all Flowbite DropdownItem props
	export let defaultClass: string =
		'font-medium py-2 px-4 text-sm hover:bg-brutal-primary hover:text-white transition-colors duration-150';
	export let href: string | undefined = undefined;
	export let activeClass: string | undefined = undefined;

	// Merge with user-provided class
	$: finalClass = `${defaultClass} ${$$props.class || ''}`;
</script>

<FlowbiteDropdownItem {href} {activeClass} class={finalClass} on:click>
	<slot />
</FlowbiteDropdownItem>
