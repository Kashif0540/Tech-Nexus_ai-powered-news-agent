import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchArticles, PAGE_SIZE } from '../lib/newsApi';

export function useNews(query, sortBy) {
  const [articles, setArticles] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [fetchedAt, setFetchedAt] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadMoreError, setLoadMoreError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const requestId = useRef(0);
  const forceRef = useRef(false);

  useEffect(() => {
    // Purani requests ka result ignore karne ke liye har request ka apna id
    const id = ++requestId.current;
    const force = forceRef.current;
    forceRef.current = false;
    setLoading(true);
    setError(null);
    setLoadingMore(false);
    setLoadMoreError(null);
    setPage(1);
    fetchArticles({ query, sortBy, page: 1, force })
      .then(res => {
        if (id !== requestId.current) return;
        setArticles(res.articles);
        setTotal(res.totalResults);
        setFetchedAt(res.fetchedAt);
      })
      .catch(err => {
        if (id !== requestId.current) return;
        console.error('News Fetch Error:', err);
        setArticles([]);
        setError(err.message);
      })
      .finally(() => { if (id === requestId.current) setLoading(false); });
  }, [query, sortBy, reloadKey]);

  const refresh = useCallback(() => {
    forceRef.current = true;
    setReloadKey(k => k + 1);
  }, []);

  const loadMore = useCallback(async () => {
    const id = requestId.current;
    setLoadingMore(true);
    setLoadMoreError(null);
    try {
      const res = await fetchArticles({ query, sortBy, page: page + 1 });
      if (id !== requestId.current) return;
      setArticles(prev => {
        const seen = new Set(prev.map(a => a.id));
        return [...prev, ...res.articles.filter(a => !seen.has(a.id))];
      });
      setPage(page + 1);
    } catch (err) {
      if (id === requestId.current) setLoadMoreError(err.message);
    } finally {
      if (id === requestId.current) setLoadingMore(false);
    }
  }, [query, sortBy, page]);

  return {
    articles, loading, error, fetchedAt, refresh,
    loadMore, loadingMore, loadMoreError,
    hasMore: page * PAGE_SIZE < total,
  };
}
