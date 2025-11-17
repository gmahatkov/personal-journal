import type { Meta, StoryObj } from '@storybook/svelte';
import AStory from './AStory.svelte';

const meta = {
	title: 'Base/Typography/A',
	component: AStory,
	tags: ['autodocs'],
	argTypes: {
		href: { control: 'text', description: 'Link URL' },
		text: { control: 'text', description: 'Link text' },
		color: { control: 'text', description: 'Text color class' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'A link component with neo-brutalist styling. Features bold, clear links with strong underlines and hover effects.'
			}
		}
	}
} satisfies Meta<AStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { text: 'This is a link', href: '#' } };

export const PrimaryColor: Story = {
	args: { text: 'Primary colored link', href: '#', color: 'text-brutal-primary' }
};

export const SecondaryColor: Story = {
	args: { text: 'Secondary colored link', href: '#', color: 'text-brutal-secondary' }
};

export const AccentColor: Story = {
	args: { text: 'Accent colored link', href: '#', color: 'text-brutal-accent' }
};

export const LongText: Story = {
	args: { text: 'This is a longer link text to demonstrate how links wrap', href: '#' },
	parameters: { docs: { description: { story: 'Link with longer text content' } } }
};
