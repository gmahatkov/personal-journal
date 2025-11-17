<script lang="ts">
	import Modal from '$lib/frontend/components/base/Modal.svelte';
	import Button from '$lib/frontend/components/base/Button.svelte';
	import type { SizeType } from 'flowbite-svelte';

	export let size: SizeType = 'md';
	export let title: string | undefined = 'Modal Title';
	export let showHeader = true;
	export let showFooter = true;
	export let bodyContent = 'This is the modal body content. You can put any content here.';
	export let dismissable = true;
	export let autoclose = false;

	let open = false;

	function openModal() {
		open = true;
	}

	function closeModal() {
		open = false;
	}
</script>

<div>
	<Button on:click={openModal}>Open Modal</Button>

	{#if showHeader && showFooter}
		<Modal bind:open {size} {title} {dismissable} {autoclose}>
			<div slot="header" class="text-brutal-text font-bold text-xl">
				{title}
			</div>

			<div class="text-brutal-text">
				{bodyContent}
			</div>

			<div slot="footer" class="flex justify-end gap-4">
				<Button variant="outline" on:click={closeModal}>Cancel</Button>
				<Button variant="primary" on:click={closeModal}>Confirm</Button>
			</div>
		</Modal>
	{:else if showHeader && !showFooter}
		<Modal bind:open {size} {title} {dismissable} {autoclose}>
			<div slot="header" class="text-brutal-text font-bold text-xl">
				{title}
			</div>

			<div class="text-brutal-text">
				{bodyContent}
			</div>
		</Modal>
	{:else if !showHeader && showFooter}
		<Modal bind:open {size} {title} {dismissable} {autoclose}>
			<div class="text-brutal-text">
				{bodyContent}
			</div>

			<div slot="footer" class="flex justify-end gap-4">
				<Button variant="outline" on:click={closeModal}>Cancel</Button>
				<Button variant="primary" on:click={closeModal}>Confirm</Button>
			</div>
		</Modal>
	{:else}
		<Modal bind:open {size} {title} {dismissable} {autoclose}>
			<div class="text-brutal-text">
				{bodyContent}
			</div>
		</Modal>
	{/if}
</div>
