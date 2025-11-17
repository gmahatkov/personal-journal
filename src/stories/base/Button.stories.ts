import type { Meta, StoryObj } from '@storybook/svelte';
import ButtonStory from './ButtonStory.svelte';

const meta = {
	title: 'Base/Button',
	component: ButtonStory,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['primary', 'secondary', 'outline', 'ghost'],
			description: 'Visual style variant of the button'
		},
		size: { control: 'select', options: ['sm', 'md', 'lg'], description: 'Size of the button' },
		disabled: { control: 'boolean', description: 'Whether the button is disabled' },
		type: {
			control: 'select',
			options: ['button', 'submit', 'reset'],
			description: 'HTML button type attribute'
		},
		label: { control: 'text', description: 'Button text content' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'A neo-brutalist button component with bold borders, hard shadows, and distinct interactive states. Features hover effects with shadow shifts and active states with position changes.'
			}
		}
	}
} satisfies Meta<ButtonStory>;

export default meta;
type Story = StoryObj<typeof meta>;

type ButtonStoryProps = {
	variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	disabled?: boolean;
	type?: 'button' | 'submit' | 'reset';
	label?: string;
};

// Primary variant stories
export const Primary: Story = {
	args: { variant: 'primary', size: 'md', label: 'Primary Button' },
	render: (args) => ({ Component: ButtonStory, props: args })
};

export const PrimarySmall: Story = {
	args: { variant: 'primary', size: 'sm', label: 'Small Primary' },
	render: (args) => ({ Component: ButtonStory, props: args })
};

export const PrimaryLarge: Story = {
	args: { variant: 'primary', size: 'lg', label: 'Large Primary' },
	render: (args) => ({ Component: ButtonStory, props: args })
};

// Secondary variant stories
export const Secondary: Story = {
	args: { variant: 'secondary', size: 'md', label: 'Secondary Button' },
	render: (args) => ({ Component: ButtonStory, props: args })
};

export const SecondarySmall: Story = {
	args: { variant: 'secondary', size: 'sm', label: 'Small Secondary' },
	render: (args) => ({ Component: ButtonStory, props: args })
};

export const SecondaryLarge: Story = {
	args: { variant: 'secondary', size: 'lg', label: 'Large Secondary' },
	render: (args) => ({ Component: ButtonStory, props: args })
};

// Outline variant stories
export const Outline: Story = {
	args: { variant: 'outline', size: 'md', label: 'Outline Button' },
	render: (args) => ({ Component: ButtonStory, props: args })
};

export const OutlineSmall: Story = {
	args: { variant: 'outline', size: 'sm', label: 'Small Outline' },
	render: (args) => ({ Component: ButtonStory, props: args })
};

export const OutlineLarge: Story = {
	args: { variant: 'outline', size: 'lg', label: 'Large Outline' },
	render: (args) => ({ Component: ButtonStory, props: args })
};

// Ghost variant stories
export const Ghost: Story = {
	args: { variant: 'ghost', size: 'md', label: 'Ghost Button' },
	render: (args) => ({ Component: ButtonStory, props: args })
};

export const GhostSmall: Story = {
	args: { variant: 'ghost', size: 'sm', label: 'Small Ghost' },
	render: (args) => ({ Component: ButtonStory, props: args })
};

export const GhostLarge: Story = {
	args: { variant: 'ghost', size: 'lg', label: 'Large Ghost' },
	render: (args) => ({ Component: ButtonStory, props: args })
};

// Disabled state stories
export const PrimaryDisabled: Story = {
	args: { variant: 'primary', size: 'md', disabled: true, label: 'Disabled Primary' },
	render: (args) => ({ Component: ButtonStory, props: args }),
	parameters: {
		docs: { description: { story: 'Disabled state with reduced opacity and no pointer events' } }
	}
};

export const SecondaryDisabled: Story = {
	args: { variant: 'secondary', size: 'md', disabled: true, label: 'Disabled Secondary' },
	render: (args) => ({ Component: ButtonStory, props: args })
};

export const OutlineDisabled: Story = {
	args: { variant: 'outline', size: 'md', disabled: true, label: 'Disabled Outline' },
	render: (args) => ({ Component: ButtonStory, props: args })
};

export const GhostDisabled: Story = {
	args: { variant: 'ghost', size: 'md', disabled: true, label: 'Disabled Ghost' },
	render: (args) => ({ Component: ButtonStory, props: args })
};
