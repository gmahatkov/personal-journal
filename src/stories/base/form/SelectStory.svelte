<script lang="ts">
	import Select from '$lib/frontend/components/base/form/Select.svelte';
	import Label from '$lib/frontend/components/base/form/Label.svelte';

	export let disabled = false;
	export let label = '';

	const items = [
		{ value: '', name: 'Choose option...' },
		{ value: 'option1', name: 'Option 1' },
		{ value: 'option2', name: 'Option 2' },
		{ value: 'option3', name: 'Option 3' },
		{ value: 'option4', name: 'Option 4' }
	];

	let value = '';
</script>

<div class="space-y-2">
	{#if label}
		<Label>{label}</Label>
	{/if}
	<Select {items} {disabled} bind:value />
</div>
