import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { X, Bookmark, BookmarkCheck, Link2, Check, ExternalLink } from 'lucide-react';
import ArticleImage from './ArticleImage';
import { formatDate } from '../lib/format';

export default function ArticleModal({ article, saved, onToggleSave, onClose }) {
  const closeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    // Modal khula ho to peeche wala page scroll na ho
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(article.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard unavailable */ }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 bg-black/60 z-20 flex items-center justify-center p-4">
      <motion.div role="dialog" aria-modal="true" aria-labelledby="article-title" initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 10 }} onClick={e => e.stopPropagation()} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6 sm:p-8 rounded-3xl max-w-2xl w-full relative overflow-y-auto max-h-[85vh]">
        <button ref={closeRef} onClick={onClose} aria-label="Close" className="absolute top-4 right-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-full transition-colors"><X size={18} /></button>

        <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400 mb-2 pr-10">{article.source}</p>
        <h2 id="article-title" className="text-2xl font-bold mb-3 text-emerald-800 dark:text-emerald-300 pr-10">{article.title}</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-5">
          {article.author && <span className="line-clamp-1">By {article.author}</span>}
          {article.publishedAt && <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)} · </time>}
          {article.readMinutes} min read
        </p>

        <ArticleImage src={article.image} className="w-full h-56 sm:h-64 rounded-2xl mb-5" />
        {article.description && article.description !== article.content && <p className="text-lg font-medium text-slate-800 dark:text-slate-200 leading-relaxed mb-4">{article.description}</p>}
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-6">{article.content}</p>
        {article.url && <p className="text-xs text-slate-400 mb-6">This is a preview. The full story is available on {article.source}.</p>}

        <div className="flex flex-wrap gap-3">
          {article.url && (
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex-1 min-w-48 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-bold transition-colors">
              Read full article <ExternalLink size={16} />
            </a>
          )}
          <button onClick={onToggleSave} aria-pressed={saved} className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-emerald-800 dark:text-emerald-300 transition-colors">
            {saved ? <><BookmarkCheck size={16} /> Saved</> : <><Bookmark size={16} /> Save</>}
          </button>
          {article.url && (
            <button onClick={copyLink} className="flex items-center gap-2 px-4 py-2.5 rounded-lg font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors">
              {copied ? <><Check size={16} /> Copied</> : <><Link2 size={16} /> Copy link</>}
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
