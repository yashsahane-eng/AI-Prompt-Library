interface AddPromptModalProps {
  open: boolean;
  onClose: () => void;
}

function AddPromptModal({
  open,
  onClose,
}: AddPromptModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">
            Add Prompt
          </h2>

          <button
            onClick={onClose}
            className="text-2xl font-bold hover:text-red-500"
          >
            ×
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block mb-2 font-medium">
              Title
            </label>

            <input
              type="text"
              placeholder="Enter title..."
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows={4}
              placeholder="Enter description..."
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <select className="w-full border rounded-lg px-4 py-2">
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
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Tags
            </label>

            <input
              type="text"
              placeholder="JWT, React, MongoDB"
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <p className="text-sm text-gray-500 mt-1">
              Separate tags using commas.
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={onClose}
              className="px-5 py-2 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Save Prompt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPromptModal;