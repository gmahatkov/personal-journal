<script lang="ts">
	import Blockquote from '$lib/frontend/components/base/typography/Blockquote.svelte';

	export let border = false;
	export let italic = true;
	export let bg = false;
	export let alignment: 'left' | 'center' | 'right' = 'left';
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
		| '9xl' = 'lg';
	export let text =
		'This is a blockquote demonstrating the neo-brutalist design style with bold borders and strong visual presence.';
</script>

<Blockquote {border} {italic} {bg} {alignment} {size}>
	{text}
</Blockquote>
