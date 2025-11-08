<script lang="ts">
	import { Li as FlowbiteLi } from 'flowbite-svelte';
	import type { HTMLLiAttributes } from 'svelte/elements';

	interface $$Props extends HTMLLiAttributes {
		icon?: boolean;
		liClass?: string;
		class?: string;
	}

	export let icon: $$Props['icon'] = false;
	export let liClass: $$Props['liClass'] = '';
	let className = '';
	export { className as class };

	// Neo-brutalist styling - clean list items
	const neoBrutalistClasses = '!transition-colors !duration-150';

	$: combinedClasses = `${neoBrutalistClasses} ${className}`;
</script>

<FlowbiteLi {icon} {liClass} class={combinedClasses} {...$$restProps}>
	<slot />
</FlowbiteLi>
