// Типы для использования в компонентах кейса

export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Item {
  id: number;
  name: string;
  image: string;
  rarity: Rarity;
}

export interface RarityColors {
  [key: string]: string;
}