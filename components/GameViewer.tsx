
import React, { useState, useEffect } from 'react';
import { Game } from '../types';

interface GameViewerProps {
  game: Game;
  onClose: () => void;
}

const GameViewer: React.FC<GameViewerProps> = ({ game, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const toggleFullscreen = () => {
    const element = document.getElementById('game-container');
    if (!element) return;

    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(err => console.error(err));
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto w-full animate-in fade-in zoom-in duration-300">
      <div className="flex items-center justify-between mb-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800">
        <div className="flex items-center gap-3">
          <button 
            onClick={onClose}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <div>
            <h2 className="text-xl font-bold text-white">{game.title}</h2>
            <p className="text-xs text-slate-500 uppercase font-semibold">{game.category}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={toggleFullscreen}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
            title="Toggle Fullscreen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
          <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
          <button 
            onClick={onClose}
            className="p-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 rounded-lg transition-colors border border-rose-500/20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div 
        id="game-container"
        className="relative flex-1 bg-slate-900 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-slate-800"
      >
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900 z-10">
            <div className="w-12 h-12 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin mb-4"></div>
            <p className="text-slate-400 animate-pulse text-sm font-medium">Connecting to game server...</p>
          </div>
        )}
        <iframe 
          src={game.iframeUrl}
          className="w-full h-full border-none shadow-inner"
          onLoad={() => setIsLoading(false)}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          title={game.title}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="bg-slate-900/40 p-6 rounded-2xl border border-slate-800">
            <h3 className="text-white font-bold text-lg mb-2">About {game.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {game.description} Explore various challenges and master the mechanics in this {game.category} adventure.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {game.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold uppercase rounded-md border border-slate-700">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-sky-500/10 to-indigo-500/10 p-6 rounded-2xl border border-sky-500/20">
            <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Quick Tips
            </h3>
            <ul className="text-xs text-slate-400 space-y-2 list-disc pl-4">
              <li>Use <strong>F</strong> to toggle fullscreen for a better experience.</li>
              <li>Bookmark this game to find it quickly in your favorites.</li>
              <li>Refresh the page if the game fails to load properly.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameViewer;
