import type { Meta, StoryObj } from '@storybook/svelte';
import ImgStory from './ImgStory.svelte';

const meta = {
	title: 'Base/Typography/Img',
	component: ImgStory,
	tags: ['autodocs'],
	argTypes: {
		src: { control: 'text', description: 'Image source URL' },
		alt: { control: 'text', description: 'Alternative text for accessibility' },
		caption: { control: 'text', description: 'Image caption' },
		size: { control: 'text', description: 'Size class' },
		alignment: { control: 'text', description: 'Alignment class' }
	},
	parameters: {
		docs: {
			description: {
				component:
					'An image component with neo-brutalist styling. Features bold borders around images and optional captions.'
			}
		}
	}
} satisfies Meta<ImgStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		src: 'https://via.placeholder.com/600x400/ff6b35/ffffff?text=Neo-Brutalist+Image',
		alt: 'Example image'
	}
};

export const WithCaption: Story = {
	args: {
		src: 'https://via.placeholder.com/600x400/4ecdc4/ffffff?text=Image+with+Caption',
		alt: 'Image with caption',
		caption: 'This is an image caption demonstrating the neo-brutalist typography style'
	}
};

export const SmallImage: Story = {
	args: {
		src: 'https://via.placeholder.com/300x200/ffe66d/000000?text=Small+Image',
		alt: 'Small image',
		size: 'max-w-sm',
		caption: 'A smaller image with caption'
	}
};

export const MediumImage: Story = {
	args: {
		src: 'https://via.placeholder.com/500x350/06d6a0/ffffff?text=Medium+Image',
		alt: 'Medium image',
		size: 'max-w-md',
		caption: 'A medium-sized image'
	}
};

export const LargeImage: Story = {
	args: {
		src: 'https://via.placeholder.com/800x500/ef476f/ffffff?text=Large+Image',
		alt: 'Large image',
		size: 'max-w-2xl',
		caption: 'A large image with bold borders'
	}
};

export const CenteredImage: Story = {
	args: {
		src: 'https://via.placeholder.com/400x300/ff8c61/ffffff?text=Centered',
		alt: 'Centered image',
		alignment: 'mx-auto',
		caption: 'A centered image'
	}
};
