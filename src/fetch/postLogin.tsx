import { baseApi } from "@/utils/baseApi";

export async function postLogin(data: Object) {
  const response = await baseApi.post(`/inscure/login`, data);
  console.log(response.data.data);
  return response.data.data;
}
