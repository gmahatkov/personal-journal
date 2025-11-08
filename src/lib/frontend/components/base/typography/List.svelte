<script lang="ts">
	import { List as FlowbiteList } from 'flowbite-svelte';
	import type { HTMLAttributes, HTMLOlAttributes } from 'svelte/elements';

	interface $$Props extends HTMLAttributes<HTMLUListElement> {
		tag?: 'ul' | 'ol' | 'dl';
		list?: 'disc' | 'none' | 'decimal' | undefined;
		position?: 'inside' | 'outside';
		class?: string;
	}

	export let tag: $$Props['tag'] = 'ul';
	export let list: $$Props['list'] = undefined;
	export let position: $$Props['position'] = 'inside';
	let className = '';
	export { className as class };

	// Neo-brutalist styling - clean, readable lists
	const neoBrutalistClasses = '!transition-colors !duration-150 !text-brutal-text';

	$: combinedClasses = `${neoBrutalistClasses} ${className}`;
</script>

<FlowbiteList {tag} {list} {position} class={combinedClasses} {...$$restProps}>
	<slot />
</FlowbiteList>
