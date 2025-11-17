import type { Meta, StoryObj } from '@storybook/svelte';
import RadioStory from './RadioStory.svelte';

const meta = {
	title: 'Base/Form/Radio',
	component: RadioStory,
	tags: ['autodocs'],
	argTypes: {
		disabled: { control: 'boolean', description: 'Whether the radio buttons are disabled' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'A neo-brutalist radio button component with bold borders (3px) and distinct focus states. Features a bold focus ring (3px minimum) for clear visual feedback.'
			}
		}
	}
} satisfies Meta<RadioStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {},
	parameters: { docs: { description: { story: 'Radio button group with multiple options' } } }
};

export const Disabled: Story = {
	args: { disabled: true },
	parameters: { docs: { description: { story: 'Disabled state with reduced opacity' } } }
};

export const FocusState: Story = {
	args: {},
	parameters: {
		docs: {
			description: {
				story:
					'Tab to the radio buttons to see the bold focus ring (3px) with primary color. The focus state provides clear visual feedback for keyboard navigation.'
			}
		}
	}
};
