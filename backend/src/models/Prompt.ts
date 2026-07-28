import { Schema, model, InferSchemaType } from "mongoose";

const promptSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    pinned: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export type PromptDocument = InferSchemaType<typeof promptSchema>;

const Prompt = model<PromptDocument>("Prompt", promptSchema);

export default Prompt;