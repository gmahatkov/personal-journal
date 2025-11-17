import type { Meta, StoryObj } from '@storybook/svelte';
import BrutalNavbarStory from './BrutalNavbarStory.svelte';

const meta = {
	title: 'Wrappers/BrutalNavbar',
	component: BrutalNavbarStory,
	tags: ['autodocs'],
	argTypes: {
		fluid: {
			control: 'boolean',
			description: 'Whether the navbar should be fluid (full width)'
		},
		showAvatar: {
			control: 'boolean',
			description: 'Show user avatar'
		},
		showHamburger: {
			control: 'boolean',
			description: 'Show hamburger menu button'
		}
	},
	parameters: {
		layout: 'fullscreen'
	}
} satisfies Meta<BrutalNavbarStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		fluid: false,
		showAvatar: true,
		showHamburger: true
	}
};

export const Fluid: Story = {
	args: {
		fluid: true,
		showAvatar: true,
		showHamburger: true
	}
};

export const WithoutAvatar: Story = {
	args: {
		fluid: false,
		showAvatar: false,
		showHamburger: true
	}
};

export const Minimal: Story = {
	args: {
		fluid: false,
		showAvatar: false,
		showHamburger: false
	}
};
