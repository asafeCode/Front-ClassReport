import api from "../api.js";
export const teacherInfo = async (accessToken) => {
    const response = await api.get("/teacher", {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });

    return response.data;
};