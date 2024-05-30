import { baseApi } from "@/utils/baseApi";
import { setToken } from "@/utils/token";

export async function postLogin(data: Object) {
  const response = await baseApi.post(`/inscure/login`, data);
  console.log(response.data.data);
  return setToken("token", response.data.data);
}
