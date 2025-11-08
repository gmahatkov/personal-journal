<script lang="ts">
	import { Button as FlowbiteButton } from 'flowbite-svelte';

	export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	let className = '';
	export { className as class };

	// Map our variants to Flowbite colors and outline prop
	type FlowbiteColor =
		| 'primary'
		| 'purple'
		| 'dark'
		| 'none'
		| 'alternative'
		| 'blue'
		| 'green'
		| 'light'
		| 'red'
		| 'yellow';

	const variantMap: Record<typeof variant, { color: FlowbiteColor; outline: boolean }> = {
		primary: { color: 'primary' as const, outline: false },
		secondary: { color: 'purple' as const, outline: false },
		outline: { color: 'dark' as const, outline: true },
		ghost: { color: 'none' as const, outline: false }
	};

	// Map our sizes to Flowbite sizes
	const sizeMap = { sm: 'sm' as const, md: 'md' as const, lg: 'lg' as const };

	$: flowbiteColor = variantMap[variant].color;
	$: flowbiteOutline = variantMap[variant].outline;
	$: flowbiteSize = sizeMap[size];

	// Neo-brutalist styling classes
	const neoBrutalistClasses =
		'!border-3 !font-bold !transition-all !duration-150 !shadow-brutal hover:!-translate-x-0.5 hover:!-translate-y-0.5 hover:!shadow-brutal-lg active:!translate-x-1 active:!translate-y-1 active:!shadow-none focus-within:!ring-0';

	// Variant-specific overrides
	const variantClasses = {
		primary: '!bg-brutal-primary !text-white !border-brutal-border',
		secondary: '!bg-brutal-secondary !text-white !border-brutal-border',
		outline: '!bg-transparent !text-brutal-text !border-brutal-border',
		ghost: '!bg-transparent !text-brutal-text !border-transparent hover:!border-brutal-border'
	};

	$: combinedClasses = `${neoBrutalistClasses} ${variantClasses[variant]} ${className}`;
</script>

<FlowbiteButton
	{type}
	{disabled}
	color={flowbiteColor}
	outline={flowbiteOutline}
	size={flowbiteSize}
	class={combinedClasses}
	on:click
>
	<slot />
</FlowbiteButton>
