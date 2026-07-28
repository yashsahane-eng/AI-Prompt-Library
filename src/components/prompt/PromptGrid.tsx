import PromptCard from "./PromptCard";

function PromptGrid() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-8">
      <PromptCard />
      <PromptCard />
      <PromptCard />
    </div>
  );
}

export default PromptGrid;