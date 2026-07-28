import { useEffect, useState } from "react";

import AddPromptModal from "../prompt/AddPromptModal";
import { usePrompt } from "../../context/PromptContext";

function Navbar() {
  const [open, setOpen] = useState(false);

  const { editingPrompt, setEditingPrompt } = usePrompt();

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
      <header className="bg-white border-b border-gray-200 px-6 py-4">
       <div className="flex items-center justify-between w-full">
  <div className="flex items-center gap-3">
    <h1 className="text-2xl font-bold text-blue-600">
      AI Prompt Library
    </h1>

    <span className="text-sm text-gray-500">
      built by Yash Sahane
    </span>
  </div>
          <button
            onClick={() => setOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            + Add Prompt
          </button>
        </div>
      </header>

      <AddPromptModal
        open={open}
        onClose={handleClose}
      />
    </>
  );
}

export default Navbar;