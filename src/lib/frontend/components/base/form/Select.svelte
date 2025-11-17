<script lang="ts">
	import { Select as FlowbiteSelect } from 'flowbite-svelte';
	import type { SelectOptionType } from 'flowbite-svelte';

	// Export all Flowbite Select props
	export let items: SelectOptionType<any>[] = [];
	export let value: any = '';
	export let placeholder = 'Choose option ...';
	export let underline = false;
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let defaultClass =
		'text-gray-900 disabled:text-gray-400 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:disabled:text-gray-500 dark:focus:ring-primary-500 dark:focus:border-primary-500';
	export let underlineClass =
		'text-gray-500 disabled:text-gray-400 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:disabled:text-gray-500 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer';

	// Additional props for neo-brutalist styling
	let className = '';
	export { className as class };

	// Neo-brutalist styling classes
	const neoBrutalistClasses =
		'!border-3 !border-brutal-border !bg-brutal-surface !text-brutal-text !transition-all !duration-150 focus:!ring-3 focus:!ring-brutal-primary focus:!border-brutal-primary disabled:!opacity-50 disabled:!cursor-not-allowed';

	$: combinedClasses = `${neoBrutalistClasses} ${className}`;
</script>

<FlowbiteSelect
	{items}
	bind:value
	{placeholder}
	{underline}
	{size}
	{defaultClass}
	{underlineClass}
	class={combinedClasses}
	on:change
	on:contextmenu
	on:input
	{...$$restProps}
>
	<slot />
</FlowbiteSelect>
