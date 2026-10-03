// Loading skeletons aur error/empty states

export function SkeletonGrid({ count = 6 }) {
  return (
    <div aria-busy="true" aria-label="Loading articles" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-pulse">
          <div className="h-48 bg-slate-200 dark:bg-slate-800" />
          <div className="p-5 space-y-3">
            <div className="h-3 w-24 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-full rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-5 w-2/3 rounded bg-slate-200 dark:bg-slate-800" />
            <div className="h-3 w-full rounded bg-slate-100 dark:bg-slate-800/60" />
            <div className="h-3 w-5/6 rounded bg-slate-100 dark:bg-slate-800/60" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatusMessage({ icon: Icon, tone = 'neutral', title, message, children }) {
  const isError = tone === 'error';
  return (
    <div role={isError ? 'alert' : 'status'} className={`max-w-md mx-auto mt-16 rounded-2xl p-8 text-center ${isError ? 'bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/50 shadow-sm' : ''}`}>
      <Icon className={`mx-auto mb-4 ${isError ? 'text-red-500' : 'text-slate-400'}`} size={40} />
      <h2 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">{title}</h2>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{message}</p>
      <div className="flex flex-wrap gap-3 justify-center">{children}</div>
    </div>
  );
}

export const primaryButton = 'flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-lg font-bold transition-colors disabled:opacity-60';
export const secondaryButton = 'px-5 py-2 rounded-lg font-bold text-emerald-800 dark:text-emerald-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors';
