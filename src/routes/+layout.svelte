<script lang="ts">
	import { onMount } from 'svelte';
	import { theme } from '$lib/frontend/stores/theme';
	import '../app.css';

	// Initialize theme on app load
	onMount(() => {
		// The theme store already initializes on creation, but we call initialize()
		// to ensure the theme is applied to the document root element
		theme.initialize();
	});

	// Subscribe to theme changes to apply the theme class to the root element
	$: if ($theme) {
		if (typeof document !== 'undefined') {
			if ($theme === 'dark') {
				document.documentElement.classList.add('dark');
			} else {
				document.documentElement.classList.remove('dark');
			}
		}
	}
</script>

<main class="flex h-dvh w-full bg-gray-100">
	<slot />
</main>
