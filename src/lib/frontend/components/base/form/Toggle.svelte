<script lang="ts">
	import { Toggle as FlowbiteToggle } from 'flowbite-svelte';

	// Export all Flowbite Toggle props
	export let size: 'small' | 'default' | 'large' | 'custom' = 'default';
	export let group: string[] = [];
	export let value: string | number = '';
	export let checked: boolean | undefined = undefined;
	export let customSize = '';

	// Additional props for neo-brutalist styling
	let className = '';
	export { className as class };

	// Neo-brutalist styling classes for toggle
	const neoBrutalistClasses =
		'!border-3 !border-brutal-border peer-focus:!ring-3 peer-focus:!ring-brutal-primary peer-checked:!bg-brutal-primary peer-checked:!border-brutal-border !transition-all !duration-150';

	$: combinedClasses = `${neoBrutalistClasses} ${className}`;
</script>

<FlowbiteToggle
	{size}
	bind:group
	{value}
	bind:checked
	{customSize}
	class={combinedClasses}
	on:click
	on:change
	{...$$restProps}
>
	<slot name="offLabel" slot="offLabel" />
	<slot />
</FlowbiteToggle>
