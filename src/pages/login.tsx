import React from "react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { postLogin } from "@/fetch/postLogin";
import { setToken } from "@/utils/token";

const LoginUser = () => {
  const router = useRouter();

  async function handlefetch(email: string, pass: string) {
    console.log("handle fetch");
    const data = {
      email: email,
      pass: pass,
    };

    postLogin(data);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    console.log("handle submit");
    event.preventDefault(); // Prevent default form submission behavior
    const formData = new FormData(event.currentTarget); // Get form data

    const email = formData.get("email"); // Get value of "email" input
    const password = formData.get("password"); // Get value of "password" input

    if (typeof email === "string" && typeof password === "string") {
      handlefetch(email, password); // Call handleFetch with form input values
    } else {
      // Handle the case where email or password is null or not a string
      console.error("Email or password is missing or not a string");
    }

    event.currentTarget.reset();
  }

  const goToPage = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex justify-center items-center flex-col gap-10 bg-gray-100 p-5">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-black"
        >
          <h2 className="text-2xl font-bold text-gray-800">Login Page</h2>
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            name="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Submit
          </button>
          <p className="self-center">Dont Have account ? Please Register</p>
          <button
            onClick={() => goToPage("/register")}
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginUser;
