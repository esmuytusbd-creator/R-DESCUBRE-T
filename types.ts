export type ViewType = 'profile' | 'journal' | 'symptoms' | 'resources' | 'nutrition' | 'exercises';

export interface GratitudeEntry {
  id: string;
  date: string;
  text: string;
}

export interface SymptomEntry {
  id: string;
  date: string;
  description: string;
  intensity: number;
}

export interface Resource {
  type: 'video' | 'audio' | 'article' | 'link';
  title: string;
  description: string;
  url: string;
  author: string;
}
