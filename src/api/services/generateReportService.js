import api from "../api.js";
export const generateReport = async (accessToken, classId) => {
    const response = await api.post("/generate-report", {
        headers: { Authorization: `Bearer ${accessToken}` },
        classid: String(classId)
})
    return response.data;
};