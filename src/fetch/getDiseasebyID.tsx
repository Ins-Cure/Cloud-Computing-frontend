import { baseApi } from "@/utils/baseApi";
import { getToken } from "@/utils/token";

export async function GetDiseasebyId(id: number) {
  try {
    const response = await baseApi.get(`/disease/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch disease data by id:", error);
    throw error;
  }
}
