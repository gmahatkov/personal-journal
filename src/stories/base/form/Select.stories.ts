import type { Meta, StoryObj } from '@storybook/svelte';
import SelectStory from './SelectStory.svelte';

const meta = {
	title: 'Base/Form/Select',
	component: SelectStory,
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean', description: 'Whether the select is disabled' },
		label: { control: 'text', description: 'Label text' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'A neo-brutalist select dropdown component with bold borders (3px) and distinct focus states. Features a bold focus ring (3px minimum) for clear visual feedback.'
			}
		}
	}
} satisfies Meta<SelectStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { label: 'Choose an option' },
	parameters: { docs: { description: { story: 'Standard select dropdown with label' } } }
};

export const WithoutLabel: Story = {
	args: {},
	parameters: { docs: { description: { story: 'Select dropdown without a label' } } }
};

export const Disabled: Story = {
	args: { label: 'Disabled', disabled: true },
	parameters: { docs: { description: { story: 'Disabled state with reduced opacity' } } }
};

export const FocusState: Story = {
	args: { label: 'Focus State' },
	parameters: {
		docs: {
			description: {
				story:
					'Click the select to see the bold focus ring (3px) with primary color. The focus state provides clear visual feedback for keyboard navigation.'
			}
		}
	}
};
