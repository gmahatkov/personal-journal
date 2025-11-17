import { writable } from 'svelte/store';
import { browser } from '$app/environment';
import { THEME_STORAGE_KEY } from '$lib/config/consts';

export type Theme = 'light' | 'dark';

/**
 * Detects the user's system theme preference
 */
function getSystemTheme(): Theme {
	if (!browser) return 'light';

	try {
		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		return darkModeQuery.matches ? 'dark' : 'light';
	} catch (error) {
		console.warn('Failed to detect system theme preference:', error);
		return 'light';
	}
}

/**
 * Reads theme preference from localStorage
 */
function getStoredTheme(): Theme | null {
	if (!browser) return null;

	try {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		if (stored === 'light' || stored === 'dark') {
			return stored;
		}
		return null;
	} catch (error) {
		console.warn('Failed to read theme from localStorage:', error);
		return null;
	}
}

/**
 * Writes theme preference to localStorage
 */
function setStoredTheme(theme: Theme): void {
	if (!browser) return;

	try {
		localStorage.setItem(THEME_STORAGE_KEY, theme);
	} catch (error) {
		console.warn('Failed to write theme to localStorage:', error);
	}
}

/**
 * Applies theme class to document root
 */
function applyTheme(theme: Theme): void {
	if (!browser) return;

	if (theme === 'dark') {
		document.documentElement.classList.add('dark');
	} else {
		document.documentElement.classList.remove('dark');
	}
}

/**
 * Initializes theme from stored preference or system preference
 */
function initializeTheme(): Theme {
	const stored = getStoredTheme();
	if (stored) {
		return stored;
	}
	return getSystemTheme();
}

/**
 * Creates the theme store with localStorage persistence
 */
function createThemeStore() {
	const initialTheme = initializeTheme();
	const { subscribe, set, update } = writable<Theme>(initialTheme);

	// Apply initial theme
	applyTheme(initialTheme);

	return {
		subscribe,
		/**
		 * Sets the theme to a specific value
		 */
		set: (theme: Theme) => {
			set(theme);
			applyTheme(theme);
			setStoredTheme(theme);
		},
		/**
		 * Toggles between light and dark themes
		 */
		toggle: () => {
			update((current) => {
				const newTheme = current === 'light' ? 'dark' : 'light';
				applyTheme(newTheme);
				setStoredTheme(newTheme);
				return newTheme;
			});
		},
		/**
		 * Initializes the theme (useful for re-initialization if needed)
		 */
		initialize: () => {
			const theme = initializeTheme();
			set(theme);
			applyTheme(theme);
		}
	};
}

export const theme = createThemeStore();
