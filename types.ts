export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface JobOption {
  id: number;
  title: string;
  headline: string;
  description: string;
  cta: string;
  tags: string[];
  image: string;
}

export enum AppSection {
  HOME = 'HOME',
  VISIONS = 'VISIONS',
  CONCIERGE = 'CONCIERGE',
  REFINER = 'REFINER'
}