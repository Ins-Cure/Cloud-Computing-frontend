import { baseApi } from "@/utils/baseApi";
import { getToken } from "@/utils/token";

export async function GetDisease() {
  try {
    const response = await baseApi.get(`/disease`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch disease data:", error);
    throw error;
  }
}
