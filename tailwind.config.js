/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				// Neo-brutalist design tokens
				brutal: {
					bg: 'var(--brutal-bg)',
					surface: 'var(--brutal-surface)',
					text: 'var(--brutal-text)',
					'text-secondary': 'var(--brutal-text-secondary)',
					border: 'var(--brutal-border)',
					primary: 'var(--brutal-primary)',
					secondary: 'var(--brutal-secondary)',
					accent: 'var(--brutal-accent)',
					success: 'var(--brutal-success)',
					warning: 'var(--brutal-warning)',
					error: 'var(--brutal-error)'
				},
				// Primary color scale - theme-aware via CSS variables
				primary: {
					50: 'var(--primary-50)',
					100: 'var(--primary-100)',
					200: 'var(--primary-200)',
					300: 'var(--primary-300)',
					400: 'var(--primary-400)',
					500: 'var(--primary-500)',
					600: 'var(--primary-600)',
					700: 'var(--primary-700)',
					800: 'var(--primary-800)',
					900: 'var(--primary-900)',
					950: 'var(--primary-950)',
					DEFAULT: 'var(--primary-500)'
				},
				// Secondary color scale - theme-aware via CSS variables
				secondary: {
					50: 'var(--secondary-50)',
					100: 'var(--secondary-100)',
					200: 'var(--secondary-200)',
					300: 'var(--secondary-300)',
					400: 'var(--secondary-400)',
					500: 'var(--secondary-500)',
					600: 'var(--secondary-600)',
					700: 'var(--secondary-700)',
					800: 'var(--secondary-800)',
					900: 'var(--secondary-900)',
					950: 'var(--secondary-950)',
					DEFAULT: 'var(--secondary-500)'
				},
				// Accent color scale - theme-aware via CSS variables
				accent: {
					50: 'var(--accent-50)',
					100: 'var(--accent-100)',
					200: 'var(--accent-200)',
					300: 'var(--accent-300)',
					400: 'var(--accent-400)',
					500: 'var(--accent-500)',
					600: 'var(--accent-600)',
					700: 'var(--accent-700)',
					800: 'var(--accent-800)',
					900: 'var(--accent-900)',
					950: 'var(--accent-950)',
					DEFAULT: 'var(--accent-300)'
				},
				// Success color scale - theme-aware via CSS variables
				success: {
					50: 'var(--success-50)',
					100: 'var(--success-100)',
					200: 'var(--success-200)',
					300: 'var(--success-300)',
					400: 'var(--success-400)',
					500: 'var(--success-500)',
					600: 'var(--success-600)',
					700: 'var(--success-700)',
					800: 'var(--success-800)',
					900: 'var(--success-900)',
					950: 'var(--success-950)',
					DEFAULT: 'var(--success-500)'
				},
				// Warning color scale - theme-aware via CSS variables
				warning: {
					50: 'var(--warning-50)',
					100: 'var(--warning-100)',
					200: 'var(--warning-200)',
					300: 'var(--warning-300)',
					400: 'var(--warning-400)',
					500: 'var(--warning-500)',
					600: 'var(--warning-600)',
					700: 'var(--warning-700)',
					800: 'var(--warning-800)',
					900: 'var(--warning-900)',
					950: 'var(--warning-950)',
					DEFAULT: 'var(--warning-400)'
				},
				// Error color scale - theme-aware via CSS variables
				error: {
					50: 'var(--error-50)',
					100: 'var(--error-100)',
					200: 'var(--error-200)',
					300: 'var(--error-300)',
					400: 'var(--error-400)',
					500: 'var(--error-500)',
					600: 'var(--error-600)',
					700: 'var(--error-700)',
					800: 'var(--error-800)',
					900: 'var(--error-900)',
					950: 'var(--error-950)',
					DEFAULT: 'var(--error-500)'
				},
				// Danger alias for error
				danger: {
					50: 'var(--error-50)',
					100: 'var(--error-100)',
					200: 'var(--error-200)',
					300: 'var(--error-300)',
					400: 'var(--error-400)',
					500: 'var(--error-500)',
					600: 'var(--error-600)',
					700: 'var(--error-700)',
					800: 'var(--error-800)',
					900: 'var(--error-900)',
					950: 'var(--error-950)',
					DEFAULT: 'var(--error-500)'
				}
			},
			borderWidth: { 3: '3px', 5: '5px' },
			boxShadow: {
				'brutal-sm': 'var(--shadow-brutal-sm)',
				brutal: 'var(--shadow-brutal)',
				'brutal-lg': 'var(--shadow-brutal-lg)'
			},
			spacing: {
				'brutal-xs': 'var(--spacing-xs)',
				'brutal-sm': 'var(--spacing-sm)',
				'brutal-md': 'var(--spacing-md)',
				'brutal-lg': 'var(--spacing-lg)',
				'brutal-xl': 'var(--spacing-xl)',
				'brutal-2xl': 'var(--spacing-2xl)',
				'brutal-3xl': 'var(--spacing-3xl)',
				200: '200px'
			},
			fontFamily: { 'brutal-sans': 'var(--font-sans)', 'brutal-mono': 'var(--font-mono)' },
			gridTemplateRows: { layout: 'auto 1fr auto' },
			transitionDuration: { brutal: '150ms' }
		}
	},
	plugins: []
};
