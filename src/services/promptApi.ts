import api from "./api";

export const promptApi = {
  getAll() {
    return api.get("/prompts");
  },

  getById(id: string) {
    return api.get(`/prompts/${id}`);
  },

  create(data: unknown) {
    return api.post("/prompts", data);
  },

  update(id: string, data: unknown) {
    return api.put(`/prompts/${id}`, data);
  },

  delete(id: string) {
    return api.delete(`/prompts/${id}`);
  },
};