import { baseApi } from "@/utils/baseApi";
import { getToken } from "@/utils/token";

export async function deletePredictionbyID(predictId: string) {
  try {
    const token = getToken();

    const response = await baseApi.get(`/prediction/del/${predictId}`, {
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
