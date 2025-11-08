<script lang="ts">
	import { Img as FlowbiteImg } from 'flowbite-svelte';
	import type { HTMLImgAttributes } from 'svelte/elements';

	interface $$Props extends HTMLImgAttributes {
		caption?: string;
		src?: string;
		srcset?: string;
		size?: string;
		alignment?: string;
		imgClass?: string;
		figClass?: string;
		alt?: string;
		effect?: string;
		captionClass?: string;
		class?: string;
	}

	export let caption: $$Props['caption'] = undefined;
	export let src: $$Props['src'] = undefined;
	export let srcset: $$Props['srcset'] = undefined;
	export let size: $$Props['size'] = 'max-w-full';
	export let alignment: $$Props['alignment'] = '';
	export let imgClass: $$Props['imgClass'] = 'h-auto border-3 border-brutal-border';
	export let figClass: $$Props['figClass'] = 'max-w-lg';
	export let alt: $$Props['alt'] = '';
	export let effect: $$Props['effect'] = '';
	export let captionClass: $$Props['captionClass'] =
		'mt-2 text-sm text-center font-semibold text-brutal-text-secondary';
	let className = '';
	export { className as class };

	// Neo-brutalist styling - bold borders on images
	const neoBrutalistClasses = '!transition-all !duration-150';

	$: combinedClasses = `${neoBrutalistClasses} ${className}`;
</script>

<FlowbiteImg
	{caption}
	{src}
	{srcset}
	{size}
	{alignment}
	{imgClass}
	{figClass}
	{alt}
	{effect}
	{captionClass}
	class={combinedClasses}
	{...$$restProps}
/>
