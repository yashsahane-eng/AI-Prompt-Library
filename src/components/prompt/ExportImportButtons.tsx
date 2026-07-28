import { Download, Upload } from "lucide-react";
import { useRef } from "react";
import { toast } from "sonner";

import { usePrompt } from "../../context/PromptContext";
import type { Prompt } from "../../types/Prompt";
import { sortPrompts } from "../../context/PromptActions";

function ExportImportButtons() {
  const { prompts, setPrompts } = usePrompt();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const data = JSON.stringify(prompts, null, 2);

    const blob = new Blob([data], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    const date = new Date().toISOString().split("T")[0];

    link.href = url;
    link.download = `ai-prompt-library-${date}.json`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    toast.success("Prompts exported successfully!");
  };

  const handleImport = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const importedPrompts = JSON.parse(
          e.target?.result as string
        ) as Prompt[];

        if (!Array.isArray(importedPrompts)) {
          throw new Error("Invalid file");
        }

        setPrompts(sortPrompts(importedPrompts));

        toast.success("Prompts imported successfully!");
      } catch {
        toast.error("Invalid JSON file.");
      }

      event.target.value = "";
    };

    reader.readAsText(file);
  };

  return (
    <div className="flex justify-end gap-3 mt-4">
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        <Upload size={18} />
        Import JSON
      </button>

      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        <Download size={18} />
        Export JSON
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        hidden
        onChange={handleImport}
      />
    </div>
  );
}

export default ExportImportButtons;