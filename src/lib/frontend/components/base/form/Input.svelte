<script lang="ts">
	import { Input as FlowbiteInput } from 'flowbite-svelte';
	import type { InputType } from 'flowbite-svelte';
	import type { FormSizeType } from 'flowbite-svelte';

	// Export all Flowbite Input props
	export let type: InputType = 'text';
	export let value: any = undefined;
	export let size: FormSizeType | undefined = undefined;
	export let clearable = false;
	export let color: 'base' | 'green' | 'red' = 'base';
	export let floatClass = 'flex absolute inset-y-0 items-center text-gray-500 dark:text-gray-400';

	// Additional props for neo-brutalist styling
	let className = '';
	export { className as class };

	// Neo-brutalist styling classes
	const neoBrutalistClasses =
		'!border-3 !border-brutal-border !bg-brutal-surface !text-brutal-text !transition-all !duration-150 focus:!ring-3 focus:!ring-brutal-primary focus:!border-brutal-primary disabled:!opacity-50 disabled:!cursor-not-allowed';

	// Color-specific overrides for error and success states
	const colorClasses = {
		base: '',
		green: '!border-brutal-success focus:!ring-brutal-success focus:!border-brutal-success',
		red: '!border-brutal-error focus:!ring-brutal-error focus:!border-brutal-error'
	};

	$: combinedClasses = `${neoBrutalistClasses} ${colorClasses[color]} ${className}`;
</script>

<FlowbiteInput
	{type}
	bind:value
	{size}
	{clearable}
	{color}
	{floatClass}
	class={combinedClasses}
	on:blur
	on:change
	on:click
	on:contextmenu
	on:focus
	on:keydown
	on:keypress
	on:keyup
	on:mouseover
	on:mouseenter
	on:mouseleave
	on:paste
	on:input
	{...$$restProps}
>
	<slot name="left" slot="left" />
	<slot />
	<slot name="right" slot="right" />
</FlowbiteInput>
