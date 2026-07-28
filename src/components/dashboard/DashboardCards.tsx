import StatCard from "./StatCard";
import { FileText, Heart, Folder, Clock } from "lucide-react";
import { usePrompt } from "../../context/PromptContext";

function DashboardCards() {
  const { prompts } = usePrompt();

  const totalPrompts = prompts.length;

  const favoritePrompts = prompts.filter(
    (prompt) => prompt.favorite
  ).length;

  const categories = new Set(
    prompts.map((prompt) => prompt.category)
  ).size;

  const recentlyAdded = prompts
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 5).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
      <StatCard
        title="Total Prompts"
        value={totalPrompts}
        icon={FileText}
      />

      <StatCard
        title="Favorite Prompts"
        value={favoritePrompts}
        icon={Heart}
      />

      <StatCard
        title="Categories"
        value={categories}
        icon={Folder}
      />

      <StatCard
        title="Recently Added"
        value={recentlyAdded}
        icon={Clock}
      />
    </div>
  );
}

export default DashboardCards;