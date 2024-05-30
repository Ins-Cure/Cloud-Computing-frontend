import React from "react";
import Navbar from "@/components/Navbar";
import { handleSubmit } from "@/fetch/postRegister";
import { useRouter } from "next/router";

const RegisterUser = () => {
  const router = useRouter();

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 p-5">
        <form
          onSubmit={handleSubmit}
          className="formRegister flex flex-col gap-5 bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-black"
        >
          <h2 className="text-2xl font-bold text-gray-800">Register Page</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="email"
            placeholder="Email"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="text"
            name="notelp"
            placeholder="Phone Number"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <button
            type="submit"
            className="button-register p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
            onClick={() => router.push("/login")}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default RegisterUser;
