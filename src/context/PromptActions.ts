import type { Prompt } from "../types/Prompt";

export function sortPrompts(prompts: Prompt[]) {
  return [...prompts].sort((a, b) => {
    if (a.pinned !== b.pinned) {
      return Number(b.pinned) - Number(a.pinned);
    }

    return (
      new Date(b.updatedAt).getTime() -
      new Date(a.updatedAt).getTime()
    );
  });
}

export function searchPrompts(
  prompts: Prompt[],
  searchTerm: string
) {
  if (!searchTerm.trim()) {
    return prompts;
  }

  const term = searchTerm.toLowerCase();

  return prompts.filter((prompt) => {
    return (
      prompt.title.toLowerCase().includes(term) ||
      prompt.description.toLowerCase().includes(term) ||
      prompt.category.toLowerCase().includes(term) ||
      prompt.tags.some((tag) =>
        tag.toLowerCase().includes(term)
      )
    );
  });
}

export function filterPrompts(
  prompts: Prompt[],
  category: string
) {
  if (category === "All") {
    return prompts;
  }

  return prompts.filter(
    (prompt) => prompt.category === category
  );
}