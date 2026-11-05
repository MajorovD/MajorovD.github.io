import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const imageBlock = z.object({
  type: z.literal('image'),
  image: z.string(),
  image_mobile: z.string().optional().nullable(),
  alt: z.string().optional().nullable(),
});
const textBlock = z.object({
  type: z.literal('text'),
  heading: z.string().optional().nullable(),
  body: z.string().optional().nullable(),
});
const galleryBlock = z.object({
  type: z.literal('gallery'),
  columns: z.coerce.number().optional().nullable(),
  images: z.array(z.object({ image: z.string(), alt: z.string().optional().nullable() })).default([]),
});
const embedBlock = z.object({
  type: z.literal('embed'),
  url: z.string(),
  ratio: z.string().optional().nullable(),
});

const cases = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cases' }),
  schema: z.object({
    title: z.string(),
    url: z.string(),
    order: z.coerce.number().default(100),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    summary: z.string().default(''),
    cover: z.string(),
    bg: z.string().optional().nullable(),
    blocks: z.array(z.discriminatedUnion('type', [imageBlock, textBlock, galleryBlock, embedBlock])).default([]),
  }),
});

export const collections = { cases };
