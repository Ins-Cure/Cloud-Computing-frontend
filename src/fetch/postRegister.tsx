import { baseApi } from "@/utils/baseApi";

function handlefetch(
  name: string,
  email: string,
  notelp: string,
  pass: string
) {
  const data = {
    name: name,
    email: email,
    notelp: notelp,
    pass: pass,
  };
  // console.log(data);
  postRegister(data);
  // Configure the fetch request with method, headers, and body
}

export function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
    handlefetch(name, email, notelp, password); // Call handleFetch with form input values
  } else {
    // Handle the case where email or password is null or not a string
    console.error("Email or password is missing or not a string");
  }

  event.currentTarget.reset();
}

export async function postRegister(data: object) {
  const response = await baseApi.post(`/inscure/add`, data);
  console.log(response.data.message);
}
