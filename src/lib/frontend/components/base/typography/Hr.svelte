<script lang="ts">
	import { Hr as FlowbiteHr } from 'flowbite-svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface $$Props extends HTMLAttributes<HTMLElement> {
		icon?: boolean;
		divClass?: string;
		hrClass?: string;
		iconDivClass?: string;
		textSpanClass?: string;
		innerDivClass?: string;
		class?: string;
	}

	export let icon: $$Props['icon'] = false;
	export let divClass: $$Props['divClass'] = 'inline-flex items-center justify-center w-full';
	export let hrClass: $$Props['hrClass'] = 'h-1 my-8 bg-brutal-border border-0';
	export let iconDivClass: $$Props['iconDivClass'] =
		'absolute start-1/2 px-4 bg-brutal-bg -translate-x-1/2 rtl:translate-x-1/2';
	export let textSpanClass: $$Props['textSpanClass'] =
		'absolute px-3 font-bold text-brutal-text -translate-x-1/2 rtl:translate-x-1/2 bg-brutal-bg start-1/2';
	export let innerDivClass: $$Props['innerDivClass'] =
		'absolute px-4 -translate-x-1/2 rtl:translate-x-1/2 bg-brutal-bg start-1/2';
	let className = '';
	export { className as class };

	// Neo-brutalist styling - bold, solid dividers
	const neoBrutalistClasses = '!transition-colors !duration-150';

	$: combinedClasses = `${neoBrutalistClasses} ${className}`;
</script>

<FlowbiteHr
	{icon}
	{divClass}
	{hrClass}
	{iconDivClass}
	{textSpanClass}
	{innerDivClass}
	class={combinedClasses}
	{...$$restProps}
>
	<slot />
</FlowbiteHr>
