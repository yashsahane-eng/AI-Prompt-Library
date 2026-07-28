import { useState } from "react";
import AddPromptModal from "../prompt/AddPromptModal";

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
        <h1 className="text-2xl font-bold text-blue-600">
          AI Prompt Library
        </h1>

        <button
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          + Add Prompt
        </button>
      </header>

      <AddPromptModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export default Navbar;