<script lang="ts">
	import { Card as FlowbiteCard } from 'flowbite-svelte';

	export let variant: 'default' | 'elevated' | 'bordered' = 'default';
	export let padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
	export let href: string | undefined = undefined;
	export let horizontal = false;
	export let reverse = false;
	export let img: string | undefined = undefined;
	let className = '';
	export { className as class };

	// Neo-brutalist base styling
	const neoBrutalistClasses =
		'!border-3 !border-brutal-border !bg-brutal-surface !transition-all !duration-150';

	// Variant-specific styling
	const variantClasses = {
		default: '!shadow-brutal',
		elevated: '!shadow-brutal-lg hover:!-translate-x-0.5 hover:!-translate-y-0.5',
		bordered: '!shadow-none'
	};

	// Padding variations
	const paddingClasses = { none: '!p-0', sm: '!p-4', md: '!p-6', lg: '!p-8' };

	$: combinedClasses = `${neoBrutalistClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`;
</script>

<FlowbiteCard {href} {horizontal} {reverse} {img} class={combinedClasses} on:click>
	<slot />
</FlowbiteCard>
