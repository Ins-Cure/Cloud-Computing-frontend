import { baseApi } from "@/utils/baseApi";
import { getToken } from "@/utils/token";

export async function HandleAddChat(
  id: string,
  name: string,
  d_id: string,
  d_name: string
) {
  const data = {
    uid: id,
    u_name: name,
    uid_doctor: d_id,
    u_doctor: d_name,
  };
  console.log("handle add chat");
  await PostChat(data);
}

async function PostChat(data: {
  uid: string;
  u_name: string;
  uid_doctor: string;
  u_doctor: string;
}) {
  console.log("handle post chat");
  try {
    const response = await baseApi.post(`/chatroom/add`, data, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(response.data.data);
  } catch (error) {
    console.error("Failed to login:", error);
  }
}
