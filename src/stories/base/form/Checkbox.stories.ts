import type { Meta, StoryObj } from '@storybook/svelte';
import CheckboxStory from './CheckboxStory.svelte';

const meta = {
	title: 'Base/Form/Checkbox',
	component: CheckboxStory,
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean', description: 'Whether the checkbox is disabled' },
		label: { control: 'text', description: 'Checkbox label text' },
		checked: { control: 'boolean', description: 'Whether the checkbox is checked' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'A neo-brutalist checkbox component with bold borders (3px) and distinct focus states. Features a bold focus ring (3px minimum) for clear visual feedback.'
			}
		}
	}
} satisfies Meta<CheckboxStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { label: 'Accept terms and conditions' },
	parameters: { docs: { description: { story: 'Standard checkbox with label' } } }
};

export const Checked: Story = {
	args: { label: 'Pre-checked option', checked: true },
	parameters: { docs: { description: { story: 'Checkbox in checked state' } } }
};

export const Disabled: Story = {
	args: { label: 'Disabled checkbox', disabled: true },
	parameters: { docs: { description: { story: 'Disabled state with reduced opacity' } } }
};

export const DisabledChecked: Story = {
	args: { label: 'Disabled and checked', disabled: true, checked: true },
	parameters: { docs: { description: { story: 'Disabled checkbox in checked state' } } }
};

export const FocusState: Story = {
	args: { label: 'Focus on this checkbox' },
	parameters: {
		docs: {
			description: {
				story:
					'Tab to the checkbox to see the bold focus ring (3px) with primary color. The focus state provides clear visual feedback for keyboard navigation.'
			}
		}
	}
};
