<script lang="ts">
	import {
		BrutalDropdown,
		BrutalDropdownItem,
		BrutalDropdownHeader
	} from '$lib/frontend/components/wrappers';
	import Button from '$lib/frontend/components/base/Button.svelte';
	import type { Placement } from '@floating-ui/dom';

	export let placement: Placement = 'bottom';
	export let trigger: 'click' | 'hover' = 'click';
	export let showHeader: boolean = true;
	export let showFooter: boolean = false;
</script>

<div class="flex justify-center items-center min-h-[300px]">
	<Button id="dropdown-trigger">Open Dropdown</Button>

	<BrutalDropdown triggeredBy="#dropdown-trigger" {placement} {trigger}>
		<div slot="header">
			<BrutalDropdownHeader>
				<span class="block text-sm font-bold">User Name</span>
				<span class="block text-sm text-brutal-text-secondary">user@example.com</span>
			</BrutalDropdownHeader>
		</div>
		<BrutalDropdownItem>Dashboard</BrutalDropdownItem>
		<BrutalDropdownItem>Settings</BrutalDropdownItem>
		<BrutalDropdownItem>Profile</BrutalDropdownItem>
		<BrutalDropdownItem>Sign out</BrutalDropdownItem>
		<div slot="footer">
			<div class="py-2 px-4 border-t-3 border-brutal-border">
				<span class="text-sm">Footer content</span>
			</div>
		</div>
	</BrutalDropdown>
</div>
