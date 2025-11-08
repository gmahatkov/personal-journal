<script lang="ts">
	import P from '$lib/frontend/components/base/typography/P.svelte';

	export let color = 'text-brutal-text';
	export let height: 'normal' | 'relaxed' | 'loose' = 'normal';
	export let align: 'left' | 'center' | 'right' = 'left';
	export let justify = false;
	export let italic = false;
	export let firstupper = false;
	export let size:
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
		| '9xl' = 'base';
	export let weight:
		| 'thin'
		| 'extralight'
		| 'light'
		| 'normal'
		| 'medium'
		| 'semibold'
		| 'bold'
		| 'extrabold'
		| 'black' = 'normal';
	export let text =
		'This is a paragraph of text demonstrating the neo-brutalist typography style. It features clean, readable text with theme-aware colors.';
</script>

<P {color} {height} {align} {justify} {italic} {firstupper} {size} {weight}>
	{text}
</P>
