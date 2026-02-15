
import React from 'react';
import { GameCategory } from '../types';

interface SidebarProps {
  activeCategory: GameCategory | 'All';
  setActiveCategory: (cat: GameCategory | 'All') => void;
  favoriteCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ activeCategory, setActiveCategory, favoriteCount }) => {
  const categories = ['All', ...Object.values(GameCategory)];

  return (
    <aside className="w-64 border-r border-slate-800 p-6 flex flex-col gap-8 sticky top-16 h-[calc(100vh-64px)] overflow-y-auto">
      <section>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Discover</h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setActiveCategory(cat as any)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-between group ${
                  activeCategory === cat 
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/20' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent'
                }`}
              >
                <span>{cat}</span>
                {activeCategory === cat && (
                  <div className="w-1 h-1 rounded-full bg-sky-400 animate-pulse"></div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Your Library</h3>
        <ul className="space-y-1">
          <li>
            <button className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-3 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Favorites
              {favoriteCount > 0 && <span className="ml-auto bg-slate-700 text-slate-300 text-[10px] px-1.5 py-0.5 rounded-full">{favoriteCount}</span>}
            </button>
          </li>
          <li>
            <button className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 flex items-center gap-3 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recently Played
            </button>
          </li>
        </ul>
      </section>

      <div className="mt-auto p-4 bg-slate-900 rounded-xl border border-slate-800">
        <p className="text-xs font-semibold text-white mb-1">Nexus Pro</p>
        <p className="text-[10px] text-slate-500 mb-3">Unlock cloud saves and no-ads experience.</p>
        <button className="w-full bg-sky-500 hover:bg-sky-400 text-white text-[11px] font-bold py-2 rounded-lg transition-colors">
          UPGRADE NOW
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
