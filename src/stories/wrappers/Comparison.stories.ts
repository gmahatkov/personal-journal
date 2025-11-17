import type { Meta, StoryObj } from '@storybook/svelte';
import ComparisonStory from './ComparisonStory.svelte';

const meta = {
	title: 'Wrappers/Comparison',
	component: ComparisonStory,
	tags: ['autodocs'],
	parameters: {
		docs: {
			description: {
				component:
					'Side-by-side comparison of standard Flowbite components vs Brutal wrappers. This demonstrates how the wrapper components maintain Flowbite API compatibility while applying neo-brutalist design principles.'
			}
		}
	}
} satisfies Meta<ComparisonStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DropdownComparison: Story = {};
