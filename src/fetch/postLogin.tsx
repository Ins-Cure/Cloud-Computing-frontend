import { baseApi } from "@/utils/baseApi";
import { setToken } from "@/utils/token";
import { NextRouter } from "next/router";
import toast from "react-hot-toast";
import { GetUser } from "./getUser";
import { setProfpic } from "@/utils/profilepic";

export async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>,
  router: NextRouter
) {
  console.log("handle submit");
  event.preventDefault(); // Prevent default form submission behavior
  const formData = new FormData(event.currentTarget); // Get form data

  const email = formData.get("email"); // Get value of "email" input
  const password = formData.get("password"); // Get value of "password" input

  if (typeof email === "string" && typeof password === "string") {
    handleFetch(email, password, router); // Call handleFetch with form input values
  } else {
    // Handle the case where email or password is null or not a string
    console.error("Email or password is missing or not a string");
  }

  event.currentTarget.reset();
}

async function handleFetch(email: string, pass: string, router: NextRouter) {
  console.log("handle fetch");
  const data = {
    email: email,
    pass: pass,
  };

  await postLogin(data, router);
}

async function postLogin(
  data: {
    email: string;
    pass: string;
  },
  router: NextRouter
) {
  try {
    const response = await baseApi.post(`/inscure/login`, data);
    console.log(response.data.data);
    setToken("token", response.data.data);

    const user = await GetUser();
    setProfpic("profpic", user.data.picture);

    router.push({
      pathname: "/",
      query: { login: "success" },
    });
  } catch (error) {
    console.error("Failed to login:", error);
    toast.error("Login failed.");
  }
}
