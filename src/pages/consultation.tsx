import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/auth";

import { Chatroom } from "@/entity/chatroom";
import { GetChat } from "@/fetch/getChat";

const History = () => {
  const [token, setToken] = useState("");
  const router = useRouter();

  const [cekHistoryChat, setcekHistoryChat] = useState(false);
  const [historyChat, setHistoryChat] = useState<Chatroom[] | null>(null);
  const [Role, setRole] = useState("");

  useEffect(() => {
    const authenticate = async () => {
      const authToken = await withAuth();
      if (!authToken) {
        router.push("/login");
      } else {
        setToken(authToken);
        GetChat()
          .then((response) => {
            setHistoryChat(response.data);
            if (response.data && response.data.length > 0) {
              setcekHistoryChat(true);
              setRole(response.role);
            }
          })
          .catch((error) => {});
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
      <div className="min-h-screen w-full flex flex-col items-center gap-6 bg-gray-100 py-10 dark:text-black">
        <h1 className="text-2xl font-bold">Your Consultation</h1>
        {cekHistoryChat ? (
          historyChat?.map((chat) => (
            <div
              key={chat.uid_doctor}
              className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 mb-4 dark:bg-gray-800"
            >
              <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
                {Role === "User" ? chat.u_doctor : chat.u_name}
              </p>
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() =>
                  router.push({
                    pathname: "/chat/[id]",
                    query: {
                      id: chat.uid,
                      name: chat.u_name,
                      d_id: chat.uid_doctor,
                      role: Role,
                    },
                  })
                }
              >
                Chat again
              </button>
            </div>
          ))
        ) : (
          <h1 className="text-red-500">
            You have not made any consultation yet.
          </h1>
        )}
      </div>
    </>
  );
};

export default History;