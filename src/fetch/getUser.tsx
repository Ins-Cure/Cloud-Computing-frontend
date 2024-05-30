import { baseApi } from "@/utils/baseApi";
import { getToken } from "@/utils/token";
import { useState } from "react";

export async function GetUser() {
  //   console.log(getToken());
  try {
    const response = await baseApi.get(`/user/me`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {}
}
