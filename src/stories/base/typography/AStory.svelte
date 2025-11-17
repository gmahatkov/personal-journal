<script lang="ts">
	import A from '$lib/frontend/components/base/typography/A.svelte';

	export let href = '#';
	export let text = 'This is a link';
	export let color = 'text-brutal-primary';
</script>

<A {href} {color}>
	{text}
</A>
