<script lang="ts">
	import { Radio as FlowbiteRadio } from 'flowbite-svelte';
	import type { FormColorType } from 'flowbite-svelte';

	// Export all Flowbite Radio props
	export let color: FormColorType = 'primary';
	export let custom = false;
	export let inline = false;
	export let group: number | string | undefined = undefined;
	export let value: number | string = '';
	export let spacing = '';
	export let checked = false;

	// Additional props for neo-brutalist styling
	let className = '';
	export { className as class };

	// Neo-brutalist styling classes for radio
	const neoBrutalistClasses =
		'!w-5 !h-5 !border-3 !border-brutal-border !bg-brutal-surface !text-brutal-primary !transition-all !duration-150 focus:!ring-3 focus:!ring-brutal-primary disabled:!opacity-50 disabled:!cursor-not-allowed checked:!bg-brutal-primary checked:!border-brutal-border';

	$: combinedClasses = `${neoBrutalistClasses} ${className}`;
</script>

<FlowbiteRadio
	{color}
	{custom}
	{inline}
	bind:group
	{value}
	{spacing}
	{checked}
	class={combinedClasses}
	on:blur
	on:change
	on:click
	on:focus
	on:keydown
	on:keypress
	on:keyup
	on:mouseenter
	on:mouseleave
	on:mouseover
	on:paste
	{...$$restProps}
>
	<slot />
</FlowbiteRadio>
