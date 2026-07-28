import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { PromptProvider } from "./context/PromptContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <PromptProvider>
        <App />
      </PromptProvider>
    </BrowserRouter>
  </React.StrictMode>
);