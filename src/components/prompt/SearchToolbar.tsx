import { Search } from "lucide-react";
import { usePrompt } from "../../context/PromptContext";
import type { SortOption } from "../../context/PromptActions";

function SearchToolbar() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    showFavoritesOnly,
    setShowFavoritesOnly,
    sortBy,
    setSortBy,
  } = usePrompt();

  return (
    <div className="mt-8 bg-white rounded-xl border p-4 flex flex-col lg:flex-row gap-4 items-center justify-between">
      <div className="relative w-full lg:w-96">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search prompts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border rounded-lg py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-3 w-full lg:w-auto">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="All">All Categories</option>
          <option value="Coding">Coding</option>
          <option value="Marketing">Marketing</option>
          <option value="Content Writing">Content Writing</option>
          <option value="Email">Email</option>
          <option value="Resume">Resume</option>
          <option value="SQL">SQL</option>
          <option value="Design">Design</option>
          <option value="Social Media">Social Media</option>
          <option value="Productivity">Productivity</option>
          <option value="Others">Others</option>
        </select>

        <select
          value={showFavoritesOnly ? "favorites" : "all"}
          onChange={(e) =>
            setShowFavoritesOnly(e.target.value === "favorites")
          }
          className="border rounded-lg px-4 py-2"
        >
          <option value="all">All Prompts</option>
          <option value="favorites">Favorites Only</option>
        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as SortOption)
          }
          className="border rounded-lg px-4 py-2"
        >
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option value="A-Z">A → Z</option>
          <option value="Z-A">Z → A</option>
        </select>
      </div>
    </div>
  );
}

export default SearchToolbar;