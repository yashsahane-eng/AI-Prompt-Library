import StatCard from "./StatCard";
import {
  FileText,
  Heart,
  Folder,
  Clock,
} from "lucide-react";

function DashboardCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mt-8">
      <StatCard
        title="Total Prompts"
        value={0}
        icon={FileText}
      />

      <StatCard
        title="Favorite Prompts"
        value={0}
        icon={Heart}
      />

      <StatCard
        title="Categories"
        value={10}
        icon={Folder}
      />

      <StatCard
        title="Recently Added"
        value={0}
        icon={Clock}
      />
    </div>
  );
}

export default DashboardCards;