
export enum GameCategory {
  ACTION = 'Action',
  PUZZLE = 'Puzzle',
  SPORTS = 'Sports',
  ARCADE = 'Arcade',
  CASUAL = 'Casual',
  RETRO = 'Retro'
}

export interface Game {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  iframeUrl: string;
  category: GameCategory;
  tags: string[];
}

export type ViewState = 'home' | 'playing';
