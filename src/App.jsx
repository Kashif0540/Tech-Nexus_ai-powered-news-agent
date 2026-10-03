import { useState, useEffect, useMemo, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Loader2, Newspaper, AlertTriangle, RefreshCw, Bookmark } from 'lucide-react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import ArticleCard from './components/ArticleCard';
import ArticleModal from './components/ArticleModal';
import FeaturedCard from './components/FeaturedCard';
import BackToTop from './components/BackToTop';
import Footer from './components/Footer';
import { SkeletonGrid, StatusMessage, primaryButton, secondaryButton } from './components/Feedback';
import { useNews } from './hooks/useNews';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TOPICS } from './lib/newsApi';
import { editorialPicks } from './data/editorialPicks';

const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{title}</h2>
      {subtitle && <p className="text-slate-500 dark:text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('live');
  const [topicId, setTopicId] = useState(TOPICS[0].id);
  const [searchInput, setSearchInput] = useState('');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('publishedAt');
  const [selectedItem, setSelectedItem] = useState(null);
  const [saved, setSaved] = useLocalStorage('technexus:saved', []);
  const [theme, setTheme] = useLocalStorage('technexus:theme', getSystemTheme);

  // Search active ho to topic ki jagah search query use hoti hai
  const query = search || TOPICS.find(t => t.id === topicId).query;
  const news = useNews(query, sortBy);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const savedIds = useMemo(() => new Set(saved.map(a => a.id)), [saved]);
  const toggleSave = useCallback(article => {
    setSaved(prev => prev.some(a => a.id === article.id) ? prev.filter(a => a.id !== article.id) : [article, ...prev]);
  }, [setSaved]);
  const closeModal = useCallback(() => setSelectedItem(null), []);

  const changeTopic = id => {
    setTopicId(id);
    setSearch('');
    setSearchInput('');
  };
  const submitSearch = () => {
    const term = searchInput.trim();
    if (!term) return;
    setSearch(term);
    setTopicId(null);
  };
  const clearSearch = () => {
    if (search) changeTopic(TOPICS[0].id);
    else setSearchInput('');
  };

  const renderGrid = items => (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(item => (
        <ArticleCard key={item.id} article={item} saved={savedIds.has(item.id)} onToggleSave={() => toggleSave(item)} onOpen={() => setSelectedItem(item)} />
      ))}
    </section>
  );

  const renderLiveFeed = () => {
    if (news.loading) return <SkeletonGrid />;
    if (news.error) {
      return (
        <StatusMessage icon={AlertTriangle} tone="error" title="Couldn't load the live feed" message={news.error}>
          <button onClick={news.refresh} className={primaryButton}><RefreshCw size={16} /> Try again</button>
          <button onClick={() => setActiveTab('editor')} className={secondaryButton}>Editor's Picks</button>
        </StatusMessage>
      );
    }
    if (news.articles.length === 0) {
      return (
        <StatusMessage icon={Newspaper} title={search ? `No results for “${search}”` : 'No stories right now'} message={search ? 'Try a different keyword or browse a topic instead.' : 'Check back soon for the latest AI news.'}>
          {search ? <button onClick={clearSearch} className={secondaryButton}>Clear search</button> : <button onClick={news.refresh} className={primaryButton}><RefreshCw size={16} /> Refresh</button>}
        </StatusMessage>
      );
    }
    return (
      <>
        {news.articles.length > 3 ? (
          <>
            <FeaturedCard article={news.articles[0]} saved={savedIds.has(news.articles[0].id)} onToggleSave={() => toggleSave(news.articles[0])} onOpen={() => setSelectedItem(news.articles[0])} />
            {renderGrid(news.articles.slice(1))}
          </>
        ) : renderGrid(news.articles)}
        <div className="mt-10 text-center">
          {news.hasMore ? (
            <button onClick={news.loadMore} disabled={news.loadingMore} className={`${primaryButton} mx-auto`}>
              {news.loadingMore ? <><Loader2 size={16} className="animate-spin" /> Loading…</> : 'Load more stories'}
            </button>
          ) : (
            <p className="text-sm text-slate-400">You're all caught up.</p>
          )}
          {news.loadMoreError && <p role="alert" className="text-sm text-red-500 mt-3">{news.loadMoreError}</p>}
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 font-sans text-slate-900 dark:text-slate-100 transition-colors">
      <Header activeTab={activeTab} onTabChange={setActiveTab} savedCount={saved.length} theme={theme} onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')} />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-8 py-8">
        {activeTab === 'live' && (
          <>
            <Toolbar topicId={topicId} onTopicChange={changeTopic} searchInput={searchInput} onSearchInputChange={setSearchInput} onSearchSubmit={submitSearch} onSearchClear={clearSearch} sortBy={sortBy} onSortChange={setSortBy} fetchedAt={news.fetchedAt} onRefresh={news.refresh} loading={news.loading} />
            {search && !news.loading && <p className="text-sm text-slate-500 dark:text-slate-400 -mt-4 mb-6">Showing results for <span className="font-semibold text-slate-800 dark:text-slate-200">“{search}”</span></p>}
            {renderLiveFeed()}
          </>
        )}

        {activeTab === 'editor' && (
          <>
            <SectionHeading title="Editor's Picks" subtitle="In-depth explainers on the ideas shaping AI, curated by the Tech Nexus team." />
            {renderGrid(editorialPicks)}
          </>
        )}

        {activeTab === 'saved' && (
          <>
            <SectionHeading title="Saved Articles" subtitle="Stories you've bookmarked. Saved on this device." />
            {saved.length === 0 ? (
              <StatusMessage icon={Bookmark} title="No saved articles yet" message="Tap the bookmark icon on any story to read it later.">
                <button onClick={() => setActiveTab('live')} className={primaryButton}>Browse the live feed</button>
              </StatusMessage>
            ) : renderGrid(saved)}
          </>
        )}
      </main>

      <Footer />
      <BackToTop />

      <AnimatePresence>
        {selectedItem && <ArticleModal article={selectedItem} saved={savedIds.has(selectedItem.id)} onToggleSave={() => toggleSave(selectedItem)} onClose={closeModal} />}
      </AnimatePresence>
    </div>
  );
}

export default App;
