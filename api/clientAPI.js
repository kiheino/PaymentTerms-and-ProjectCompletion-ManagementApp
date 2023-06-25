import axiosClient from "./axiosClient";

const clientApi = {
  register: (client) => axiosClient.post("client/register", client),
  getClient: (clientName) => axiosClient.get(`client/${clientName}`),
  getAll: () => axiosClient.get("/client"),
};

export default clientApi;
