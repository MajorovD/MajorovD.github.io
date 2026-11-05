// @ts-check
import { defineConfig } from 'astro/config';

// SITE_URL и BASE_PATH задаются в GitHub Actions автоматически.
// Если репозиторий называется <логин>.github.io — сайт будет в корне домена.
export default defineConfig({
  site: process.env.SITE_URL || 'https://example.github.io',
  base: process.env.BASE_PATH || '/',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
