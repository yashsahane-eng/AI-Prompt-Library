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