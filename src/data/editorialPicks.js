import { readingTime } from '../lib/format';

const picks = [
  { id: 'pick-rag', title: "The Future of RAG", description: "How RAG is changing enterprise search.", content: "Retrieval-Augmented Generation is revolutionizing how LLMs access private data. Instead of relying only on training, they query vector databases for context. This ensures accuracy and real-time relevance, making it an essential tool for modern AI infrastructure.", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=400" },
  { id: 'pick-agents', title: "Agentic AI Revolution", description: "Why agents are the new employees.", content: "Agentic AI is moving beyond chat. These agents perform multi-step planning, use external tools, and handle complex workflows like coding or project management autonomously, drastically increasing human productivity.", image: "https://images.unsplash.com/photo-1675271512404-5f503c26027a?auto=format&fit=crop&q=80&w=400" },
  { id: 'pick-ccn', title: "The Power of CCN", description: "Reimagining network architectures.", content: "Content-Centric Networking changes the internet backbone from address-based to content-based. This allows for native caching, improved latency, and higher security, perfect for the future of streaming and real-time AI networks.", image: "https://images.unsplash.com/photo-1558494949-ef010bbbb317?auto=format&fit=crop&q=80&w=400" },
];

export const editorialPicks = picks.map(pick => ({
  ...pick,
  source: 'Tech Nexus Editorial',
  readMinutes: readingTime(pick.content),
}));
