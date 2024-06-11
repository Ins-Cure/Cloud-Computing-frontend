import { baseApi } from "@/utils/baseApi";
import { getToken } from "@/utils/token";

export async function deletePredictionbyID(
  predictId: string,
  predictLink: string
) {
  try {
    const token = getToken();
    predictLink = predictLink.split("/").pop() || "";

    const response = await baseApi.delete(
      `/prediction/del/${predictId}/${predictLink}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    throw error;
  }
}
