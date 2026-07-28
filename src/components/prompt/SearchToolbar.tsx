import { Search } from "lucide-react";
import { usePrompt } from "../../context/PromptContext";

function SearchToolbar() {
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = usePrompt();

  return (
    <div className="mt-8 bg-white rounded-xl border p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
      {/* Search */}

      <div className="relative w-full md:w-96">
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

      {/* Filters */}

      <div className="flex gap-3 flex-wrap">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="All">All Categories</option>
          <option value="Coding">Coding</option>
          <option value="Marketing">Marketing</option>
          <option value="Content Writing">
            Content Writing
          </option>
          <option value="Email">Email</option>
          <option value="Resume">Resume</option>
          <option value="SQL">SQL</option>
          <option value="Design">Design</option>
          <option value="Social Media">
            Social Media
          </option>
          <option value="Productivity">
            Productivity
          </option>
          <option value="Others">Others</option>
        </select>

        {/* Sort - next feature */}

        <select
          disabled
          className="border rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
        >
          <option>A → Z</option>
        </select>
      </div>
    </div>
  );
}

export default SearchToolbar;