<script lang="ts">
	import Checkbox from '$lib/frontend/components/base/form/Checkbox.svelte';

	export let disabled = false;
	export let label = 'Checkbox label';
	export let checked = false;
</script>

<Checkbox {disabled} bind:checked>
	{label}
</Checkbox>
