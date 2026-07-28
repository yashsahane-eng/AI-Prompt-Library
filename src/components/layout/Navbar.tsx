import { useEffect, useState } from "react";
import { Search } from "lucide-react";

import AddPromptModal from "../prompt/AddPromptModal";
import { usePrompt } from "../../context/PromptContext";

function Navbar() {
  const [open, setOpen] = useState(false);

  const {
    editingPrompt,
    setEditingPrompt,
    searchTerm,
    setSearchTerm,
  } = usePrompt();

  useEffect(() => {
    if (editingPrompt) {
      setOpen(true);
    }
  }, [editingPrompt]);

  const handleClose = () => {
    setOpen(false);
    setEditingPrompt(null);
  };

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 gap-6">
        <h1 className="text-2xl font-bold text-blue-600 whitespace-nowrap">
          AI Prompt Library
        </h1>

        {/* Search Bar */}

        <div className="flex-1 max-w-md relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) =>
              setSearchTerm(e.target.value)
            }
            className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Add Prompt
        </button>
      </header>

      <AddPromptModal
        open={open}
        onClose={handleClose}
      />
    </>
  );
}

export default Navbar;