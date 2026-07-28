import {
  Star,
  Pin,
  Copy,
  Pencil,
  Trash2,
  CopyPlus,
} from "lucide-react";

import { toast } from "sonner";
import type { Prompt } from "../../types/Prompt";
import { usePrompt } from "../../context/PromptContext";

interface PromptCardProps {
  prompt: Prompt;
}

export default function PromptCard({
  prompt,
}: PromptCardProps) {
  const {
    deletePrompt,
    toggleFavorite,
    togglePinned,
    duplicatePrompt,
    setEditingPrompt,
  } = usePrompt();

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${prompt.title}"?`
    );

    if (!confirmDelete) return;

    deletePrompt(prompt.id);
  };

  const handleFavorite = () => {
    toggleFavorite(prompt.id);
  };

  const handlePinned = () => {
    togglePinned(prompt.id);
  };

  const handleDuplicate = () => {
    duplicatePrompt(prompt.id);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      toast.success("Prompt copied to clipboard!");
    } catch {
      toast.error("Failed to copy prompt.");
    }
  };

  const handleEdit = () => {
    setEditingPrompt(prompt);
  };

  return (
    <div
      className={`border rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200 ${
        prompt.pinned
          ? "border-blue-500 bg-blue-50"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {prompt.title}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {prompt.category}
          </p>
        </div>

        <button onClick={handleFavorite}>
          <Star
            size={20}
            className={`transition ${
              prompt.favorite
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-400 hover:text-yellow-500"
            }`}
          />
        </button>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-sm mt-4">
        {prompt.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-4">
        {prompt.tags.map((tag) => (
          <span
            key={tag}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-xs font-medium"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-5">
        <span className="text-xs text-gray-500">
          Updated {new Date(prompt.updatedAt).toLocaleDateString()}
        </span>

        <div className="flex items-center gap-3">
          <Pin
            size={18}
            onClick={handlePinned}
            className={`cursor-pointer transition ${
              prompt.pinned
                ? "text-blue-600"
                : "text-gray-400 hover:text-blue-600"
            }`}
          />

          <Copy
            size={18}
            onClick={handleCopy}
            className="cursor-pointer text-gray-400 hover:text-green-600 transition"
          />

          <CopyPlus
            size={18}
            onClick={handleDuplicate}
            className="cursor-pointer text-gray-400 hover:text-purple-600 transition"
          />

          <Pencil
            size={18}
            onClick={handleEdit}
            className="cursor-pointer text-gray-400 hover:text-orange-600 transition"
          />

          <Trash2
            size={18}
            onClick={handleDelete}
            className="cursor-pointer text-gray-400 hover:text-red-600 transition"
          />
        </div>
      </div>
    </div>
  );
}