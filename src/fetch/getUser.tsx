import { baseApi } from "@/utils/baseApi";
import { getToken } from "@/utils/token";

export async function GetUser() {
  try {
    const token = getToken();

    const response = await baseApi.get(`/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
}
