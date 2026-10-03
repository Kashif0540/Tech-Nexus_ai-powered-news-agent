import { useEffect, useRef } from 'react';
import { Search, X, RefreshCw } from 'lucide-react';
import { TOPICS, SORT_OPTIONS } from '../lib/newsApi';
import { timeAgo } from '../lib/format';

export default function Toolbar({ topicId, onTopicChange, searchInput, onSearchInputChange, onSearchSubmit, onSearchClear, sortBy, onSortChange, fetchedAt, onRefresh, loading }) {
  const inputRef = useRef(null);

  // "/" dabane se search box focus ho jata hai (jab kisi aur field mein type na ho raha ho)
  useEffect(() => {
    const onKey = e => {
      if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.target.closest('input, textarea, select, [contenteditable="true"]')) return;
      e.preventDefault();
      inputRef.current?.focus();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="mb-8 space-y-4">
      <form role="search" onSubmit={e => { e.preventDefault(); onSearchSubmit(); }} className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input ref={inputRef} type="text" enterKeyHint="search" value={searchInput} onChange={e => onSearchInputChange(e.target.value)} placeholder="Search AI news, e.g. OpenAI, chips, regulation" aria-label="Search news" className="w-full pl-11 pr-32 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500" />
        {searchInput ? (
          <button type="button" onClick={onSearchClear} aria-label="Clear search" className="absolute right-24 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
            <X size={16} />
          </button>
        ) : (
          <kbd aria-hidden="true" className="hidden sm:block absolute right-26 top-1/2 -translate-y-1/2 text-xs font-mono font-semibold text-slate-400 border border-slate-200 dark:border-slate-700 rounded px-1.5 py-0.5">/</kbd>
        )}
        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold px-4 py-1.5 rounded-lg transition-colors">Search</button>
      </form>

      <div className="flex flex-col lg:flex-row lg:items-center gap-3 justify-between">
        <div role="group" aria-label="Topics" className="flex gap-2 overflow-x-auto pb-1">
          {TOPICS.map(topic => {
            const active = topic.id === topicId;
            return (
              <button key={topic.id} onClick={() => onTopicChange(topic.id)} aria-pressed={active} className={`shrink-0 px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-colors ${active ? 'bg-emerald-600 border-emerald-600 text-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-emerald-500'}`}>
                {topic.label}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 shrink-0">
          {fetchedAt && !loading && <span>Updated {timeAgo(fetchedAt)}</span>}
          <button onClick={onRefresh} disabled={loading} aria-label="Refresh feed" className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50 transition-colors">
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          </button>
          <select value={sortBy} onChange={e => onSortChange(e.target.value)} aria-label="Sort articles" className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-1.5 font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500">
            {SORT_OPTIONS.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </div>
      </div>
    </div>
  );
}
