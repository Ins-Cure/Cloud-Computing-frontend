import React from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/auth";

const diseases = () => {
  let token = withAuth();
  const router = useRouter();

  if (token == null) {
    router.push("/login");
  }

  // Check if the user is authenticated
  if (!token) {
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
