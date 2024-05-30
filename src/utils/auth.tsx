import { getToken } from "./token";

export const withAuth = (): string | null => {
  let token;

  if (getToken() == null) {
    console.log("login dulu");
    return null;
  } else {
    token = getToken();
    // console.log(`Ini token mu : `, token);
    return token;
  }
};
