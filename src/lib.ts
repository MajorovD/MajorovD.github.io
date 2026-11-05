import { marked } from 'marked';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Добавляет базовый путь сайта к внутренним ссылкам и картинкам ("/uploads/..." → "/repo/uploads/...") */
export function u(path?: string | null): string {
  if (!path) return '';
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return BASE + (path.startsWith('/') ? path : '/' + path);
}

export function md(text?: string | null): string {
  return text ? (marked.parse(text, { async: false }) as string) : '';
}

export function oneLine(s: string): string {
  return s.replace(/\s*\n\s*/g, ' ').trim();
}

/** Превращает ссылку YouTube / Figma / Vimeo в адрес для встраивания */
export function embedUrl(url: string): string {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([\w-]{6,})/);
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vm = url.match(/vimeo\.com\/(\d+)/);
  if (vm) return `https://player.vimeo.com/video/${vm[1]}`;
  if (/figma\.com\/(proto|design|file)\//.test(url) && !url.includes('/embed'))
    return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
  return url;
}
