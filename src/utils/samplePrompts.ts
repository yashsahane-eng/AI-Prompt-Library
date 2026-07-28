import type { Prompt } from "../types/Prompt";

export const samplePrompts: Prompt[] = [
  {
    id: crypto.randomUUID(),
    title: "JWT Authentication",
    content: "Create JWT authentication using Express and MongoDB.",
    description: "Secure login with JWT.",
    category: "Coding",
    tags: ["JWT", "Node", "MongoDB"],
    favorite: true,
    pinned: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },

  {
    id: crypto.randomUUID(),
    title: "LinkedIn Post",
    content: "Write a professional LinkedIn post.",
    description: "Generate engaging LinkedIn content.",
    category: "Marketing",
    tags: ["LinkedIn", "Marketing"],
    favorite: false,
    pinned: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];