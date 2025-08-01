import axiosInstance from "./axiosInstance.js";

export const fetchUserData = async () => {
  try {
    const res = await axiosInstance.get("/users/me");
    return res.data;
  } catch (err) {
    console.error("User data fetch failed:", err);
    return null;
  }
};
