import { Moon, Sun } from 'lucide-react';
import Logo from './Logo';

const TABS = [
  { id: 'live', label: 'Live Feed' },
  { id: 'editor', label: "Editor's Picks" },
  { id: 'saved', label: 'Saved' },
];

export default function Header({ activeTab, onTabChange, savedCount, theme, onToggleTheme }) {
  return (
    <header className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-4 flex flex-wrap gap-3 justify-between items-center">
        <h1><a href="/" aria-label="Tech Nexus home"><Logo /></a></h1>
        <div className="flex items-center gap-2">
          <nav aria-label="Sections" className="flex gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg">
            {TABS.map(tab => {
              const active = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => onTabChange(tab.id)} aria-current={active ? 'page' : undefined} className={`px-3 sm:px-4 py-1.5 rounded-md text-sm sm:text-base font-bold transition-colors ${active ? 'bg-white dark:bg-slate-700 shadow text-emerald-800 dark:text-emerald-300' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>
                  {tab.label}
                  {tab.id === 'saved' && savedCount > 0 && <span className="ml-1.5 text-xs bg-emerald-600 text-white rounded-full px-1.5 py-0.5">{savedCount}</span>}
                </button>
              );
            })}
          </nav>
          <button onClick={onToggleTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
