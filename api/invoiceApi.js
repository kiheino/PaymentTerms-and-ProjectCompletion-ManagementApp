import axiosClient from "./axiosClient";

const invoiceApi = {
  register: (data) => axiosClient.post("invoice/register/completion", data),
  registerProgress: (data) =>
    axiosClient.post("invoice/register/progress", data),
  getAll: () => axiosClient.get("invoice"),
};

export default invoiceApi;
