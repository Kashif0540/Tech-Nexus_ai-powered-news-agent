const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
const UNITS = [['year', 31536000], ['month', 2592000], ['week', 604800], ['day', 86400], ['hour', 3600], ['minute', 60]];

export function timeAgo(date) {
  const seconds = Math.round((Date.now() - new Date(date).getTime()) / 1000);
  for (const [unit, size] of UNITS) {
    if (seconds >= size) return rtf.format(-Math.floor(seconds / size), unit);
  }
  return 'just now';
}

export function formatDate(date) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(date));
}

// NewsAPI content truncated aata hai: "...text… [+2345 chars]"
const TRUNCATED_SUFFIX = /\s*\[\+(\d+) chars\]$/;

export function cleanContent(content = '') {
  return content.replace(TRUNCATED_SUFFIX, '').replace(/<[^>]+>/g, '').trim();
}

export function readingTime(content = '') {
  const match = content.match(TRUNCATED_SUFFIX);
  const chars = content.length + (match ? Number(match[1]) : 0);
  // ~5 characters per word, ~200 words per minute
  return Math.max(1, Math.round(chars / 5 / 200));
}
