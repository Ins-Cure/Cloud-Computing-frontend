import { baseApi } from "@/utils/baseApi";
import { getToken } from "@/utils/token";

export async function GetHistory() {
  try {
    const response = await baseApi.get(`/prediction/list`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
}
