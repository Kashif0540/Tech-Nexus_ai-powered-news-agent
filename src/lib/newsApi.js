import { cleanContent, readingTime } from './format';

const API_URL = 'https://newsapi.org/v2/everything';
const CACHE_TTL_MS = 10 * 60 * 1000;
export const PAGE_SIZE = 20;
// NewsAPI free plan sirf pehle 100 results tak access deta hai
export const MAX_RESULTS = 100;
// Aggregator sites jinki images aksar load nahi hoti aur stories duplicate hoti hain
const EXCLUDED_DOMAINS = ['biztoc.com'];

export const TOPICS = [
  { id: 'all', label: 'All AI', query: 'artificial intelligence' },
  { id: 'llm', label: 'LLMs', query: '"large language model" OR LLM OR ChatGPT' },
  { id: 'ml', label: 'Machine Learning', query: '"machine learning" OR "deep learning"' },
  { id: 'robotics', label: 'Robotics', query: 'robotics AND (AI OR "artificial intelligence")' },
  { id: 'policy', label: 'AI Policy', query: '"AI regulation" OR "AI policy" OR "AI safety"' },
  { id: 'startups', label: 'Startups', query: 'AI AND (startup OR funding OR acquisition)' },
];

export const SORT_OPTIONS = [
  { value: 'publishedAt', label: 'Latest' },
  { value: 'relevancy', label: 'Most relevant' },
  { value: 'popularity', label: 'Most popular' },
];

function readCache(key) {
  try {
    const entry = JSON.parse(sessionStorage.getItem(key));
    if (entry && Date.now() - entry.fetchedAt < CACHE_TTL_MS) return entry;
  } catch { /* cache unavailable */ }
  return null;
}

function writeCache(key, value) {
  try { sessionStorage.setItem(key, JSON.stringify(value)); } catch { /* cache unavailable */ }
}

// Sirf wahi articles rakh rhe hain jinki image aur content valid hai
function isDisplayable(a) {
  return a.urlToImage && a.content && a.title && a.title !== '[Removed]';
}

function toArticle(a) {
  return {
    id: a.url,
    title: a.title,
    description: a.description || '',
    content: cleanContent(a.content),
    image: a.urlToImage,
    url: a.url,
    source: a.source?.name || 'Unknown source',
    author: a.author,
    publishedAt: a.publishedAt,
    readMinutes: readingTime(a.content),
  };
}

export async function fetchArticles({ query, sortBy, page = 1, force = false }) {
  const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  if (!apiKey) throw new Error('News API key missing. Add VITE_NEWS_API_KEY to your .env file.');

  // searchIn: sirf title/description match karo, warna poore article mein "AI" ka zikr hone se off-topic news aa jati hai
  const params = new URLSearchParams({ q: query, searchIn: 'title,description', excludeDomains: EXCLUDED_DOMAINS.join(','), sortBy, page: String(page), pageSize: String(PAGE_SIZE), language: 'en' });
  const cacheKey = `technexus:news:${params}`;
  if (!force) {
    const cached = readCache(cacheKey);
    if (cached) return cached;
  }

  let response;
  try {
    response = await fetch(`${API_URL}?${params}&apiKey=${apiKey}`);
  } catch {
    throw new Error("Couldn't reach the news service. Check your internet connection.");
  }
  const data = await response.json().catch(() => ({}));
  // NewsAPI errors (invalid key, rate limit, non-localhost on free plan) come back as status: "error"
  if (!response.ok || data.status === 'error') throw new Error(data.message || `Request failed (${response.status})`);

  const result = {
    articles: (data.articles || []).filter(isDisplayable).map(toArticle),
    totalResults: Math.min(data.totalResults || 0, MAX_RESULTS),
    fetchedAt: Date.now(),
  };
  writeCache(cacheKey, result);
  return result;
}
