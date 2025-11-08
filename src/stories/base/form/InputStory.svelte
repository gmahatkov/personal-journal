<script lang="ts">
	import Input from '$lib/frontend/components/base/form/Input.svelte';
	import Label from '$lib/frontend/components/base/form/Label.svelte';

	export let type: 'text' | 'email' | 'password' | 'number' = 'text';
	export let placeholder = 'Enter text...';
	export let disabled = false;
	export let color: 'base' | 'green' | 'red' = 'base';
	export let label = '';
	export let value = '';
</script>

<div class="space-y-2">
	{#if label}
		<Label>{label}</Label>
	{/if}
	<Input {type} {placeholder} {disabled} {color} bind:value />
</div>
