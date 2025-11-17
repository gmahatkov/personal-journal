<script lang="ts">
	import { Dropdown as FlowbiteDropdown } from 'flowbite-svelte';
	import type { Placement } from '@floating-ui/dom';

	// Export all Flowbite Dropdown props
	export let open: boolean = false;
	export let triggeredBy: string | undefined = undefined;
	export let placement: Placement = 'bottom';
	export let trigger: 'click' | 'hover' = 'click';
	export let arrow: boolean = false;
	export let offset: number = 8;
	export let transition: any = undefined;
	export let params: Record<string, unknown> = {};
	export let containerClass: string = '';
	export let headerClass: string = '';
	export let footerClass: string = '';
	export let activeClass: string = '';
	export let classContainer: string = '';

	// Neo-brutalist styling
	const brutalClass =
		'border-3 border-brutal-border shadow-brutal bg-brutal-surface text-brutal-text';

	// Merge with user-provided class
	$: finalClass = `${brutalClass} ${$$props.class || ''}`;
</script>

<FlowbiteDropdown
	bind:open
	{triggeredBy}
	{placement}
	{trigger}
	{arrow}
	{offset}
	{transition}
	{params}
	{containerClass}
	{headerClass}
	{footerClass}
	{activeClass}
	{classContainer}
	class={finalClass}
>
	<slot />
	<slot name="header" slot="header" />
	<slot name="footer" slot="footer" />
</FlowbiteDropdown>
