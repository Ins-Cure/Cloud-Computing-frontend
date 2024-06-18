import { baseApi } from "@/utils/baseApi";
import { NextRouter } from "next/router";

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
  postRegister(data, router);
  // Configure the fetch request with method, headers, and body
}

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
    handlefetch(name, email, notelp, password, router); // Call handleFetch with form input values
  } else {
    // Handle the case where email or password is null or not a string
    console.error("Email or password is missing or not a string");
  }

  event.currentTarget.reset();
}

export async function postRegister(data: object, router: NextRouter) {
  const response = await baseApi.post(`/inscure/add`, data);
  console.log(response.data.message);
  router.push("/login");
}
