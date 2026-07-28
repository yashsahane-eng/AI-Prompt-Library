import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
}

function StatCard({ title, value, icon: Icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">
            {title}
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="bg-blue-100 p-3 rounded-lg">
          <Icon className="text-blue-600 w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

export default StatCard;