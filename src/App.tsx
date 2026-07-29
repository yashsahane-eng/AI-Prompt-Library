import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ImportExport from "./pages/ImportExport";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Dashboard />}
      />

      <Route
        path="/import-export"
        element={<ImportExport />}
      />
    </Routes>
  );
}

export default App;