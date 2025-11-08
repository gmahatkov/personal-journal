import type { Meta, StoryObj } from '@storybook/svelte';
import InputStory from './InputStory.svelte';

const meta = {
	title: 'Base/Form/Input',
	component: InputStory,
	tags: ['autodocs'],
	argTypes: {
		type: {
			control: 'select',
			options: ['text', 'email', 'password', 'number'],
			description: 'Input type attribute'
		},
		placeholder: { control: 'text', description: 'Placeholder text' },
		disabled: { control: 'boolean', description: 'Whether the input is disabled' },
		color: {
			control: 'select',
			options: ['base', 'green', 'red'],
			description: 'Color variant for success/error states'
		},
		label: { control: 'text', description: 'Label text' },
		value: { control: 'text', description: 'Input value' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'A neo-brutalist input component with bold borders (3px), hard shadows, and distinct focus states. Features a bold focus ring (3px minimum) and supports error/success states with color variants.'
			}
		}
	}
} satisfies Meta<InputStory>;

export default meta;
type Story = StoryObj<typeof meta>;

// Text input stories
export const Text: Story = {
	args: { type: 'text', placeholder: 'Enter your name', label: 'Name' },
	parameters: { docs: { description: { story: 'Standard text input with label' } } }
};

export const Email: Story = {
	args: { type: 'email', placeholder: 'your.email@example.com', label: 'Email Address' },
	parameters: { docs: { description: { story: 'Email input with validation' } } }
};

export const Password: Story = {
	args: { type: 'password', placeholder: '••••••••', label: 'Password' },
	parameters: { docs: { description: { story: 'Password input with masked characters' } } }
};

export const Number: Story = {
	args: { type: 'number', placeholder: '0', label: 'Quantity' },
	parameters: { docs: { description: { story: 'Number input with increment/decrement controls' } } }
};

// State stories
export const WithoutLabel: Story = {
	args: { type: 'text', placeholder: 'No label input' },
	parameters: { docs: { description: { story: 'Input without a label' } } }
};

export const Disabled: Story = {
	args: { type: 'text', placeholder: 'Disabled input', label: 'Disabled', disabled: true },
	parameters: { docs: { description: { story: 'Disabled state with reduced opacity' } } }
};

export const ErrorState: Story = {
	args: {
		type: 'text',
		placeholder: 'Invalid input',
		label: 'Error State',
		color: 'red',
		value: 'invalid@'
	},
	parameters: {
		docs: {
			description: { story: 'Error state with red border and focus ring for validation feedback' }
		}
	}
};

export const SuccessState: Story = {
	args: {
		type: 'email',
		placeholder: 'valid@example.com',
		label: 'Success State',
		color: 'green',
		value: 'valid@example.com'
	},
	parameters: {
		docs: {
			description: { story: 'Success state with green border and focus ring for positive feedback' }
		}
	}
};

export const FocusState: Story = {
	args: { type: 'text', placeholder: 'Click to focus', label: 'Focus State' },
	parameters: {
		docs: {
			description: {
				story:
					'Click the input to see the bold focus ring (3px) with primary color. The focus state provides clear visual feedback for keyboard navigation.'
			}
		}
	}
};
