import { Router } from "express";
import {
  getAllPrompts,
  getPromptById,
  createPrompt,
  updatePrompt,
  deletePrompt,
} from "../controllers/promptController";

const router = Router();

router.get("/", getAllPrompts);

router.get("/:id", getPromptById);

router.post("/", createPrompt);

router.put("/:id", updatePrompt);

router.delete("/:id", deletePrompt);

export default router;