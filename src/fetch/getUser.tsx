import { baseApi } from "@/utils/baseApi";
import { getToken } from "@/utils/token";
import { useState } from "react";

export async function GetUser() {
  //   console.log(getToken());
  const response = await baseApi.get(`/user/me`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
  //   console.log(response.data);
  return response.data;
}
