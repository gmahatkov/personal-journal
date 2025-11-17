<script lang="ts">
	import { BrutalDropdown, BrutalDropdownItem } from '$lib/frontend/components/wrappers';
	import { Dropdown, DropdownItem } from 'flowbite-svelte';
	import Button from '$lib/frontend/components/base/Button.svelte';
</script>

<div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
	<!-- Unwrapped Flowbite Dropdown -->
	<div class="space-y-4">
		<h3 class="text-lg font-bold text-brutal-text">Standard Flowbite Dropdown</h3>
		<p class="text-sm text-brutal-text-secondary">
			Default Flowbite styling with soft shadows and rounded corners
		</p>
		<div class="flex justify-center items-center min-h-[200px]">
			<button
				id="flowbite-trigger"
				class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
			>
				Open Flowbite
			</button>
			<Dropdown triggeredBy="#flowbite-trigger">
				<DropdownItem>Dashboard</DropdownItem>
				<DropdownItem>Settings</DropdownItem>
				<DropdownItem>Profile</DropdownItem>
				<DropdownItem>Sign out</DropdownItem>
			</Dropdown>
		</div>
	</div>

	<!-- Wrapped Brutal Dropdown -->
	<div class="space-y-4">
		<h3 class="text-lg font-bold text-brutal-text">Brutal Dropdown Wrapper</h3>
		<p class="text-sm text-brutal-text-secondary">
			Neo-brutalist styling with bold borders and hard shadows
		</p>
		<div class="flex justify-center items-center min-h-[200px]">
			<Button id="brutal-trigger">Open Brutal</Button>
			<BrutalDropdown triggeredBy="#brutal-trigger">
				<BrutalDropdownItem>Dashboard</BrutalDropdownItem>
				<BrutalDropdownItem>Settings</BrutalDropdownItem>
				<BrutalDropdownItem>Profile</BrutalDropdownItem>
				<BrutalDropdownItem>Sign out</BrutalDropdownItem>
			</BrutalDropdown>
		</div>
	</div>
</div>

<div class="p-8 border-t-3 border-brutal-border">
	<h3 class="text-lg font-bold text-brutal-text mb-4">Key Differences</h3>
	<ul class="space-y-2 text-sm text-brutal-text-secondary">
		<li>
			• <strong>Borders:</strong> Brutal uses 3px bold borders vs Flowbite's 1px subtle borders
		</li>
		<li>
			• <strong>Shadows:</strong> Brutal uses hard offset shadows vs Flowbite's soft blur shadows
		</li>
		<li>
			• <strong>Colors:</strong> Brutal uses design tokens for theme switching vs Flowbite's fixed colors
		</li>
		<li>
			• <strong>Hover states:</strong> Brutal uses bold color transitions vs Flowbite's subtle background
			changes
		</li>
		<li>• <strong>Typography:</strong> Brutal emphasizes bold fonts for stronger hierarchy</li>
	</ul>
</div>
