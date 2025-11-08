<script lang="ts">
	import Img from '$lib/frontend/components/base/typography/Img.svelte';

	export let src = 'https://via.placeholder.com/600x400';
	export let alt = 'Placeholder image';
	export let caption = '';
	export let size = 'max-w-full';
	export let alignment = '';
</script>

<Img {src} {alt} {caption} {size} {alignment} />
