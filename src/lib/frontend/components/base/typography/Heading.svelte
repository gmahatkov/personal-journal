<script lang="ts">
	import { Heading as FlowbiteHeading } from 'flowbite-svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface $$Props extends HTMLAttributes<HTMLHeadingElement> {
		tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
		color?: string;
		customSize?: string;
		class?: string;
	}

	export let tag: $$Props['tag'] = 'h1';
	export let color: $$Props['color'] = 'text-brutal-text';
	export let customSize: $$Props['customSize'] = '';
	let className = '';
	export { className as class };

	// Neo-brutalist styling - bold, strong headings
	const neoBrutalistClasses = '!font-bold !transition-colors !duration-150';

	$: combinedClasses = `${neoBrutalistClasses} ${className}`;
</script>

<FlowbiteHeading {tag} {color} {customSize} class={combinedClasses} {...$$restProps}>
	<slot />
</FlowbiteHeading>
