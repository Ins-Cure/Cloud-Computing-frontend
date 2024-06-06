import React from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { handleSubmit } from "@/fetch/postLogin";

const LoginUser = () => {
  const router = useRouter();

  const goToPage = (path: string) => {
    router.push(path);
    // router.reload();
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex justify-center items-center flex-col gap-10 bg-gray-100 p-5">
        <form
          onSubmit={(e) => {
            handleSubmit(e).then(() => router.push("/"));
          }}
          className="flex flex-col gap-5 bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-black"
        >
          <h2 className="text-2xl font-bold text-gray-800">Login Page</h2>
          <input
            type="text"
            name="email"
            placeholder="Email"
            required
            className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          <input
            name="password"
            placeholder="Password"
            required
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
            type="button"
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
