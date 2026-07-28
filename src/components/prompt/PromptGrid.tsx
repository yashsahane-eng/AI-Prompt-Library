import PromptCard from "./PromptCard";
import { usePrompt } from "../../context/PromptContext";

function PromptGrid() {
  const { filteredPrompts } = usePrompt();

  if (filteredPrompts.length === 0) {
    return (
      <div className="mt-8 text-center text-gray-500">
        <h2 className="text-xl font-semibold">
          No prompts found
        </h2>

        <p className="mt-2">
          Try a different search or create a new prompt.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
      {filteredPrompts.map((prompt) => (
        <PromptCard
          key={prompt.id}
          prompt={prompt}
        />
      ))}
    </div>
  );
}

export default PromptGrid;