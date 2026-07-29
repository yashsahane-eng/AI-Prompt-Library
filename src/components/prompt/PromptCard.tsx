import {
  Star,
  Pin,
  Copy,
  Pencil,
  Trash2,
  CopyPlus,
  GripVertical,
} from "lucide-react";

import { toast } from "sonner";
import { useState } from "react";

import {
  useSortable,
} from "@dnd-kit/sortable";

import {
  CSS,
} from "@dnd-kit/utilities";

import type { Prompt } from "../../types/Prompt";
import { usePrompt } from "../../context/PromptContext";
import DeleteDialog from "./DeleteDialog";

interface PromptCardProps {
  prompt: Prompt;
}

export default function PromptCard({
  prompt,
}: PromptCardProps) {

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: prompt.id,
  });

  const style = {
    transform: CSS.Transform.toString(
      transform
    ),
    transition,
  };

  const {
    deletePrompt,
    toggleFavorite,
    togglePinned,
    duplicatePrompt,
    setEditingPrompt,
  } = usePrompt();

  const [
    showDeleteDialog,
    setShowDeleteDialog,
  ] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePrompt(prompt.id);

      toast.success(
        "Prompt deleted successfully!"
      );

      setShowDeleteDialog(false);
    } catch {
      toast.error(
        "Failed to delete prompt."
      );
    }
  };

  const handleFavorite = async () => {
    try {
      await toggleFavorite(prompt.id);
    } catch {
      toast.error(
        "Failed to update favorite."
      );
    }
  };

  const handlePinned = async () => {
    try {
      await togglePinned(prompt.id);
    } catch {
      toast.error(
        "Failed to update pin."
      );
    }
  };

  const handleDuplicate = async () => {
    try {
      await duplicatePrompt(prompt.id);

      toast.success(
        "Prompt duplicated!"
      );
    } catch {
      toast.error(
        "Failed to duplicate prompt."
      );
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        prompt.content
      );

      toast.success(
        "Prompt copied to clipboard!"
      );
    } catch {
      toast.error(
        "Failed to copy prompt."
      );
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`border rounded-xl p-5 shadow-sm hover:shadow-md transition duration-200 ${
          prompt.pinned
            ? "border-blue-500 bg-blue-50"
            : "bg-white border-gray-200"
        }`}
      >
        <div className="flex items-start justify-between">

          <div className="flex items-start gap-2">

            <button
              {...attributes}
              {...listeners}
              className="cursor-grab touch-none"
            >
              <GripVertical
                size={20}
                className="text-gray-400 mt-1"
              />
            </button>

            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {prompt.title}
              </h3>

              <p className="text-sm text-gray-500 mt-1">
                {prompt.category}
              </p>
            </div>

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

        <p className="text-gray-600 text-sm mt-4">
          {prompt.description}
        </p>

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

        <div className="flex justify-between items-center mt-5">

          <span className="text-xs text-gray-500">
            Updated{" "}
            {new Date(
              prompt.updatedAt
            ).toLocaleDateString()}
          </span>

          <div className="flex items-center gap-3">

            <Pin
              size={18}
              onClick={handlePinned}
              className={`cursor-pointer ${
                prompt.pinned
                  ? "text-blue-600"
                  : "text-gray-400 hover:text-blue-600"
              }`}
            />

            <Copy
              size={18}
              onClick={handleCopy}
              className="cursor-pointer text-gray-400 hover:text-green-600"
            />

            <CopyPlus
              size={18}
              onClick={handleDuplicate}
              className="cursor-pointer text-gray-400 hover:text-purple-600"
            />

            <Pencil
              size={18}
              onClick={() =>
                setEditingPrompt(prompt)
              }
              className="cursor-pointer text-gray-400 hover:text-orange-600"
            />

            <Trash2
              size={18}
              onClick={() =>
                setShowDeleteDialog(true)
              }
              className="cursor-pointer text-gray-400 hover:text-red-600"
            />

          </div>
        </div>
      </div>

      <DeleteDialog
        open={showDeleteDialog}
        title={prompt.title}
        onCancel={() =>
          setShowDeleteDialog(false)
        }
        onConfirm={handleDelete}
      />
    </>
  );
}