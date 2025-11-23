import { describe, it, expect, vi } from 'vitest';
import { get } from 'svelte/store';
import { theme, type Theme } from './theme';

describe('theme store - Svelte 5 compatibility', () => {
	it('should support get() function for reading store value (Svelte 5 compatible)', () => {
		// Test that we can read using get() - this is the Svelte 5 way
		const initialValue = get(theme);
		expect(initialValue).toBeDefined();
		expect(['light', 'dark']).toContain(initialValue);
	});

	it('should support subscribe method (Svelte 5 store contract)', () => {
		// Verify store has subscribe method (required for $ prefix)
		expect(typeof theme.subscribe).toBe('function');

		// Verify subscription works
		let currentValue: Theme | undefined;
		const unsubscribe = theme.subscribe((value) => {
			currentValue = value;
		});

		expect(currentValue).toBeDefined();
		expect(['light', 'dark']).toContain(currentValue!);

		// Cleanup
		unsubscribe();
	});

	it('should toggle between light and dark themes', () => {
		const initial = get(theme);

		theme.toggle();
		const afterToggle = get(theme);
		expect(afterToggle).not.toBe(initial);
		expect(['light', 'dark']).toContain(afterToggle);

		theme.toggle();
		const afterSecondToggle = get(theme);
		expect(afterSecondToggle).toBe(initial);
	});

	it('should allow setting theme directly', () => {
		theme.set('dark');
		expect(get(theme)).toBe('dark');

		theme.set('light');
		expect(get(theme)).toBe('light');
	});

	it('should trigger reactive updates when theme changes', () => {
		const values: Theme[] = [];

		const unsubscribe = theme.subscribe((value) => {
			values.push(value);
		});

		const initialLength = values.length;

		theme.toggle();

		// Should have received a new value
		expect(values.length).toBeGreaterThan(initialLength);

		unsubscribe();
	});
});
