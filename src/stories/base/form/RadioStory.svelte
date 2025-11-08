<script lang="ts">
	import Radio from '$lib/frontend/components/base/form/Radio.svelte';
	import Label from '$lib/frontend/components/base/form/Label.svelte';

	export let disabled = false;

	let selectedOption = 'option1';
</script>

<div class="space-y-3">
	<Label>Choose an option:</Label>
	<div class="space-y-2">
		<Radio {disabled} bind:group={selectedOption} value="option1">Option 1</Radio>
		<Radio {disabled} bind:group={selectedOption} value="option2">Option 2</Radio>
		<Radio {disabled} bind:group={selectedOption} value="option3">Option 3</Radio>
	</div>
	<p class="text-sm text-brutal-text-secondary">Selected: {selectedOption}</p>
</div>
