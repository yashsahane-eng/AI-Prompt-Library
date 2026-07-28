import { promptApi } from "./promptApi";
import type { Prompt } from "../types/Prompt";

type PromptDto = {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: Prompt["category"];
  tags: string[];
  favorite: boolean;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
};

const mapPrompt = (prompt: PromptDto): Prompt => ({
  id: prompt._id,
  title: prompt.title,
  description: prompt.description,
  content: prompt.content,
  category: prompt.category,
  tags: prompt.tags,
  favorite: prompt.favorite,
  pinned: prompt.pinned,
  createdAt: prompt.createdAt,
  updatedAt: prompt.updatedAt,
});

export const promptService = {
  async getAll(): Promise<Prompt[]> {
    const { data } = await promptApi.getAll();
    return data.data.map(mapPrompt);
  },

  async getById(id: string): Promise<Prompt> {
    const { data } = await promptApi.getById(id);
    return mapPrompt(data.data);
  },

  async create(prompt: Omit<Prompt, "id">): Promise<Prompt> {
    const { data } = await promptApi.create(prompt);
    return mapPrompt(data.data);
  },

  async update(
    id: string,
    prompt: Omit<Prompt, "id" | "createdAt" | "updatedAt">
  ): Promise<Prompt> {
    const { data } = await promptApi.update(id, prompt);
    return mapPrompt(data.data);
  },

  async delete(id: string): Promise<void> {
    await promptApi.delete(id);
  },
};