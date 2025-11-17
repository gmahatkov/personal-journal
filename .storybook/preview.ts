import type { Preview } from '@storybook/svelte';
import '../src/app.css';

const preview: Preview = {
	parameters: { controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } } },
	globalTypes: {
		theme: {
			description: 'Global theme for components',
			defaultValue: 'light',
			toolbar: {
				title: 'Theme',
				icon: 'circlehollow',
				items: [
					{ value: 'light', icon: 'sun', title: 'Light' },
					{ value: 'dark', icon: 'moon', title: 'Dark' }
				],
				dynamicTitle: true
			}
		}
	},
	decorators: [
		(story, context) => {
			const theme = context.globals.theme || 'light';

			// Apply theme class to document root and body
			if (typeof document !== 'undefined') {
				document.documentElement.classList.toggle('dark', theme === 'dark');
				document.body.classList.toggle('dark', theme === 'dark');

				// Apply background color
				if (theme === 'dark') {
					document.body.style.backgroundColor = '#1a1a1a';
					document.body.style.color = '#f5f5f5';
				} else {
					document.body.style.backgroundColor = '#f5f5f5';
					document.body.style.color = '#1a1a1a';
				}
			}

			return story();
		}
	]
};

export default preview;
