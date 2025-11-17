<script lang="ts">
	import { Textarea as FlowbiteTextarea } from 'flowbite-svelte';

	// Export all Flowbite Textarea props
	export let value: any = undefined;
	export let wrappedClass =
		'block w-full text-sm border-0 px-0 bg-inherit dark:bg-inherit focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50';
	export let unWrappedClass =
		'p-2.5 text-sm focus:ring-primary-500 border-gray-300 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 disabled:cursor-not-allowed disabled:opacity-50';
	export let innerWrappedClass = 'py-2 px-4 bg-white dark:bg-gray-800';
	export let headerClass = '';
	export let footerClass = '';

	// Additional props for neo-brutalist styling
	let className = '';
	export { className as class };

	// Neo-brutalist styling classes
	const neoBrutalistClasses =
		'!border-3 !border-brutal-border !bg-brutal-surface !text-brutal-text !transition-all !duration-150 focus:!ring-3 focus:!ring-brutal-primary focus:!border-brutal-primary disabled:!opacity-50 disabled:!cursor-not-allowed';

	$: combinedClasses = `${neoBrutalistClasses} ${className}`;
</script>

<FlowbiteTextarea
	bind:value
	{wrappedClass}
	unWrappedClass={`${unWrappedClass} ${combinedClasses}`}
	{innerWrappedClass}
	{headerClass}
	{footerClass}
	on:blur
	on:change
	on:click
	on:contextmenu
	on:focus
	on:input
	on:keydown
	on:keypress
	on:keyup
	on:mouseenter
	on:mouseleave
	on:mouseover
	on:paste
	on:select
	{...$$restProps}
>
	<slot name="header" slot="header" />
	<slot name="footer" slot="footer" />
</FlowbiteTextarea>
