export interface Prompt {
  id: string;
  title: string;
  content: string;
  description: string;
  category:
    | "Coding"
    | "Marketing"
    | "Content Writing"
    | "Email"
    | "Resume"
    | "SQL"
    | "Design"
    | "Social Media"
    | "Productivity"
    | "Others";

  tags: string[];

  favorite: boolean;

  pinned: boolean;

  createdAt: string;

  updatedAt: string;
}