import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import ArticleImage from './ArticleImage';
import { timeAgo } from '../lib/format';

export function ArticleMeta({ article }) {
  return (
    <span>
      {article.publishedAt && <time dateTime={article.publishedAt}>{timeAgo(article.publishedAt)} · </time>}
      {article.readMinutes} min read
    </span>
  );
}

export default function ArticleCard({ article, saved, onToggleSave, onOpen }) {
  return (
    <motion.article whileHover={{ y: -5 }} className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col">
      <button onClick={onOpen} className="text-left flex-1 flex flex-col focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-inset rounded-2xl">
        <ArticleImage src={article.image} className="h-48 w-full" />
        <div className="p-5 flex-1 flex flex-col">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400 mb-2 line-clamp-1">{article.source}</p>
          <h3 className="font-bold text-lg mb-2 line-clamp-2 text-slate-900 dark:text-slate-100">{article.title}</h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-3">{article.description}</p>
          <p className="mt-auto text-xs text-slate-400 dark:text-slate-500"><ArticleMeta article={article} /></p>
        </div>
      </button>
      <button onClick={onToggleSave} aria-label={saved ? 'Remove from saved' : 'Save article'} aria-pressed={saved} className={`absolute top-3 right-3 p-2 rounded-full shadow backdrop-blur transition-colors ${saved ? 'bg-emerald-600 text-white' : 'bg-white/90 text-slate-600 hover:text-emerald-700'}`}>
        {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      </button>
    </motion.article>
  );
}
