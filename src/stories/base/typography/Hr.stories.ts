import type { Meta, StoryObj } from '@storybook/svelte';
import HrStory from './HrStory.svelte';

const meta = {
	title: 'Base/Typography/Hr',
	component: HrStory,
	tags: ['autodocs'],
	argTypes: {
		icon: { control: 'boolean', description: 'Show icon/text in center' },
		text: { control: 'text', description: 'Text to display in center (when icon is true)' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'A horizontal rule component with neo-brutalist styling. Features bold, solid dividers with optional centered text or icons.'
			}
		}
	}
} satisfies Meta<HrStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: {} };

export const WithText: Story = {
	args: { icon: true, text: 'OR' },
	parameters: { docs: { description: { story: 'Horizontal rule with centered text' } } }
};

export const WithLongerText: Story = { args: { icon: true, text: 'Continue Reading' } };
