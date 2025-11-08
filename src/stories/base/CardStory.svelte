<script lang="ts">
	import Card from '$lib/frontend/components/base/Card.svelte';

	export let variant: 'default' | 'elevated' | 'bordered' = 'default';
	export let padding: 'none' | 'sm' | 'md' | 'lg' = 'md';
	export let title = 'Card Title';
	export let content =
		'This is the card content. Cards are used to group related information with bold borders and hard shadows following neo-brutalist design principles.';
	export let showImage = false;
	export let img: string | undefined = undefined;
</script>

<Card {variant} {padding} {img}>
	{#if showImage && img}
		<img src={img} alt="Card" class="w-full h-48 object-cover mb-4" />
	{/if}
	<h5 class="text-2xl font-bold tracking-tight text-brutal-text mb-2">
		{title}
	</h5>
	<p class="text-brutal-text-secondary">
		{content}
	</p>
</Card>
