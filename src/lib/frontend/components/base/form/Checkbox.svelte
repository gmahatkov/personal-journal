<script lang="ts">
	import { Checkbox as FlowbiteCheckbox } from 'flowbite-svelte';
	import type { FormColorType, CheckboxItem } from 'flowbite-svelte';

	// Export all Flowbite Checkbox props
	export let color: FormColorType = 'primary';
	export let custom = false;
	export let inline = false;
	export let group: string[] = [];
	export let choices: CheckboxItem[] = [];
	export let value: string | number = 'on';
	export let checked: boolean | undefined = undefined;
	export let spacing = '';
	export let groupLabelClass = '';
	export let groupInputClass = '';
	export let required = false;

	// Additional props for neo-brutalist styling
	let className = '';
	export { className as class };

	// Neo-brutalist styling classes for checkbox
	const neoBrutalistClasses =
		'!w-5 !h-5 !border-3 !border-brutal-border !bg-brutal-surface !text-brutal-primary !transition-all !duration-150 focus:!ring-3 focus:!ring-brutal-primary disabled:!opacity-50 disabled:!cursor-not-allowed checked:!bg-brutal-primary checked:!border-brutal-border mr-2';

	$: combinedClasses = `${neoBrutalistClasses} ${className}`;
</script>

<FlowbiteCheckbox
	{color}
	{custom}
	{inline}
	bind:group
	{choices}
	{value}
	bind:checked
	{spacing}
	{groupLabelClass}
	{groupInputClass}
	{required}
	class={combinedClasses}
	on:keyup
	on:keydown
	on:keypress
	on:focus
	on:blur
	on:click
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:change
	{...$$restProps}
>
	<slot />
</FlowbiteCheckbox>
