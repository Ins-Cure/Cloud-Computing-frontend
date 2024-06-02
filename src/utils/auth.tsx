import { getToken } from "./token";
import { GetUser } from "@/fetch/getUser";
import { removeToken } from "./token";

export const withAuth = async (): Promise<string | null> => {
  let token = getToken();

  if (!token) {
    console.log("login dulu");
    return null;
  } else {
    try {
      const response = await GetUser();
      console.log("getUser : ", response);
      return token;
    } catch (error) {
      console.error("Failed to get user:", error);
      removeToken();
      console.log("masuk remove");
      return null;
    }
  }
};
