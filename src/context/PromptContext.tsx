import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Prompt } from "../types/Prompt";
import { samplePrompts } from "../utils/samplePrompts";

interface PromptContextType {
  prompts: Prompt[];

  addPrompt: (
    prompt: Omit<
      Prompt,
      | "id"
      | "favorite"
      | "pinned"
      | "createdAt"
      | "updatedAt"
    >
  ) => void;

  deletePrompt: (id: string) => void;

  toggleFavorite: (id: string) => void;

  togglePinned: (id: string) => void;

  duplicatePrompt: (id: string) => void;

  setPrompts: React.Dispatch<
    React.SetStateAction<Prompt[]>
  >;
}

const PromptContext = createContext<
  PromptContextType | undefined
>(undefined);

interface PromptProviderProps {
  children: ReactNode;
}

export function PromptProvider({
  children,
}: PromptProviderProps) {
  const [prompts, setPrompts] =
    useState<Prompt[]>(samplePrompts);

  const addPrompt = (
    prompt: Omit<
      Prompt,
      | "id"
      | "favorite"
      | "pinned"
      | "createdAt"
      | "updatedAt"
    >
  ) => {
    const newPrompt: Prompt = {
      ...prompt,
      id: crypto.randomUUID(),
      favorite: false,
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPrompts((prev) => [newPrompt, ...prev]);
  };

  const deletePrompt = (id: string) => {
    setPrompts((prev) =>
      prev.filter((prompt) => prompt.id !== id)
    );
  };

  const toggleFavorite = (id: string) => {
    setPrompts((prev) =>
      prev.map((prompt) =>
        prompt.id === id
          ? {
              ...prompt,
              favorite: !prompt.favorite,
            }
          : prompt
      )
    );
  };

  const togglePinned = (id: string) => {
    setPrompts((prev) =>
      prev.map((prompt) =>
        prompt.id === id
          ? {
              ...prompt,
              pinned: !prompt.pinned,
            }
          : prompt
      )
    );
  };

  const duplicatePrompt = (id: string) => {
    const original = prompts.find(
      (prompt) => prompt.id === id
    );

    if (!original) return;

    const copy: Prompt = {
      ...original,
      id: crypto.randomUUID(),
      title: `${original.title} (Copy)`,
      favorite: false,
      pinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setPrompts((prev) => [copy, ...prev]);
  };

  return (
    <PromptContext.Provider
      value={{
        prompts,
        addPrompt,
        deletePrompt,
        toggleFavorite,
        togglePinned,
        duplicatePrompt,
        setPrompts,
      }}
    >
      {children}
    </PromptContext.Provider>
  );
}

export function usePrompt() {
  const context = useContext(PromptContext);

  if (!context) {
    throw new Error(
      "usePrompt must be used inside PromptProvider"
    );
  }

  return context;
}