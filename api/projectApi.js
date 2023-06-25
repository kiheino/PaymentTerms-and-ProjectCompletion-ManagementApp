import axiosClient from "./axiosClient";

const projectApi = {
  register: (project) => axiosClient.post("project/register", project),
  getAll: () => axiosClient.get("project"),
  update: (updates) => axiosClient.patch("project/update", updates),
  delete: (id) => axiosClient.delete(`project/${id}`),
};

export default projectApi;
