<script lang="ts">
	import Hr from '$lib/frontend/components/base/typography/Hr.svelte';

	export let icon = false;
	export let text = '';
</script>

{#if text}
	<Hr {icon}>
		{text}
	</Hr>
{:else}
	<Hr {icon} />
{/if}
