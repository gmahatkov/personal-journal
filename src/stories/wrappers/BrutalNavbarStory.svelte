<script lang="ts">
	import { BrutalNavbar } from '$lib/frontend/components/wrappers';
	import { NavBrand, Avatar, NavHamburger } from 'flowbite-svelte';
	import Button from '$lib/frontend/components/base/Button.svelte';

	export let fluid: boolean = false;
	export let showAvatar: boolean = true;
	export let showHamburger: boolean = true;
</script>

<div class="w-full">
	<BrutalNavbar {fluid}>
		<NavBrand href="/">
			<span class="self-center whitespace-nowrap text-xl font-bold">Brand Name</span>
		</NavBrand>

		<div class="flex items-center gap-4 md:order-2">
			{#if showAvatar}
				<Avatar
					src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
					rounded
					class="border-2 border-brutal-border"
				/>
			{/if}
			{#if showHamburger}
				<NavHamburger />
			{/if}
		</div>

		<div class="hidden md:flex md:w-auto md:order-1 gap-4">
			<Button variant="ghost" size="sm">Home</Button>
			<Button variant="ghost" size="sm">About</Button>
			<Button variant="ghost" size="sm">Services</Button>
			<Button variant="ghost" size="sm">Contact</Button>
		</div>
	</BrutalNavbar>
</div>
