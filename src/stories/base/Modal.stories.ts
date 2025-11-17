import type { Meta, StoryObj } from '@storybook/svelte';
import ModalStory from './ModalStory.svelte';

const meta = {
	title: 'Base/Modal',
	component: ModalStory,
	tags: ['autodocs'],
	argTypes: {
		size: {
			control: 'select',
			options: ['xs', 'sm', 'md', 'lg', 'xl'],
			description: 'Size of the modal'
		},
		title: { control: 'text', description: 'Modal title text' },
		showHeader: { control: 'boolean', description: 'Whether to show the header slot' },
		showFooter: { control: 'boolean', description: 'Whether to show the footer slot' },
		bodyContent: { control: 'text', description: 'Content for the modal body' },
		dismissable: {
			control: 'boolean',
			description: 'Whether the modal can be dismissed by clicking outside or pressing Escape'
		},
		autoclose: {
			control: 'boolean',
			description: 'Whether the modal closes automatically after interaction'
		}
	},
	parameters: {
		docs: {
			description: {
				component:
					'A neo-brutalist modal component with bold borders, hard shadows, and strong visual hierarchy. Features keyboard navigation support (Escape to close) and customizable header, body, and footer slots.'
			}
		}
	}
} satisfies Meta<ModalStory>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default modal
export const Default: Story = {
	args: {
		size: 'md',
		title: 'Modal Title',
		showHeader: true,
		showFooter: true,
		bodyContent: 'This is the modal body content. You can put any content here.',
		dismissable: true,
		autoclose: false
	},
	parameters: {
		docs: {
			description: {
				story: 'Default modal with header, body, and footer. Click the button to open the modal.'
			}
		}
	}
};

// Size variations
export const ExtraSmall: Story = {
	args: {
		size: 'xs',
		title: 'Extra Small Modal',
		showHeader: true,
		showFooter: true,
		bodyContent: 'This is an extra small modal.',
		dismissable: true
	},
	parameters: {
		docs: { description: { story: 'Extra small modal size (xs)' } }
	}
};

export const Small: Story = {
	args: {
		size: 'sm',
		title: 'Small Modal',
		showHeader: true,
		showFooter: true,
		bodyContent: 'This is a small modal with limited width.',
		dismissable: true
	},
	parameters: {
		docs: { description: { story: 'Small modal size (sm)' } }
	}
};

export const Medium: Story = {
	args: {
		size: 'md',
		title: 'Medium Modal',
		showHeader: true,
		showFooter: true,
		bodyContent: 'This is a medium-sized modal, the default size.',
		dismissable: true
	},
	parameters: {
		docs: { description: { story: 'Medium modal size (md) - default' } }
	}
};

export const Large: Story = {
	args: {
		size: 'lg',
		title: 'Large Modal',
		showHeader: true,
		showFooter: true,
		bodyContent: 'This is a large modal with more space for content.',
		dismissable: true
	},
	parameters: {
		docs: { description: { story: 'Large modal size (lg)' } }
	}
};

export const ExtraLarge: Story = {
	args: {
		size: 'xl',
		title: 'Extra Large Modal',
		showHeader: true,
		showFooter: true,
		bodyContent: 'This is an extra large modal with maximum width for extensive content.',
		dismissable: true
	},
	parameters: {
		docs: { description: { story: 'Extra large modal size (xl)' } }
	}
};

// Content variations
export const WithoutHeader: Story = {
	args: {
		size: 'md',
		title: undefined,
		showHeader: false,
		showFooter: true,
		bodyContent: 'This modal has no header, only body and footer content.',
		dismissable: true
	},
	parameters: {
		docs: { description: { story: 'Modal without header slot' } }
	}
};

export const WithoutFooter: Story = {
	args: {
		size: 'md',
		title: 'Modal Without Footer',
		showHeader: true,
		showFooter: false,
		bodyContent: 'This modal has a header and body, but no footer actions.',
		dismissable: true
	},
	parameters: {
		docs: { description: { story: 'Modal without footer slot' } }
	}
};

export const BodyOnly: Story = {
	args: {
		size: 'md',
		title: undefined,
		showHeader: false,
		showFooter: false,
		bodyContent: 'This modal contains only body content with no header or footer.',
		dismissable: true
	},
	parameters: {
		docs: { description: { story: 'Minimal modal with only body content' } }
	}
};

// Interaction variations
export const NonDismissable: Story = {
	args: {
		size: 'md',
		title: 'Non-Dismissable Modal',
		showHeader: true,
		showFooter: true,
		bodyContent:
			'This modal cannot be dismissed by clicking outside or pressing Escape. You must use the buttons to close it.',
		dismissable: false
	},
	parameters: {
		docs: {
			description: {
				story:
					'Modal that cannot be dismissed by clicking the backdrop or pressing Escape key. User must interact with buttons to close.'
			}
		}
	}
};

export const LongContent: Story = {
	args: {
		size: 'lg',
		title: 'Modal with Long Content',
		showHeader: true,
		showFooter: true,
		bodyContent: `This modal contains a longer piece of content to demonstrate scrolling behavior.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
		dismissable: true
	},
	parameters: {
		docs: {
			description: {
				story: 'Modal with long content to demonstrate scrolling behavior within the modal body.'
			}
		}
	}
};

// Keyboard interaction demonstration
export const KeyboardInteraction: Story = {
	args: {
		size: 'md',
		title: 'Keyboard Navigation Demo',
		showHeader: true,
		showFooter: true,
		bodyContent:
			'Try these keyboard interactions:\n\n• Press Escape to close the modal (if dismissable)\n• Tab to navigate between buttons\n• Enter or Space to activate buttons\n• Focus is trapped within the modal when open',
		dismissable: true
	},
	parameters: {
		docs: {
			description: {
				story:
					'Demonstrates keyboard navigation support. Press Escape to close, Tab to navigate between interactive elements, and Enter/Space to activate buttons.'
			}
		}
	}
};
