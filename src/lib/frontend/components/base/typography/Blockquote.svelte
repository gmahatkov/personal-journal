<script lang="ts">
	import { Blockquote as FlowbiteBlockquote } from 'flowbite-svelte';
	import type { HTMLBlockquoteAttributes } from 'svelte/elements';

	type BlockQuoteType =
		| 'xs'
		| 'sm'
		| 'base'
		| 'lg'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl'
		| '5xl'
		| '6xl'
		| '7xl'
		| '8xl'
		| '9xl';

	interface $$Props extends HTMLBlockquoteAttributes {
		border?: boolean;
		italic?: boolean;
		borderClass?: string;
		bgClass?: string;
		bg?: boolean;
		baseClass?: string;
		alignment?: 'left' | 'center' | 'right';
		size?: BlockQuoteType;
		class?: string;
	}

	export let border: $$Props['border'] = false;
	export let italic: $$Props['italic'] = true;
	export let borderClass: $$Props['borderClass'] = 'border-s-4 border-brutal-border';
	export let bgClass: $$Props['bgClass'] = 'bg-brutal-surface';
	export let bg: $$Props['bg'] = false;
	export let baseClass: $$Props['baseClass'] = 'font-bold text-brutal-text';
	export let alignment: $$Props['alignment'] = 'left';
	export let size: $$Props['size'] = 'lg';
	let className = '';
	export { className as class };

	// Neo-brutalist styling - bold borders and strong visual presence
	const neoBrutalistClasses = '!transition-colors !duration-150';

	$: combinedClasses = `${neoBrutalistClasses} ${className}`;
</script>

<FlowbiteBlockquote
	{border}
	{italic}
	{borderClass}
	{bgClass}
	{bg}
	{baseClass}
	{alignment}
	{size}
	class={combinedClasses}
	{...$$restProps}
>
	<slot />
</FlowbiteBlockquote>
