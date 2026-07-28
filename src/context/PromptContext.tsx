import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Prompt } from "../types/Prompt";
import { promptService } from "../services/promptService";
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

  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (value: boolean) => void;

  sortBy: SortOption;
  setSortBy: (value: SortOption) => void;

  editingPrompt: Prompt | null;

  addPrompt: (
    prompt: Omit<Prompt, "id">
  ) => Promise<void>;

  updatePrompt: (
    id: string,
    prompt: Omit<
      Prompt,
      "id" | "createdAt" | "updatedAt"
    >
  ) => Promise<void>;

  deletePrompt: (id: string) => Promise<void>;

  toggleFavorite: (id: string) => Promise<void>;

  togglePinned: (id: string) => Promise<void>;

  duplicatePrompt: (id: string) => Promise<void>;

  setEditingPrompt: (
    prompt: Prompt | null
  ) => void;

  setPrompts: React.Dispatch<
    React.SetStateAction<Prompt[]>
  >;
}

const PromptContext = createContext<
  PromptContextType | undefined
>(undefined);

export function PromptProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [prompts, setPrompts] = useState<
    Prompt[]
  >([]);

  const [editingPrompt, setEditingPrompt] =
    useState<Prompt | null>(null);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  const [
    showFavoritesOnly,
    setShowFavoritesOnly,
  ] = useState(false);

  const [sortBy, setSortBy] =
    useState<SortOption>("Newest");

  useEffect(() => {
    const loadPrompts = async () => {
      try {
        const data =
          await promptService.getAll();

        setPrompts(sortPrompts(data));
      } catch (error) {
        console.error(
          "Failed to load prompts",
          error
        );
      }
    };

    loadPrompts();
  }, []);

  const filteredPrompts = useMemo(() => {
    let result = searchPrompts(
      prompts,
      searchTerm
    );

    result = filterPrompts(
      result,
      selectedCategory
    );

    if (showFavoritesOnly) {
      result = result.filter(
        (prompt) => prompt.favorite
      );
    }

    return sortFilteredPrompts(
      result,
      sortBy
    );
  }, [
    prompts,
    searchTerm,
    selectedCategory,
    showFavoritesOnly,
    sortBy,
  ]);

  const addPrompt = async (
    prompt: Omit<Prompt, "id">
  ) => {
    try {
      const created =
        await promptService.create(prompt);

      setPrompts((prev) =>
        sortPrompts([created, ...prev])
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updatePrompt = async (
    id: string,
    updatedPrompt: Omit<
      Prompt,
      "id" | "createdAt" | "updatedAt"
    >
  ) => {
    try {
      const updated =
        await promptService.update(
          id,
          updatedPrompt
        );

      setPrompts((prev) =>
        sortPrompts(
          prev.map((prompt) =>
            prompt.id === id
              ? updated
              : prompt
          )
        )
      );

      setEditingPrompt(null);
    } catch (error) {
      console.error(error);
    }
  };
    const deletePrompt = async (id: string) => {
    try {
      await promptService.delete(id);

      setPrompts((prev) =>
        sortPrompts(
          prev.filter((prompt) => prompt.id !== id)
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavorite = async (id: string) => {
    const prompt = prompts.find(
      (prompt) => prompt.id === id
    );

    if (!prompt) return;

    try {
      const updated =
        await promptService.update(id, {
          title: prompt.title,
          description: prompt.description,
          content: prompt.content,
          category: prompt.category,
          tags: prompt.tags,
          favorite: !prompt.favorite,
          pinned: prompt.pinned,
        });

      setPrompts((prev) =>
        sortPrompts(
          prev.map((item) =>
            item.id === id ? updated : item
          )
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const togglePinned = async (id: string) => {
    const prompt = prompts.find(
      (prompt) => prompt.id === id
    );

    if (!prompt) return;

    try {
      const updated =
        await promptService.update(id, {
          title: prompt.title,
          description: prompt.description,
          content: prompt.content,
          category: prompt.category,
          tags: prompt.tags,
          favorite: prompt.favorite,
          pinned: !prompt.pinned,
        });

      setPrompts((prev) =>
        sortPrompts(
          prev.map((item) =>
            item.id === id ? updated : item
          )
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const duplicatePrompt = async (id: string) => {
    const prompt = prompts.find(
      (prompt) => prompt.id === id
    );

    if (!prompt) return;

    try {
      const duplicated =
        await promptService.create({
          title: `${prompt.title} (Copy)`,
          description: prompt.description,
          content: prompt.content,
          category: prompt.category,
          tags: [...prompt.tags],
          favorite: false,
          pinned: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });

      setPrompts((prev) =>
        sortPrompts([duplicated, ...prev])
      );
    } catch (error) {
      console.error(error);
    }
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

        showFavoritesOnly,
        setShowFavoritesOnly,

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