import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { usePrompt } from "../../context/PromptContext";

const promptSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  category: z.enum([
    "Coding",
    "Marketing",
    "Content Writing",
    "Email",
    "Resume",
    "SQL",
    "Design",
    "Social Media",
    "Productivity",
    "Others",
  ]),
  tags: z.string().min(1, "Enter at least one tag"),
});

type PromptFormData = z.infer<typeof promptSchema>;

interface AddPromptModalProps {
  open: boolean;
  onClose: () => void;
}

function AddPromptModal({
  open,
  onClose,
}: AddPromptModalProps) {
  const {
    addPrompt,
    updatePrompt,
    editingPrompt,
    setEditingPrompt,
  } = usePrompt();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PromptFormData>({
    resolver: zodResolver(promptSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "Coding",
      tags: "",
    },
  });

  useEffect(() => {
    if (editingPrompt) {
      reset({
        title: editingPrompt.title,
        description: editingPrompt.description,
        category: editingPrompt.category,
        tags: editingPrompt.tags.join(", "),
      });
    } else {
      reset({
        title: "",
        description: "",
        category: "Coding",
        tags: "",
      });
    }
  }, [editingPrompt, reset]);

  const onSubmit = (data: PromptFormData) => {
    const formattedPrompt = {
      title: data.title,
      description: data.description,
      content: data.description,
      category: data.category,
      tags: data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      favorite: editingPrompt?.favorite ?? false,
      pinned: editingPrompt?.pinned ?? false,
    };

    if (editingPrompt) {
      updatePrompt(editingPrompt.id, formattedPrompt);
      toast.success("Prompt updated successfully!");
    } else {
      addPrompt({
        ...formattedPrompt,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      toast.success("Prompt added successfully!");
    }

    handleClose();
  };

  const handleClose = () => {
    reset();

    setEditingPrompt(null);

    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            {editingPrompt
              ? "Edit Prompt"
              : "Add Prompt"}
          </h2>

          <button
            onClick={handleClose}
            className="text-2xl hover:text-red-500"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Title */}

          <div>
            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              {...register("title")}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter title..."
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.title?.message}
            </p>
          </div>

          {/* Description */}

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={4}
              {...register("description")}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Enter description..."
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.description?.message}
            </p>
          </div>

          {/* Category */}

          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <select
              {...register("category")}
              className="w-full border rounded-lg px-4 py-2"
            >
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
          </div>

          {/* Tags */}

          <div>
            <label className="block mb-2 font-medium">
              Tags
            </label>

            <input
              {...register("tags")}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="React, JWT, MongoDB"
            />

            <p className="text-red-500 text-sm mt-1">
              {errors.tags?.message}
            </p>
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingPrompt
                ? "Update Prompt"
                : "Save Prompt"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPromptModal;