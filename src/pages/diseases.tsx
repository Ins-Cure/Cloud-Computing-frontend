import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { getToken } from "@/utils/token";

const Diseases: React.FC = () => {
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
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex justify-center items-center flex-col gap-10">
        <h1 className="font-bold text-4xl">Hello, This is the disease Page</h1>
      </div>
    </>
  );
};

export default Diseases;
