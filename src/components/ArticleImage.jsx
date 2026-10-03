import { useState } from 'react';
import { Newspaper } from 'lucide-react';

// Agar image load na ho to placeholder dikhate hain, broken image icon nahi
export default function ArticleImage({ src, className = '' }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return (
      <div className={`${className} bg-linear-to-br from-emerald-100 to-slate-200 dark:from-emerald-950 dark:to-slate-800 flex items-center justify-center`}>
        <Newspaper className="text-emerald-700/40 dark:text-emerald-300/30" size={40} />
      </div>
    );
  }
  return <img src={src} alt="" loading="lazy" onError={() => setFailed(true)} className={`${className} object-cover`} />;
}
