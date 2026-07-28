import { Search } from "lucide-react";

function SearchToolbar() {
  return (
    <div className="mt-8 bg-white rounded-xl border p-4 flex flex-col md:flex-row gap-4 items-center justify-between">

      <div className="relative w-full md:w-96">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search prompts..."
          className="w-full border rounded-lg py-2 pl-10 pr-4 outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex gap-3 flex-wrap">

        <select className="border rounded-lg px-4 py-2">
          <option>All Categories</option>
          <option>Coding</option>
          <option>Marketing</option>
          <option>Content Writing</option>
          <option>Email</option>
          <option>Resume</option>
          <option>SQL</option>
          <option>Design</option>
          <option>Social Media</option>
          <option>Productivity</option>
          <option>Others</option>
        </select>

        <select className="border rounded-lg px-4 py-2">
          <option>Newest</option>
          <option>Oldest</option>
          <option>A → Z</option>
          <option>Z → A</option>
        </select>

      </div>

    </div>
  );
}

export default SearchToolbar;