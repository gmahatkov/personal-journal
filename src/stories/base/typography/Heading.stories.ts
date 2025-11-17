import type { Meta, StoryObj } from '@storybook/svelte';
import HeadingStory from './HeadingStory.svelte';

const meta = {
	title: 'Base/Typography/Heading',
	component: HeadingStory,
	tags: ['autodocs'],
	argTypes: {
		tag: {
			control: 'select',
			options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
			description: 'HTML heading tag'
		},
		color: { control: 'text', description: 'Text color class' },
		customSize: { control: 'text', description: 'Custom size class' },
		text: { control: 'text', description: 'Heading content' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'A heading component with neo-brutalist styling. Features bold, strong headings with theme-aware colors and semantic HTML tags.'
			}
		}
	}
} satisfies Meta<HeadingStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = { args: { tag: 'h1', text: 'Heading Level 1' } };

export const H2: Story = { args: { tag: 'h2', text: 'Heading Level 2' } };

export const H3: Story = { args: { tag: 'h3', text: 'Heading Level 3' } };

export const H4: Story = { args: { tag: 'h4', text: 'Heading Level 4' } };

export const H5: Story = { args: { tag: 'h5', text: 'Heading Level 5' } };

export const H6: Story = { args: { tag: 'h6', text: 'Heading Level 6' } };

export const CustomSize: Story = {
	args: { tag: 'h2', customSize: 'text-6xl', text: 'Custom Sized Heading' },
	parameters: { docs: { description: { story: 'Heading with custom size class applied' } } }
};

export const CustomColor: Story = {
	args: { tag: 'h2', color: 'text-brutal-primary', text: 'Colored Heading' },
	parameters: { docs: { description: { story: 'Heading with custom color applied' } } }
};
