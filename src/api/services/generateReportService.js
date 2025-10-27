import api from "../api.js";

export const generateReport = async (accessToken, classId) => {
  const response = await api.post(
    "/generate-report",
    { classid: String(classId) },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response;
};