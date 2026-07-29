import MainLayout from "../components/layout/MainLayout";
import DashboardCards from "../components/dashboard/DashboardCards";
import SearchToolbar from "../components/prompt/SearchToolbar";
import PromptGrid from "../components/prompt/PromptGrid";
import ExportImportButtons from "../components/prompt/ExportImportButtons";
import  Loader from "../components/common/Loader";
import { usePrompt } from "../context/PromptContext";

function Dashboard() {
  const {
    prompts,
    filteredPrompts,
    loading,
  } = usePrompt();

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">
            Dashboard
          </h2>

          <p className="text-gray-600 mt-2">
            Welcome to your AI Prompt Library.
          </p>
        </div>

        <ExportImportButtons />
      </div>

      <DashboardCards />

      <SearchToolbar />

      {loading ? (
        <div className="mt-10">
          <Loader />
        </div>
      ) : (
        <>
          <div className="mt-5 mb-3 flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-900">
                {filteredPrompts.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-900">
                {prompts.length}
              </span>{" "}
              prompts
            </p>
          </div>

          <PromptGrid />
        </>
      )}
    </MainLayout>
  );
}

export default Dashboard;