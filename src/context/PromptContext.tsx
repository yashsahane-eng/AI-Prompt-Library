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
  setPrompts: React.Dispatch<React.SetStateAction<Prompt[]>>;
}

const PromptContext = createContext<PromptContextType | undefined>(
  undefined
);

interface PromptProviderProps {
  children: ReactNode;
}

export function PromptProvider({
  children,
}: PromptProviderProps) {
  const [prompts, setPrompts] =
    useState<Prompt[]>(samplePrompts);

  return (
    <PromptContext.Provider
      value={{
        prompts,
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