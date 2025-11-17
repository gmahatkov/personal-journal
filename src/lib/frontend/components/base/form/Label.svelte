<script lang="ts">
	import { Label as FlowbiteLabel } from 'flowbite-svelte';

	// Export all Flowbite Label props
	export let color: 'gray' | 'green' | 'red' | 'disabled' = 'gray';
	export let defaultClass = 'text-sm rtl:text-right font-medium block';
	export let show = true;

	// Additional props for neo-brutalist styling
	let className = '';
	export { className as class };

	// Neo-brutalist styling classes
	const neoBrutalistClasses = '!font-bold !text-brutal-text';

	// Color-specific overrides
	const colorClasses = {
		gray: '',
		green: '!text-brutal-success',
		red: '!text-brutal-error',
		disabled: '!text-brutal-text-secondary !opacity-50'
	};

	$: combinedClasses = `${neoBrutalistClasses} ${colorClasses[color]} ${className}`;
</script>

<FlowbiteLabel {color} {defaultClass} {show} class={combinedClasses} {...$$restProps}>
	<slot />
</FlowbiteLabel>
