import PromptCard from "./PromptCard";
import { usePrompt } from "../../context/PromptContext";

function PromptGrid() {
  const { prompts } = usePrompt();

  const sortedPrompts = [...prompts].sort((a, b) => {
    if (a.pinned === b.pinned) return 0;
    return a.pinned ? -1 : 1;
  });

  if (sortedPrompts.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
        <h2 className="text-xl font-semibold">
          No prompts found
        </h2>

        <p className="mt-2">
          Create your first prompt to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
      {sortedPrompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
        />
      ))}
    </div>
  );
}

export default PromptGrid;