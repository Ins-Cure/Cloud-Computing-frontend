import { baseApi } from "@/utils/baseApi";
import { setToken } from "@/utils/token";

export function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  console.log("handle submit");
  event.preventDefault(); // Prevent default form submission behavior
  const formData = new FormData(event.currentTarget); // Get form data

  const email = formData.get("email"); // Get value of "email" input
  const password = formData.get("password"); // Get value of "password" input

  if (typeof email === "string" && typeof password === "string") {
    handlefetch(email, password); // Call handleFetch with form input values
    // console.log("email :", email);
  } else {
    // Handle the case where email or password is null or not a string
    console.error("Email or password is missing or not a string");
  }

  event.currentTarget.reset();
}

async function handlefetch(email: string, pass: string) {
  console.log("handle fetch");
  const data = {
    email: email,
    pass: pass,
  };

  postLogin(data);
}

async function postLogin(data: Object) {
  const response = await baseApi.post(`/inscure/login`, data);
  console.log(response.data.data);
  return setToken("token", response.data.data);
}