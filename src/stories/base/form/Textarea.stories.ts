import type { Meta, StoryObj } from '@storybook/svelte';
import TextareaStory from './TextareaStory.svelte';

const meta = {
	title: 'Base/Form/Textarea',
	component: TextareaStory,
	tags: ['autodocs'],
	argTypes: {
		placeholder: { control: 'text', description: 'Placeholder text' },
		disabled: { control: 'boolean', description: 'Whether the textarea is disabled' },
		label: { control: 'text', description: 'Label text' },
		value: { control: 'text', description: 'Textarea value' },
		rows: { control: 'number', description: 'Number of visible text rows' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'A neo-brutalist textarea component with bold borders (3px) and distinct focus states. Features a bold focus ring (3px minimum) for clear visual feedback.'
			}
		}
	}
} satisfies Meta<TextareaStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { placeholder: 'Enter your message...', label: 'Message', rows: 4 },
	parameters: { docs: { description: { story: 'Standard textarea with label' } } }
};

export const WithoutLabel: Story = {
	args: { placeholder: 'No label textarea', rows: 4 },
	parameters: { docs: { description: { story: 'Textarea without a label' } } }
};

export const Disabled: Story = {
	args: { placeholder: 'Disabled textarea', label: 'Disabled', disabled: true, rows: 4 },
	parameters: { docs: { description: { story: 'Disabled state with reduced opacity' } } }
};

export const WithContent: Story = {
	args: {
		label: 'Description',
		value: 'This is some pre-filled content in the textarea.',
		rows: 4
	},
	parameters: { docs: { description: { story: 'Textarea with pre-filled content' } } }
};

export const LargeTextarea: Story = {
	args: { placeholder: 'Enter a longer message...', label: 'Long Message', rows: 8 },
	parameters: { docs: { description: { story: 'Larger textarea with more rows' } } }
};

export const FocusState: Story = {
	args: { placeholder: 'Click to focus', label: 'Focus State', rows: 4 },
	parameters: {
		docs: {
			description: {
				story:
					'Click the textarea to see the bold focus ring (3px) with primary color. The focus state provides clear visual feedback for keyboard navigation.'
			}
		}
	}
};
