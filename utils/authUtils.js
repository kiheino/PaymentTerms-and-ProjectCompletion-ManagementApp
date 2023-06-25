import authApi from "../api/authApi";

const authUtils = {
  //フイールド？
  isAuthenticated: async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
      const res = await authApi.verifyToken();
      return res.data.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
