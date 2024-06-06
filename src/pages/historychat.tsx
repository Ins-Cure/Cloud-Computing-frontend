import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/auth";

const History = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const authenticate = async () => {
      const authToken = await withAuth();
      if (!authToken) {
        router.push("/login");
      } else {
        setToken(authToken);
      }
    };

    authenticate();
  }, []);

  if (!token) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col justify-center items-center gap-10 bg-gray-100 py-10 dark:text-black">
        <h1>This is chat History Page</h1>
      </div>
    </>
  );
};

export default History;
