import type { Meta, StoryObj } from '@storybook/svelte';
import PStory from './PStory.svelte';

const meta = {
	title: 'Base/Typography/P',
	component: PStory,
	tags: ['autodocs'],
	argTypes: {
		color: { control: 'text', description: 'Text color class' },
		height: {
			control: 'select',
			options: ['normal', 'relaxed', 'loose'],
			description: 'Line height'
		},
		align: {
			control: 'select',
			options: ['left', 'center', 'right'],
			description: 'Text alignment'
		},
		justify: { control: 'boolean', description: 'Justify text' },
		italic: { control: 'boolean', description: 'Italic text' },
		firstupper: { control: 'boolean', description: 'First letter uppercase and enlarged' },
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
		weight: {
			control: 'select',
			options: [
				'thin',
				'extralight',
				'light',
				'normal',
				'medium',
				'semibold',
				'bold',
				'extrabold',
				'black'
			],
			description: 'Font weight'
		},
		text: { control: 'text', description: 'Paragraph content' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'A paragraph component with neo-brutalist styling. Features clean, readable text with theme-aware colors and various size and weight options.'
			}
		}
	}
} satisfies Meta<PStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		text: 'This is a paragraph of text demonstrating the neo-brutalist typography style. It features clean, readable text with theme-aware colors.'
	}
};

export const Small: Story = {
	args: { size: 'sm', text: 'This is a small paragraph with reduced font size.' }
};

export const Large: Story = {
	args: { size: 'lg', text: 'This is a large paragraph with increased font size.' }
};

export const ExtraLarge: Story = {
	args: { size: '2xl', text: 'This is an extra large paragraph for emphasis.' }
};

export const Bold: Story = {
	args: { weight: 'bold', text: 'This paragraph uses bold font weight for emphasis.' }
};

export const Italic: Story = {
	args: { italic: true, text: 'This paragraph is displayed in italic style.' }
};

export const Centered: Story = {
	args: { align: 'center', text: 'This paragraph is center-aligned.' }
};

export const Justified: Story = {
	args: {
		justify: true,
		text: 'This is a justified paragraph. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
	}
};

export const FirstUpper: Story = {
	args: {
		firstupper: true,
		text: 'This paragraph has an enlarged and uppercase first letter, creating a drop cap effect. Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
	}
};

export const RelaxedHeight: Story = {
	args: {
		height: 'relaxed',
		text: 'This paragraph uses relaxed line height for improved readability. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
	}
};
