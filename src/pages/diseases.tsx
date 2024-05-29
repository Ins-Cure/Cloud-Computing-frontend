import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/auth";

const Diseases: React.FC = () => {
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
        <h1 className="font-bold text-4xl">Hello, This is the disease Page</h1>
      </div>
    </>
  );
};

export default Diseases;
