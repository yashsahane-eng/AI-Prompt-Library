import MainLayout from "../components/layout/MainLayout";
import DashboardCards from "../components/dashboard/DashboardCards";
import SearchToolbar from "../components/prompt/SearchToolbar";
import PromptGrid from "../components/prompt/PromptGrid";

function Dashboard() {
  return (
    <MainLayout>
      <h2 className="text-3xl font-bold">
        Dashboard
      </h2>

      <p className="text-gray-600 mt-2">
        Welcome to your AI Prompt Library.
      </p>

      <DashboardCards />
      <SearchToolbar />
      <PromptGrid />
      
    </MainLayout>
  );
}

export default Dashboard;