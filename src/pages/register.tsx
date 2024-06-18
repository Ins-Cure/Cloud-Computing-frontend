import React from "react";
import Navbar from "@/components/Navbar";
import { handleSubmit } from "@/fetch/postRegister";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

const RegisterUser = () => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen w-full flex justify-center  bg-gray-100 p-5">
        <form
          onSubmit={(e) => {
            handleSubmit(e, router);
          }}
          className="formRegister flex flex-col gap-5 bg-white p-8 rounded-lg shadow-lg shadow-purple-200 w-full max-w-md text-black"
        >
          <h2 className="text-2xl font-bold text-purple-800 self-center">
            Register
          </h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <input
            type="text"
            name="notelp"
            placeholder="Phone Number"
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <button
            type="submit"
            className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition duration-300 font-semibold"
          >
            Submit
          </button>
          <p className="self-center">
            Already Have an account ? Please{" "}
            <a href="/login" className="underline hover:text-purple-500">
              Login
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterUser;
