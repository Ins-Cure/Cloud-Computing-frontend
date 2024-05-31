import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/auth";
import { GetUser } from "@/fetch/getUser";

interface User {
  id: string;
  name: string;
  email: string;
  notelp: string;
  role: string;
}

const Diseases = () => {
  let token = withAuth();
  const router = useRouter();

  const [cekUser, setcekUser] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
      GetUser()
        .then((response) => {
          setUser(response.data);
          setcekUser(true);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          // Handle error case, possibly redirect to login
        });
    }
  }, [token, router]);

  // Check if the user is authenticated
  if (!token) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex justify-center items-center flex-col gap-10">
        {cekUser ? (
          user ? (
            <>
              <h1 className="font-bold text-4xl">
                Hello {user.name} This is Prediction Page
              </h1>
              <form action="">
                <input type="file" />
                <button type="submit">predict</button>
              </form>
            </>
          ) : (
            <p>Failed to load user data</p>
          )
        ) : (
          <>
            <p>loading</p>
          </>
        )}
      </div>
    </>
  );
};

export default Diseases;
