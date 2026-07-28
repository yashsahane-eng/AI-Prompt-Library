import ExportImportButtons from "../components/prompt/ExportImportButtons";

function ImportExport() {
  return (
    <div>
      <h1 className="text-3xl font-bold">
        Import / Export
      </h1>

      <p className="text-gray-600 mt-2">
        Backup your prompts or restore them using JSON files.
      </p>

      <div className="mt-8">
        <ExportImportButtons />
      </div>
    </div>
  );
}

export default ImportExport;