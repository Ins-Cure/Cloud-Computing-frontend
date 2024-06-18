import { baseApi } from "@/utils/baseApi";
import { NextRouter } from "next/router";
import toast from "react-hot-toast";

export async function handleSubmit(
  event: React.FormEvent<HTMLFormElement>,
  router: NextRouter
) {
  event.preventDefault(); // Prevent default form submission behavior
  const formData = new FormData(event.currentTarget); // Get form data

  const name = formData.get("name"); // Get value of "name" input
  const email = formData.get("email"); // Get value of "email" input
  const notelp = formData.get("notelp"); // Get value of "notelp" input
  const password = formData.get("password"); // Get value of "password" input

  if (
    typeof email === "string" &&
    typeof password === "string" &&
    typeof name === "string" &&
    typeof notelp === "string"
  ) {
    handlefetch(name, email, notelp, password, router);
  } else {
    // Handle the case where email or password is null or not a string
    console.error("Email or password is missing or not a string");
  }

  event.currentTarget.reset();
}

async function handlefetch(
  name: string,
  email: string,
  notelp: string,
  pass: string,
  router: NextRouter
) {
  const data = {
    name: name,
    email: email,
    notelp: notelp,
    pass: pass,
  };
  // console.log(data);
  await postRegister(data, router);
}

async function postRegister(data: object, router: NextRouter) {
  try {
    const response = await baseApi.post(`/inscure/add`, data);
    console.log(response.data.message);

    router.push({
      pathname: "/login",
      query: { register: "success" },
    });
  } catch (error) {
    console.error("Failed to register:", error);
    toast.error("Register failed.");
  }
}
