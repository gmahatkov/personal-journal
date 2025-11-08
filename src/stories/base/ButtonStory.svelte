<script lang="ts">
	import Button from '$lib/frontend/components/base/Button.svelte';

	export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled = false;
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let label = 'Button';
</script>

<Button {variant} {size} {disabled} {type}>
	{label}
</Button>
