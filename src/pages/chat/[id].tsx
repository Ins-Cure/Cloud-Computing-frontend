import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/auth";
// import ChatRoom from "@/components/ChatRoom/ChatRoom";
import ChatRoom from "@/components/ChatRoom/ChatRoom.jsx";

const History = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const { id, name, d_id, role } = router.query;

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
      <div className="min-h-fit w-full flex flex-col justify-center items-center gap-10 bg-gray-100 p-8">
        <ChatRoom userID={id} doctorID={d_id} role={role} />
      </div>
    </>
  );
};

export default History;
