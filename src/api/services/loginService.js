import api from "../api.js";

export const login = async (email, password) => {
      const response = await api.post("/login", {
        username: email,
        password: password,
      });

      return response.data.accessToken;
};