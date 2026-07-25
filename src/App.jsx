import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, X, Newspaper } from 'lucide-react';

const editorialPicks = [
  { title: "The Future of RAG", desc: "How RAG is changing enterprise search.", details: "Retrieval-Augmented Generation is revolutionizing how LLMs access private data. Instead of relying only on training, they query vector databases for context. This ensures accuracy and real-time relevance, making it an essential tool for modern AI infrastructure.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400" },
  { title: "Agentic AI Revolution", desc: "Why agents are the new employees.", details: "Agentic AI is moving beyond chat. These agents perform multi-step planning, use external tools, and handle complex workflows like coding or project management autonomously, drastically increasing human productivity.", image: "https://images.unsplash.com/photo-1675271512404-5f503c26027a?auto=format&fit=crop&q=80&w=400" },
  { title: "The Power of CCN", desc: "Reimagining network architectures.", details: "Content-Centric Networking changes the internet backbone from address-based to content-based. This allows for native caching, improved latency, and higher security, perfect for the future of streaming and real-time AI networks.", image: "https://images.unsplash.com/photo-1558494949-ef010bbbb317?auto=format&fit=crop&q=80&w=400" }
];

function App() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('live');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = import.meta.env.VITE_NEWS_API_KEY;
        const response = await fetch(`https://newsapi.org/v2/everything?q=artificial+intelligence&pageSize=20&language=en&apiKey=${apiKey}`);
        const data = await response.json();
        // Sirf wahi articles filter kr rhe hain jinki image aur content valid hai
        const validArticles = (data.articles || []).filter(a => a.urlToImage && a.content);
        setNews(validArticles);
      } catch (err) { console.error("News Fetch Error:", err); } finally { setLoading(false); }
    };
    fetchNews();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <header className="bg-white border-b sticky top-0 z-10 px-8 py-4 flex justify-between items-center shadow-sm">
        <h1 className="text-2xl font-black text-emerald-800 tracking-tighter">TECH NEXUS</h1>
        <div className="flex gap-2 bg-slate-100 p-1 rounded-lg">
          <button onClick={() => setActiveTab('live')} className={`px-4 py-1.5 rounded-md font-bold ${activeTab === 'live' ? 'bg-white shadow text-emerald-800' : 'text-slate-500'}`}>Live Feed</button>
          <button onClick={() => setActiveTab('editor')} className={`px-4 py-1.5 rounded-md font-bold ${activeTab === 'editor' ? 'bg-white shadow text-emerald-800' : 'text-slate-500'}`}>Editor's Picks</button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-8">
        {loading ? <Loader2 className="animate-spin mx-auto mt-20 text-emerald-600" size={40} /> : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(activeTab === 'live' ? news : editorialPicks).map((item, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} onClick={() => setSelectedItem(item)} className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden cursor-pointer">
                <img src={item.urlToImage || item.image} className="h-48 w-full object-cover" />
                <div className="p-5">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-3">{item.description || item.desc}</p>
                </div>
              </motion.div>
            ))}
          </section>
        )}
      </main>

      <AnimatePresence>
        {selectedItem && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 z-20 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} className="bg-white p-8 rounded-3xl max-w-lg w-full relative overflow-y-auto max-h-[80vh]">
              <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full"><X size={18} /></button>
              <h2 className="text-2xl font-bold mb-4 text-emerald-800">{selectedItem.title}</h2>
              <img src={selectedItem.urlToImage || selectedItem.image} className="w-full h-48 object-cover rounded-2xl mb-4" />
              <p className="text-slate-700 leading-relaxed mb-6">{selectedItem.details || selectedItem.content || selectedItem.description}</p>
              {selectedItem.url && <a href={selectedItem.url} target="_blank" className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-bold block text-center">Read Original</a>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;