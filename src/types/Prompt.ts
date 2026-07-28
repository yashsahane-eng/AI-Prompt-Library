export interface Prompt {
  id: string;
  title: string;
  content: string;
  description: string;
  category: string;
  tags: string[];
  favorite: boolean;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}