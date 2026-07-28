import { Request, Response } from "express";
import Prompt from "../models/Prompt";

export const getAllPrompts = async (
  _req: Request,
  res: Response
) => {
  try {
    const prompts = await Prompt.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      data: prompts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch prompts",
    });
  }
};

export const getPromptById = async (
  req: Request,
  res: Response
) => {
  try {
    const prompt = await Prompt.findById(req.params.id);

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: "Prompt not found",
      });
    }

    res.status(200).json({
      success: true,
      data: prompt,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch prompt",
    });
  }
};

export const createPrompt = async (
  req: Request,
  res: Response
) => {
  try {
    const prompt = await Prompt.create(req.body);

    res.status(201).json({
      success: true,
      data: prompt,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to create prompt",
    });
  }
};

export const updatePrompt = async (
  req: Request,
  res: Response
) => {
  try {
    const prompt = await Prompt.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: "Prompt not found",
      });
    }

    res.status(200).json({
      success: true,
      data: prompt,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to update prompt",
    });
  }
};

export const deletePrompt = async (
  req: Request,
  res: Response
) => {
  try {
    const prompt = await Prompt.findByIdAndDelete(
      req.params.id
    );

    if (!prompt) {
      return res.status(404).json({
        success: false,
        message: "Prompt not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Prompt deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete prompt",
    });
  }
};