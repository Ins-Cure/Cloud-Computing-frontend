import { baseApi } from "@/utils/baseApi";
import { getToken } from "@/utils/token";

export async function putProfilePict(data: FormData) {
  try {
    const response = await baseApi.put(
      `/user/profilepic`,
      data, // Directly pass FormData
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "multipart/form-data", // Ensure correct content type
        },
      }
    );
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Failed to update profpic:", error);
    throw error;
  }
}
