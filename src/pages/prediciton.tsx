import React from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { getToken } from "@/utils/token";

const diseases = () => {
  let token;
  const router = useRouter();

  if (getToken() == null) {
    router.push("/login");
    console.log("login dulu");
  } else {
    token = getToken();
    console.log(`Ini token mu : `, token);
  }

  // Check if the user is authenticated
  if (!token) {
    // If not authenticated, redirect to the login page
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex justify-center items-center flex-col gap-10">
        <h1 className="font-bold text-4xl">Hello This is Prediction Page</h1>
        {/* <p>Please Login first</p> */}
      </div>
    </>
  );
};
export default diseases;
