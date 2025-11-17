<script lang="ts">
	import { Modal as FlowbiteModal } from 'flowbite-svelte';
	import type { SizeType } from 'flowbite-svelte';

	export let open = false;
	export let title: string | undefined = undefined;
	export let size: SizeType = 'md';
	export let placement:
		| 'top-left'
		| 'top-center'
		| 'top-right'
		| 'center-left'
		| 'center'
		| 'center-right'
		| 'bottom-left'
		| 'bottom-center'
		| 'bottom-right' = 'center';
	export let autoclose = false;
	export let dismissable = true;
	export let backdropClass = '';
	export let defaultClass = '';
	let className = '';
	export { className as class };

	// Neo-brutalist styling for modal
	const neoBrutalistClasses =
		'!border-5 !border-brutal-border !bg-brutal-surface !shadow-brutal-lg !rounded-none';

	// Neo-brutalist backdrop styling
	const neoBrutalistBackdrop = 'bg-brutal-text/50 backdrop-blur-sm';

	$: combinedClasses = `${neoBrutalistClasses} ${className}`;
	$: combinedBackdropClasses = `${neoBrutalistBackdrop} ${backdropClass}`;
</script>

<FlowbiteModal
	bind:open
	{title}
	{size}
	{placement}
	{autoclose}
	{dismissable}
	{defaultClass}
	backdropClass={combinedBackdropClasses}
	class={combinedClasses}
	on:close
	on:open
	on:hide
	on:show
>
	<slot name="header" slot="header" />
	<slot />
	<slot name="footer" slot="footer" />
</FlowbiteModal>
