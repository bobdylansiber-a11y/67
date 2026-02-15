
import React from 'react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  onPlay: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const GameCard: React.FC<GameCardProps> = ({ game, onPlay, isFavorite, onToggleFavorite }) => {
  return (
    <div className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 transition-all duration-300 hover:scale-[1.02] hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/10">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        
        {/* Play Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
          <button 
            onClick={onPlay}
            className="w-14 h-14 bg-sky-500 hover:bg-sky-400 text-white rounded-full flex items-center justify-center shadow-2xl transition-transform active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 ml-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleFavorite(); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-colors ${
              isFavorite 
              ? 'bg-rose-500 text-white' 
              : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Tags badge */}
        <div className="absolute bottom-3 left-3 flex gap-1">
          <span className="bg-sky-500/20 text-sky-400 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-sky-500/30">
            {game.category}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-white font-bold truncate mb-1 text-lg group-hover:text-sky-400 transition-colors">
          {game.title}
        </h3>
        <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed h-8">
          {game.description}
        </p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex -space-x-1.5 overflow-hidden">
            {[1, 2, 3].map(i => (
              <div key={i} className="inline-block h-5 w-5 rounded-full ring-2 ring-slate-900 bg-slate-800">
                <img className="h-full w-full object-cover rounded-full" src={`https://i.pravatar.cc/20?img=${i + 10}`} alt="" />
              </div>
            ))}
            <span className="pl-2 text-[10px] text-slate-500 self-center">4.2k playing</span>
          </div>
          <button 
            onClick={onPlay}
            className="text-[11px] font-bold text-sky-400 uppercase tracking-wider hover:underline"
          >
            Play Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
