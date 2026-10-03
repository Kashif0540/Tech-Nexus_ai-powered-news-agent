import { ExternalLink } from 'lucide-react';
import Logo from './Logo';

const GITHUB_URL = 'https://github.com/Kashif0540';

function GitHubIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 mt-16 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 grid gap-8 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400 max-w-xs">Live AI and technology news, curated explainers, and saved reading in one place.</p>
        </div>

        <div className="text-sm">
          <h2 className="font-bold text-slate-900 dark:text-slate-100 mb-3">Data &amp; Credits</h2>
          <p className="text-slate-500 dark:text-slate-400">
            News data provided by{' '}
            <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline">NewsAPI.org</a>
          </p>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Built with React, Vite &amp; Tailwind CSS</p>
        </div>

        <div className="text-sm md:text-right">
          <h2 className="font-bold text-slate-900 dark:text-slate-100 mb-3">Designed &amp; Developed by</h2>
          <p className="text-lg font-black tracking-tight text-emerald-800 dark:text-emerald-400">M. Kashif</p>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-2 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors">
            <GitHubIcon /> Kashif0540 <ExternalLink size={12} />
          </a>
        </div>
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800">
        <p className="max-w-6xl mx-auto px-4 sm:px-8 py-4 text-xs text-slate-400 dark:text-slate-500 text-center md:text-left">
          © {new Date().getFullYear()} Tech Nexus · Designed &amp; developed by M. Kashif. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
