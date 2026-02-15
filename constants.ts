
import { Game, GameCategory } from './types';

export const GAMES_DB: Game[] = [
  {
    id: '2048',
    title: '2048',
    description: 'Join the numbers and get to the 2048 tile!',
    thumbnail: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=400&h=300&fit=crop',
    iframeUrl: 'https://play2048.co/',
    category: GameCategory.PUZZLE,
    tags: ['numbers', 'math', 'classic']
  },
  {
    id: 'hextris',
    title: 'Hextris',
    description: 'Fast-paced puzzle game inspired by Tetris in a hexagonal grid.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
    iframeUrl: 'https://hextris.io/',
    category: GameCategory.ARCADE,
    tags: ['rhythm', 'hex', 'color']
  },
  {
    id: 'tetris',
    title: 'Classic Tetris',
    description: 'The world-famous tile-matching puzzle game.',
    thumbnail: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=400&h=300&fit=crop',
    iframeUrl: 'https://tetris.com/play-tetris',
    category: GameCategory.RETRO,
    tags: ['blocks', 'retro', 'strategy']
  },
  {
    id: 'snake',
    title: 'Retro Snake',
    description: 'Eat apples and grow longer without hitting yourself!',
    thumbnail: 'https://images.unsplash.com/photo-1628277613967-6abca504d0ac?w=400&h=300&fit=crop',
    iframeUrl: 'https://www.google.com/logos/2010/pacman10-i.html',
    category: GameCategory.RETRO,
    tags: ['classic', 'pixel', 'snake']
  },
  {
    id: 'little-alchemy',
    title: 'Little Alchemy',
    description: 'Combine elements to create new ones. Can you find them all?',
    thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop',
    iframeUrl: 'https://littlealchemy.com/',
    category: GameCategory.CASUAL,
    tags: ['crafting', 'discovery', 'science']
  },
  {
    id: 'pacman',
    title: 'Pac-Man',
    description: 'Navigate the maze, eat dots, and avoid ghosts.',
    thumbnail: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop',
    iframeUrl: 'https://macek.github.io/google_pacman/',
    category: GameCategory.ARCADE,
    tags: ['maze', 'retro', 'ghosts']
  },
  {
    id: 'chess',
    title: 'Grandmaster Chess',
    description: 'Challenge your mind with the ultimate game of strategy.',
    thumbnail: 'https://images.unsplash.com/photo-1528819622765-d6bca1c3b9d8?w=400&h=300&fit=crop',
    iframeUrl: 'https://www.chess.com/play/computer',
    category: GameCategory.SPORTS,
    tags: ['board', 'strategy', 'multiplayer']
  },
  {
    id: 'flappy',
    title: 'Flappy Clone',
    description: 'Navigate through the pipes and set a high score.',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=300&fit=crop',
    iframeUrl: 'https://flappybird.io/',
    category: GameCategory.ARCADE,
    tags: ['clicker', 'reflex', 'difficult']
  },
  {
    id: 'drift-hunters',
    title: 'Drift Hunters',
    description: 'Extreme car drifting and tuning simulator.',
    thumbnail: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=400&h=300&fit=crop',
    iframeUrl: 'https://www.google.com/logos/2012/soccer-12.html',
    category: GameCategory.ACTION,
    tags: ['racing', 'cars', '3d']
  }
];
