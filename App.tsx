
import React, { useState, useMemo, useEffect } from 'react';
import { Game, GameCategory, ViewState } from './types';
import { GAMES_DB } from './constants';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import GameViewer from './components/GameViewer';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  const [hasEntered, setHasEntered] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<GameCategory | 'All'>('All');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [viewState, setViewState] = useState<ViewState>('home');

  useEffect(() => {
    const saved = localStorage.getItem('nexus_favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('nexus_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredGames = useMemo(() => {
    return GAMES_DB.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handlePlayGame = (game: Game) => {
    setSelectedGame(game);
    setViewState('playing');
  };

  const handleCloseGame = () => {
    setViewState('home');
    setSelectedGame(null);
  };

  if (!hasEntered) {
    return (
      <div className="fixed inset-0 bg-[#020617] flex items-center justify-center overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] -bottom-48 -right-48 animate-pulse delay-700"></div>
        
        <div className="relative z-10 text-center space-y-8 max-w-2xl px-6">
          <div className="flex flex-col items-center">
             <div className="w-24 h-24 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_50px_rgba(56,189,248,0.3)] mb-8 animate-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-4 italic">
              NEXUS<span className="text-sky-500">GAMES</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl font-medium tracking-wide max-w-md">
              The ultimate unblocked gaming experience. Fast, free, and unrestricted.
            </p>
          </div>

          <button 
            onClick={() => setHasEntered(true)}
            className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white transition-all duration-200 bg-sky-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.4)]"
          >
            <span className="relative flex items-center gap-3 text-xl tracking-widest">
              ENTER PORTAL
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </button>

          <div className="pt-12 flex justify-center gap-8 text-slate-500 text-sm font-bold uppercase tracking-widest">
            <span className="flex items-center gap-2">
               <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
               1,240 Players Online
            </span>
            <span>45+ Games Ready</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 animate-in fade-in duration-1000">
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onLogoClick={handleCloseGame}
      />

      <div className="flex-1 flex overflow-hidden">
        <div className="hidden md:block">
          <Sidebar 
            activeCategory={activeCategory} 
            setActiveCategory={setActiveCategory}
            favoriteCount={favorites.length}
          />
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {viewState === 'home' ? (
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">
                    {activeCategory === 'All' ? 'Popular Games' : activeCategory}
                  </h1>
                  <p className="text-slate-400 mt-2">
                    {filteredGames.length} {filteredGames.length === 1 ? 'game' : 'games'} available in this section
                  </p>
                </div>
                
                <div className="md:hidden">
                  <select 
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value as any)}
                    className="bg-slate-800 text-white rounded-lg px-4 py-2 border border-slate-700 outline-none w-full"
                  >
                    <option value="All">All Categories</option>
                    {Object.values(GameCategory).map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {filteredGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredGames.map(game => (
                    <GameCard 
                      key={game.id} 
                      game={game} 
                      onPlay={() => handlePlayGame(game)}
                      isFavorite={favorites.includes(game.id)}
                      onToggleFavorite={() => toggleFavorite(game.id)}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-slate-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-xl font-medium">No games found</p>
                  <button 
                    onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                    className="mt-4 text-sky-400 hover:text-sky-300 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          ) : (
            selectedGame && (
              <GameViewer 
                game={selectedGame} 
                onClose={handleCloseGame} 
              />
            )
          )}
        </main>
      </div>

      <footer className="bg-slate-900 border-t border-slate-800 p-6 text-center text-slate-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Nexus Games Portal. All games are provided for educational entertainment purposes.</p>
        <div className="mt-2 flex justify-center space-x-4">
          <a href="#" className="hover:text-sky-400 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-sky-400 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-sky-400 transition-colors">Contact Support</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
