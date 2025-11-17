<script lang="ts">
	import { P as FlowbiteP } from 'flowbite-svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type PsizeType =
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
	type PweightType =
		| 'thin'
		| 'extralight'
		| 'light'
		| 'normal'
		| 'medium'
		| 'semibold'
		| 'bold'
		| 'extrabold'
		| 'black';

	interface $$Props extends HTMLAttributes<HTMLParagraphElement> {
		color?: string;
		height?: 'normal' | 'relaxed' | 'loose';
		align?: 'left' | 'center' | 'right';
		justify?: boolean;
		italic?: boolean;
		firstupper?: boolean;
		upperClass?: string;
		opacity?: number;
		whitespace?: 'normal' | 'nowrap' | 'pre' | 'preline' | 'prewrap';
		size?: PsizeType;
		space?: 'tighter' | 'tight' | 'normal' | 'wide' | 'wider' | 'widest';
		weight?: PweightType;
		class?: string;
	}

	export let color: $$Props['color'] = 'text-brutal-text';
	export let height: $$Props['height'] = 'normal';
	export let align: $$Props['align'] = 'left';
	export let justify: $$Props['justify'] = false;
	export let italic: $$Props['italic'] = false;
	export let firstupper: $$Props['firstupper'] = false;
	export let upperClass: $$Props['upperClass'] =
		'first-line:uppercase first-line:tracking-widest first-letter:text-7xl first-letter:font-bold first-letter:text-brutal-text first-letter:me-3 first-letter:float-left';
	export let opacity: $$Props['opacity'] = undefined;
	export let whitespace: $$Props['whitespace'] = 'normal';
	export let size: $$Props['size'] = 'base';
	export let space: $$Props['space'] = undefined;
	export let weight: $$Props['weight'] = 'normal';
	let className = '';
	export { className as class };

	// Neo-brutalist styling - clean, readable text
	const neoBrutalistClasses = '!transition-colors !duration-150';

	$: combinedClasses = `${neoBrutalistClasses} ${className}`;
</script>

<FlowbiteP
	{color}
	{height}
	{align}
	{justify}
	{italic}
	{firstupper}
	{upperClass}
	{opacity}
	{whitespace}
	{size}
	{space}
	{weight}
	class={combinedClasses}
	{...$$restProps}
>
	<slot />
</FlowbiteP>
