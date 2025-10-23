import api from "./api";
export const login = async (email, password) => {
    try {
        const response = await api.post("/login", {
            username: email,
            password: password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};