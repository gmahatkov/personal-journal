<script lang="ts">
	import Heading from '$lib/frontend/components/base/typography/Heading.svelte';

	export let tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1';
	export let color = 'text-brutal-text';
	export let customSize = '';
	export let text = 'Neo-Brutalist Heading';
</script>

<Heading {tag} {color} {customSize}>
	{text}
</Heading>
