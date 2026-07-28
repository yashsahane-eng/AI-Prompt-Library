import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Prompt } from "../types/Prompt";
import { samplePrompts } from "../utils/samplePrompts";
import {
  sortPrompts,
  searchPrompts,
} from "./PromptActions";

interface PromptContextType {
  prompts: Prompt[];
  filteredPrompts: Prompt[];

  searchTerm: string;
  setSearchTerm: (value: string) => void;

  editingPrompt: Prompt | null;

  addPrompt: (prompt: Omit<Prompt, "id">) => void;

  updatePrompt: (
    id: string,
    prompt: Omit<
      Prompt,
      "id" | "createdAt" | "updatedAt"
    >
  ) => void;

  deletePrompt: (id: string) => void;

  toggleFavorite: (id: string) => void;

  togglePinned: (id: string) => void;

  duplicatePrompt: (id: string) => void;

  setEditingPrompt: (prompt: Prompt | null) => void;

  setPrompts: React.Dispatch<React.SetStateAction<Prompt[]>>;
}

const PromptContext = createContext<PromptContextType | undefined>(
  undefined
);

export function PromptProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [prompts, setPrompts] = useState<Prompt[]>(
    sortPrompts(samplePrompts)
  );

  const [editingPrompt, setEditingPrompt] =
    useState<Prompt | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPrompts = useMemo(() => {
    return searchPrompts(prompts, searchTerm);
  }, [prompts, searchTerm]);

  const addPrompt = (prompt: Omit<Prompt, "id">) => {
    const newPrompt: Prompt = {
      id: crypto.randomUUID(),
      ...prompt,
    };

    setPrompts((prev) => sortPrompts([newPrompt, ...prev]));
  };

  const updatePrompt = (
    id: string,
    updatedPrompt: Omit<
      Prompt,
      "id" | "createdAt" | "updatedAt"
    >
  ) => {
    setPrompts((prev) =>
      sortPrompts(
        prev.map((prompt) =>
          prompt.id === id
            ? {
                ...prompt,
                ...updatedPrompt,
                updatedAt: new Date().toISOString(),
              }
            : prompt
        )
      )
    );

    setEditingPrompt(null);
  };

  const deletePrompt = (id: string) => {
    setPrompts((prev) =>
      sortPrompts(prev.filter((prompt) => prompt.id !== id))
    );
  };

  const toggleFavorite = (id: string) => {
    setPrompts((prev) =>
      sortPrompts(
        prev.map((prompt) =>
          prompt.id === id
            ? {
                ...prompt,
                favorite: !prompt.favorite,
                updatedAt: new Date().toISOString(),
              }
            : prompt
        )
      )
    );
  };

  const togglePinned = (id: string) => {
    setPrompts((prev) =>
      sortPrompts(
        prev.map((prompt) =>
          prompt.id === id
            ? {
                ...prompt,
                pinned: !prompt.pinned,
                updatedAt: new Date().toISOString(),
              }
            : prompt
        )
      )
    );
  };

  const duplicatePrompt = (id: string) => {
    setPrompts((prev) => {
      const prompt = prev.find((p) => p.id === id);

      if (!prompt) return prev;

      const duplicated: Prompt = {
        ...prompt,
        id: crypto.randomUUID(),
        title: `${prompt.title} (Copy)`,
        favorite: false,
        pinned: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      return sortPrompts([duplicated, ...prev]);
    });
  };

  return (
    <PromptContext.Provider
      value={{
        prompts,
        filteredPrompts,
        searchTerm,
        setSearchTerm,
        editingPrompt,
        addPrompt,
        updatePrompt,
        deletePrompt,
        toggleFavorite,
        togglePinned,
        duplicatePrompt,
        setEditingPrompt,
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
      "usePrompt must be used within a PromptProvider"
    );
  }

  return context;
}