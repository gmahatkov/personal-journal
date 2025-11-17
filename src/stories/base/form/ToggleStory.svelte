<script lang="ts">
	import Toggle from '$lib/frontend/components/base/form/Toggle.svelte';

	export let label = 'Toggle label';
	export let checked = false;
</script>

<Toggle bind:checked>
	{label}
</Toggle>
