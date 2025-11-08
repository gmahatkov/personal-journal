import type { Meta, StoryObj } from '@storybook/svelte';
import CardStory from './CardStory.svelte';

const meta = {
	title: 'Base/Card',
	component: CardStory,
	tags: ['autodocs'],
	argTypes: {
		variant: {
			control: 'select',
			options: ['default', 'elevated', 'bordered'],
			description: 'Visual style variant of the card'
		},
		padding: {
			control: 'select',
			options: ['none', 'sm', 'md', 'lg'],
			description: 'Internal padding of the card'
		},
		title: { control: 'text', description: 'Card title text' },
		content: { control: 'text', description: 'Card content text' },
		showImage: { control: 'boolean', description: 'Whether to show an image in the card' },
		img: { control: 'text', description: 'Image URL for the card' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'A neo-brutalist card component with prominent borders and offset shadows. Cards are used to group related content with clear visual boundaries and strong hierarchy.'
			}
		}
	}
} satisfies Meta<CardStory>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default variant stories
export const Default: Story = {
	args: {
		variant: 'default',
		padding: 'md',
		title: 'Default Card',
		content:
			'This is a default card with standard shadow. Perfect for displaying grouped content with clear visual separation.'
	}
};

export const DefaultSmallPadding: Story = {
	args: {
		variant: 'default',
		padding: 'sm',
		title: 'Compact Card',
		content: 'A card with smaller padding for more compact layouts.'
	}
};

export const DefaultLargePadding: Story = {
	args: {
		variant: 'default',
		padding: 'lg',
		title: 'Spacious Card',
		content: 'A card with larger padding for more breathing room and emphasis.'
	}
};

export const DefaultNoPadding: Story = {
	args: {
		variant: 'default',
		padding: 'none',
		title: 'No Padding Card',
		content: 'A card with no internal padding. Useful when you want full control over spacing.'
	},
	parameters: {
		docs: {
			description: {
				story: 'Card with no padding - useful for custom layouts or when nesting other components'
			}
		}
	}
};

// Elevated variant stories
export const Elevated: Story = {
	args: {
		variant: 'elevated',
		padding: 'md',
		title: 'Elevated Card',
		content:
			'This card has a larger shadow and hover effect, making it appear more prominent. Great for interactive cards or featured content.'
	},
	parameters: {
		docs: {
			description: {
				story: 'Elevated cards have larger shadows and lift on hover, perfect for clickable cards'
			}
		}
	}
};

export const ElevatedSmallPadding: Story = {
	args: {
		variant: 'elevated',
		padding: 'sm',
		title: 'Compact Elevated Card',
		content: 'An elevated card with smaller padding.'
	}
};

export const ElevatedLargePadding: Story = {
	args: {
		variant: 'elevated',
		padding: 'lg',
		title: 'Spacious Elevated Card',
		content: 'An elevated card with larger padding for maximum emphasis.'
	}
};

// Bordered variant stories
export const Bordered: Story = {
	args: {
		variant: 'bordered',
		padding: 'md',
		title: 'Bordered Card',
		content:
			'This card has no shadow, only a bold border. Useful for subtle grouping without heavy visual weight.'
	},
	parameters: {
		docs: {
			description: { story: 'Bordered cards have no shadow, providing a lighter visual treatment' }
		}
	}
};

export const BorderedSmallPadding: Story = {
	args: {
		variant: 'bordered',
		padding: 'sm',
		title: 'Compact Bordered Card',
		content: 'A bordered card with smaller padding.'
	}
};

export const BorderedLargePadding: Story = {
	args: {
		variant: 'bordered',
		padding: 'lg',
		title: 'Spacious Bordered Card',
		content: 'A bordered card with larger padding.'
	}
};

// Example with nested content
export const WithNestedContent: Story = {
	args: {
		variant: 'default',
		padding: 'lg',
		title: 'Card with Rich Content',
		content:
			'Cards can contain any content including lists, buttons, images, and more. The neo-brutalist styling provides clear visual boundaries for grouped content.'
	},
	parameters: {
		docs: {
			description: {
				story:
					'Example showing how cards can contain complex nested content while maintaining visual hierarchy'
			}
		}
	}
};

// Comparison story showing all variants
export const AllVariants: Story = {
	render: () => ({
		Component: CardStory,
		props: {
			variant: 'default',
			padding: 'md',
			title: 'All Variants',
			content: 'See all card variants side by side'
		}
	}),
	parameters: {
		docs: {
			description: {
				story: 'Comparison of all three card variants: default, elevated, and bordered'
			}
		}
	}
};

// Padding comparison
export const AllPaddingSizes: Story = {
	render: () => ({
		Component: CardStory,
		props: {
			variant: 'default',
			padding: 'md',
			title: 'Padding Sizes',
			content: 'Compare different padding options'
		}
	}),
	parameters: {
		docs: { description: { story: 'Comparison of all padding sizes: none, sm, md, and lg' } }
	}
};
