<script lang="ts">
	import { DropdownHeader as FlowbiteDropdownHeader } from 'flowbite-svelte';

	// Neo-brutalist styling for header
	const brutalClass = 'py-2 px-4 border-b-3 border-brutal-border font-bold';

	// Merge with user-provided class
	$: finalClass = `${brutalClass} ${$$props.class || ''}`;
</script>

<FlowbiteDropdownHeader class={finalClass}>
	<slot />
</FlowbiteDropdownHeader>
