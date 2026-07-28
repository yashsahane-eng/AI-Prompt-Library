import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Prompt } from "../types/Prompt";
import { samplePrompts } from "../utils/samplePrompts";
import {
  sortPrompts,
  searchPrompts,
  filterPrompts,
  sortFilteredPrompts,
  type SortOption,
} from "./PromptActions";



interface PromptContextType {
  prompts: Prompt[];
  filteredPrompts: Prompt[];

  searchTerm: string;
  setSearchTerm: (value: string) => void;

  selectedCategory: string;
  setSelectedCategory: (value: string) => void;

  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;

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

const STORAGE_KEY = "ai-prompt-library";

export function PromptProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [prompts, setPrompts] = useState<Prompt[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        return sortPrompts(JSON.parse(saved));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    return sortPrompts(samplePrompts);
  });

  const [editingPrompt, setEditingPrompt] =
    useState<Prompt | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [sortBy, setSortBy] =
    useState<SortOption>("Newest");

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(prompts)
    );
  }, [prompts]);

  const filteredPrompts = useMemo(() => {
    let result = searchPrompts(prompts, searchTerm);

    result = filterPrompts(result, selectedCategory);

    result = sortFilteredPrompts(result, sortBy);

    return result;
  }, [
    prompts,
    searchTerm,
    selectedCategory,
    sortBy,
  ]);

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
      sortPrompts(
        prev.filter((prompt) => prompt.id !== id)
      )
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
      const prompt = prev.find(
        (prompt) => prompt.id === id
      );

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

        selectedCategory,
        setSelectedCategory,

        sortBy,
        setSortBy,

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
      "usePrompt must be used within PromptProvider"
    );
  }

  return context;
}