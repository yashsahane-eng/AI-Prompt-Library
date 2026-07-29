import {
  Home,
  Star,
  Folder,
  Clock,
  Upload,
  Settings,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { usePrompt } from "../../context/PromptContext";

function Sidebar() {
  const navigate = useNavigate();

  const {
    setShowFavoritesOnly,
  } = usePrompt();

  const handleDashboard = () => {
    setShowFavoritesOnly(false);
    navigate("/");
  };

  const handleFavorites = () => {
    setShowFavoritesOnly(true);
    navigate("/");
  };

  const handleCategories = () => {
    navigate("/");

    setTimeout(() => {
      document
        .getElementById("category-filter")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6 flex flex-col min-h-screen">

      <h2 className="text-sm font-semibold text-gray-500 uppercase mb-5">
        Workspace
      </h2>

      <ul className="space-y-2">

        <li
          onClick={handleDashboard}
          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-blue-600 hover:bg-blue-50"
        >
          <Home size={18} />
          Dashboard
        </li>


        <li
          onClick={handleFavorites}
          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-100"
        >
          <Star size={18} />
          Favorites
        </li>


        <li
          onClick={handleCategories}
          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-100"
        >
          <Folder size={18} />
          Categories
        </li>


        <li
          onClick={() => navigate("/")}
          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-100"
        >
          <Clock size={18} />
          Recent Prompts
        </li>

      </ul>


      <h2 className="text-sm font-semibold text-gray-500 uppercase mt-8 mb-5">
        Tools
      </h2>


      <ul className="space-y-2">

        <li
          onClick={() => navigate("/import-export")}
          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-100"
        >
          <Upload size={18} />
          Import / Export
        </li>


        <li
          className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-gray-600 hover:bg-gray-100"
        >
          <Settings size={18} />
          Settings
        </li>

      </ul>


      <div className="mt-auto pt-6 border-t">
        <p className="text-xs text-gray-500">
          Built by Yash Sahane
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;