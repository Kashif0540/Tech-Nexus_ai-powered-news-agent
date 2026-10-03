import { motion } from 'framer-motion';
import { Bookmark, BookmarkCheck, Flame } from 'lucide-react';
import ArticleImage from './ArticleImage';
import { ArticleMeta } from './ArticleCard';

// Live Feed ki pehli story ko bara "Top Story" card banate hain
export default function FeaturedCard({ article, saved, onToggleSave, onOpen }) {
  return (

    
    <motion.article initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative mb-6 bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden">
      <button onClick={onOpen} className="w-full text-left grid md:grid-cols-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-inset rounded-3xl">
        <ArticleImage src={article.image} className="h-56 md:h-full md:min-h-80 w-full" />
        <div className="p-6 md:p-10 flex flex-col justify-center">
          <span className="inline-flex items-center gap-1.5 self-start text-xs font-bold uppercase tracking-wide bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-full mb-4">
            <Flame size={14} /> Top Story
          </span>
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-2">{article.source}</p>
          <h2 className="text-2xl md:text-3xl font-black leading-tight mb-3 text-slate-900 dark:text-slate-100 line-clamp-3">{article.title}</h2>
          <p className="text-slate-600 dark:text-slate-400 mb-5 line-clamp-3">{article.description}</p>
          <p className="text-sm text-slate-400 dark:text-slate-500"><ArticleMeta article={article} /></p>
        </div>
      </button>
      <button onClick={onToggleSave} aria-label={saved ? 'Remove from saved' : 'Save article'} aria-pressed={saved} className={`absolute top-4 right-4 p-2 rounded-full shadow backdrop-blur transition-colors ${saved ? 'bg-emerald-600 text-white' : 'bg-white/90 text-slate-600 hover:text-emerald-700'}`}>
        {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      </button>
    </motion.article>
  );
}
