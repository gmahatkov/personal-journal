import type { Meta, StoryObj } from '@storybook/svelte';
import ListStory from './ListStory.svelte';

const meta = {
	title: 'Base/Typography/List',
	component: ListStory,
	tags: ['autodocs'],
	argTypes: {
		tag: { control: 'select', options: ['ul', 'ol', 'dl'], description: 'List HTML tag' },
		list: {
			control: 'select',
			options: ['disc', 'none', 'decimal', undefined],
			description: 'List style type'
		},
		position: {
			control: 'select',
			options: ['inside', 'outside'],
			description: 'List marker position'
		},
		items: { control: 'object', description: 'List items' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'A list component with neo-brutalist styling. Features clean, readable lists with theme-aware colors.'
			}
		}
	}
} satisfies Meta<ListStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnorderedList: Story = {
	args: {
		tag: 'ul',
		items: [
			'First item in unordered list',
			'Second item with more text',
			'Third item',
			'Fourth item'
		]
	}
};

export const OrderedList: Story = {
	args: { tag: 'ol', items: ['First step', 'Second step', 'Third step', 'Fourth step'] }
};

export const UnorderedDisc: Story = {
	args: { tag: 'ul', list: 'disc', items: ['Item with disc marker', 'Another item', 'Third item'] }
};

export const OrderedDecimal: Story = {
	args: {
		tag: 'ol',
		list: 'decimal',
		items: ['First numbered item', 'Second numbered item', 'Third numbered item']
	}
};

export const NoMarkers: Story = {
	args: {
		tag: 'ul',
		list: 'none',
		items: ['Item without marker', 'Another item without marker', 'Third item']
	}
};

export const OutsidePosition: Story = {
	args: {
		tag: 'ul',
		position: 'outside',
		items: [
			'Item with outside marker',
			'Another item',
			'Third item with longer text to demonstrate the outside position'
		]
	}
};

export const LongList: Story = {
	args: {
		tag: 'ul',
		items: [
			'First item in a longer list',
			'Second item demonstrating multiple items',
			'Third item',
			'Fourth item',
			'Fifth item',
			'Sixth item',
			'Seventh item',
			'Eighth item with more content to show text wrapping'
		]
	}
};

export const MixedContent: Story = {
	args: {
		tag: 'ul',
		items: [
			'Item with simple text',
			'Item with longer text to demonstrate wrapping behavior in the list',
			'Another item',
			'Final item in the list'
		]
	},
	parameters: { docs: { description: { story: 'List with mixed content lengths' } } }
};
