import { describe, it, expect, vi } from 'vitest';
import { trapIntersection } from './trapIntersection';

describe('trapIntersection action - Svelte 5 compatibility', () => {
	it('should follow Svelte 5 action contract (return object with destroy method)', () => {
		// Mock the DOM environment minimally
		const mockElement = {
			nodeType: 1
		} as HTMLElement;

		const mockObserver = {
			observe: vi.fn(),
			disconnect: vi.fn(),
			unobserve: vi.fn(),
			takeRecords: vi.fn(),
			root: null,
			rootMargin: '',
			thresholds: []
		};

		// Mock IntersectionObserver
		global.IntersectionObserver = vi.fn().mockImplementation(() => mockObserver) as any;

		// Mock document.body
		global.document = {
			body: {}
		} as any;

		const cb = vi.fn();
		const action = trapIntersection(mockElement, { cb });

		// Verify Svelte 5 action contract:
		// 1. Action returns an object
		expect(action).toBeDefined();
		expect(typeof action).toBe('object');

		// 2. Object has a destroy method
		expect(typeof action.destroy).toBe('function');

		// 3. Destroy method can be called
		expect(() => action.destroy()).not.toThrow();

		// Verify observer was created and used
		expect(global.IntersectionObserver).toHaveBeenCalled();
		expect(mockObserver.observe).toHaveBeenCalledWith(mockElement);
		expect(mockObserver.disconnect).toHaveBeenCalled();
	});

	it('should accept options parameter (Svelte 5 action pattern)', () => {
		const mockElement = { nodeType: 1 } as HTMLElement;
		const mockObserver = {
			observe: vi.fn(),
			disconnect: vi.fn(),
			unobserve: vi.fn(),
			takeRecords: vi.fn(),
			root: null,
			rootMargin: '',
			thresholds: []
		};

		global.IntersectionObserver = vi.fn().mockImplementation(() => mockObserver) as any;
		global.document = { body: {} } as any;

		const cb = vi.fn();
		const onDestroyCb = vi.fn();

		// Test that action accepts options
		const action = trapIntersection(mockElement, {
			cb,
			onDestroyCb,
			once: true,
			threshold: 0.5
		});

		expect(action).toBeDefined();
		expect(typeof action.destroy).toBe('function');

		// Verify onDestroyCb is called on destroy
		action.destroy();
		expect(onDestroyCb).toHaveBeenCalled();
	});
});
