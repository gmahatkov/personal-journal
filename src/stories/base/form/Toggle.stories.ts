import type { Meta, StoryObj } from '@storybook/svelte';
import ToggleStory from './ToggleStory.svelte';

const meta = {
	title: 'Base/Form/Toggle',
	component: ToggleStory,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text', description: 'Toggle label text' },
		checked: { control: 'boolean', description: 'Whether the toggle is checked' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'A neo-brutalist toggle switch component with bold borders (3px) and distinct focus states. Features a bold focus ring (3px minimum) for clear visual feedback.'
			}
		}
	}
} satisfies Meta<ToggleStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: { label: 'Enable notifications' },
	parameters: { docs: { description: { story: 'Standard toggle switch with label' } } }
};

export const Checked: Story = {
	args: { label: 'Pre-enabled option', checked: true },
	parameters: { docs: { description: { story: 'Toggle in checked/enabled state' } } }
};

export const FocusState: Story = {
	args: { label: 'Focus on this toggle' },
	parameters: {
		docs: {
			description: {
				story:
					'Tab to the toggle to see the bold focus ring (3px) with primary color. The focus state provides clear visual feedback for keyboard navigation.'
			}
		}
	}
};
