import type { Meta, StoryObj } from '@storybook/svelte';
import BlockquoteStory from './BlockquoteStory.svelte';

const meta = {
	title: 'Base/Typography/Blockquote',
	component: BlockquoteStory,
	tags: ['autodocs'],
	argTypes: {
		border: { control: 'boolean', description: 'Show left border' },
		italic: { control: 'boolean', description: 'Italic text' },
		bg: { control: 'boolean', description: 'Show background' },
		alignment: {
			control: 'select',
			options: ['left', 'center', 'right'],
			description: 'Text alignment'
		},
		size: {
			control: 'select',
			options: [
				'xs',
				'sm',
				'base',
				'lg',
				'xl',
				'2xl',
				'3xl',
				'4xl',
				'5xl',
				'6xl',
				'7xl',
				'8xl',
				'9xl'
			],
			description: 'Text size'
		},
		text: { control: 'text', description: 'Quote content' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'A blockquote component with neo-brutalist styling. Features bold borders and strong visual presence for highlighting quoted text.'
			}
		}
	}
} satisfies Meta<BlockquoteStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: 'This is a blockquote demonstrating the neo-brutalist design style with bold borders and strong visual presence.'
	}
};

export const WithBorder: Story = {
	args: {
		border: true,
		text: 'This blockquote features a bold left border characteristic of neo-brutalist design.'
	}
};

export const WithBackground: Story = {
	args: { bg: true, text: 'This blockquote has a background color for additional emphasis.' }
};

export const BorderAndBackground: Story = {
	args: {
		border: true,
		bg: true,
		text: 'This blockquote combines both border and background for maximum visual impact.'
	}
};

export const Centered: Story = {
	args: {
		alignment: 'center',
		text: 'This blockquote is center-aligned for a different visual presentation.'
	}
};

export const NotItalic: Story = {
	args: { italic: false, text: 'This blockquote uses regular (non-italic) text style.' }
};

export const Large: Story = {
	args: { size: 'xl', border: true, text: 'This is a large blockquote for prominent quotes.' }
};

export const Small: Story = {
	args: {
		size: 'sm',
		border: true,
		text: 'This is a smaller blockquote for less prominent quotes.'
	}
};
