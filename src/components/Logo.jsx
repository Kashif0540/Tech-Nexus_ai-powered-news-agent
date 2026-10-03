import { Cpu } from 'lucide-react';

export default function Logo() {
  return (
    <span className="flex items-center gap-2">
      <span className="flex items-center justify-center w-9 h-9 rounded-xl bg-emerald-600 text-white shadow-sm">
        <Cpu size={20} />
      </span>
      <span className="text-2xl font-black text-emerald-800 dark:text-emerald-400 tracking-tighter">TECH NEXUS</span>
    </span>
  );
}
