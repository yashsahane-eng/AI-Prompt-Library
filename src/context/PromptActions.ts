import type { Prompt } from "../types/Prompt";

export type SortOption =
  | "Newest"
  | "Oldest"
  | "A-Z"
  | "Z-A";

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
  if (!searchTerm.trim()) return prompts;

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
  if (category === "All") return prompts;

  return prompts.filter(
    (prompt) => prompt.category === category
  );
}

export function sortFilteredPrompts(
  prompts: Prompt[],
  sortBy: SortOption
) {
  const sorted = [...prompts];

  switch (sortBy) {
    case "Oldest":
      return sorted.sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() -
          new Date(b.updatedAt).getTime()
      );

    case "A-Z":
      return sorted.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

    case "Z-A":
      return sorted.sort((a, b) =>
        b.title.localeCompare(a.title)
      );

    case "Newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() -
          new Date(a.updatedAt).getTime()
      );
  }
}