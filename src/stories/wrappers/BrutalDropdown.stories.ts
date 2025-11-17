import type { Meta, StoryObj } from '@storybook/svelte';
import BrutalDropdownStory from './BrutalDropdownStory.svelte';

const meta = {
	title: 'Wrappers/BrutalDropdown',
	component: BrutalDropdownStory,
	tags: ['autodocs'],
	argTypes: {
		placement: {
			control: 'select',
			options: [
				'top',
				'top-start',
				'top-end',
				'bottom',
				'bottom-start',
				'bottom-end',
				'left',
				'left-start',
				'left-end',
				'right',
				'right-start',
				'right-end'
			],
			description: 'Placement of the dropdown relative to the trigger'
		},
		trigger: {
			control: 'select',
			options: ['click', 'hover'],
			description: 'How the dropdown is triggered'
		},
		showHeader: {
			control: 'boolean',
			description: 'Show dropdown header with user info'
		},
		showFooter: {
			control: 'boolean',
			description: 'Show dropdown footer'
		}
	}
} satisfies Meta<BrutalDropdownStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		placement: 'bottom',
		trigger: 'click',
		showHeader: true,
		showFooter: false
	}
};

export const WithoutHeader: Story = {
	args: {
		placement: 'bottom',
		trigger: 'click',
		showHeader: false,
		showFooter: false
	}
};

export const WithFooter: Story = {
	args: {
		placement: 'bottom',
		trigger: 'click',
		showHeader: true,
		showFooter: true
	}
};

export const HoverTrigger: Story = {
	args: {
		placement: 'bottom',
		trigger: 'hover',
		showHeader: true,
		showFooter: false
	}
};

export const TopPlacement: Story = {
	args: {
		placement: 'top',
		trigger: 'click',
		showHeader: true,
		showFooter: false
	}
};

export const RightPlacement: Story = {
	args: {
		placement: 'right',
		trigger: 'click',
		showHeader: true,
		showFooter: false
	}
};
