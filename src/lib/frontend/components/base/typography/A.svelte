<script lang="ts">
	import { A as FlowbiteA } from 'flowbite-svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	import type { Action } from 'svelte/action';

	interface $$Props extends HTMLAnchorAttributes {
		action?: Action<HTMLElement, any>;
		params?: any;
		href?: string;
		color?: string;
		aClass?: string;
		class?: string;
	}

	export let action: $$Props['action'] = undefined;
	export let params: $$Props['params'] = {};
	export let href: $$Props['href'] = '#';
	export let color: $$Props['color'] = 'text-brutal-primary';
	export let aClass: $$Props['aClass'] =
		'inline-flex items-center font-bold hover:underline decoration-3 underline-offset-4';
	let className = '';
	export { className as class };

	// Neo-brutalist styling - bold, clear links with strong underlines
	const neoBrutalistClasses = '!transition-all !duration-150 hover:!-translate-y-0.5';

	$: combinedClasses = `${neoBrutalistClasses} ${className}`;
</script>

<FlowbiteA
	{action}
	{params}
	{href}
	{color}
	{aClass}
	class={combinedClasses}
	on:click
	{...$$restProps}
>
	<slot />
</FlowbiteA>
