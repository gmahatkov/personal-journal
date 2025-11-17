<script lang="ts">
	import Textarea from '$lib/frontend/components/base/form/Textarea.svelte';
	import Label from '$lib/frontend/components/base/form/Label.svelte';

	export let placeholder = 'Enter text...';
	export let disabled = false;
	export let label = '';
	export let value = '';
	export let rows = 4;
</script>

<div class="space-y-2">
	{#if label}
		<Label>{label}</Label>
	{/if}
	<Textarea {placeholder} {disabled} {rows} bind:value />
</div>
