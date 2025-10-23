import api from "./api";
export const login = async (email, password) => {
      const response = await api.post("/login", {
        username: email,
        password: password,
      });

      return response.data;
};