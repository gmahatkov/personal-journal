<script lang="ts">
	import List from '$lib/frontend/components/base/typography/List.svelte';
	import Li from '$lib/frontend/components/base/typography/Li.svelte';

	export let tag: 'ul' | 'ol' | 'dl' = 'ul';
	export let list: 'disc' | 'none' | 'decimal' | undefined = undefined;
	export let position: 'inside' | 'outside' = 'inside';
	export let items = ['First item', 'Second item', 'Third item'];
</script>

<List {tag} {list} {position}>
	{#each items as item}
		<Li>{item}</Li>
	{/each}
</List>
