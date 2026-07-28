import express from "express";
import cors from "cors";
import promptRoutes from "./routes/promptRoutes";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "AI Prompt Library API is running",
  });
});

app.use("/api/prompts", promptRoutes);

export default app;