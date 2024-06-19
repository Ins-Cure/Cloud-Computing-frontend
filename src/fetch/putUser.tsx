import { baseApi } from "@/utils/baseApi";
import { getToken } from "@/utils/token";

export async function putUserName(username: string) {
  const data = {
    name: username,
  };
  try {
    const response = await baseApi.put(`/user/updateName`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Failed to update username:", error);
  }
}

export async function putUserPhone(phone: string) {
  const data = {
    Notelp: phone,
  };
  try {
    const response = await baseApi.put(`/user/updateNotelp`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error("Failed to update phone number:", error);
  }
}
