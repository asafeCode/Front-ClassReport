import api from "../api.js";
export const classes = async (accessToken) => {
    const response = await api.get("/classes", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    return response.data;
};