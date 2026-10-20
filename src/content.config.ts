import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './consts';

const blog = defineCollection({
	// Each post is one JSON file in `src/content/blog/`: frontmatter-like fields plus the
	// Korean/English HTML body (`htmlContent`), the same shape the draft tool produces.
	loader: glob({ base: './src/content/blog', pattern: '**/*.json' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			// English title; shown when the reader switches the page to English.
			titleEn: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			category: z.enum(Object.keys(CATEGORIES) as [keyof typeof CATEGORIES]),
			tags: z.array(z.string()).default([]),
			// Posts sharing the same series name are linked together, ordered by seriesOrder.
			series: z.string().optional(),
			seriesOrder: z.number().optional(),
			// Drafts show up in `npm run dev` but are left out of the production build.
			draft: z.boolean().default(false),
			// HTML with #kr-content and #en-content blocks; __BASE__ is replaced by the site base path.
			htmlContent: z.string(),
		}),
});

export const collections = { blog };
