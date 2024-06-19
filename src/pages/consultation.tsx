import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/auth";
import { GetUser } from "@/fetch/getUser";
import { User } from "@/entity/user";

import { Chatroom } from "@/entity/chatroom";
import { GetChat } from "@/fetch/getChat";

const History = () => {
  const [token, setToken] = useState("");
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const [cekHistoryChat, setcekHistoryChat] = useState(false);
  const [historyChat, setHistoryChat] = useState<Chatroom[] | null>(null);
  const [Role, setRole] = useState("");

  useEffect(() => {
    const authenticate = async () => {
      const authToken = await withAuth();
      if (!authToken) {
        router.push({
          pathname: "/login",
          query: { auth: "false" },
        });
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

        GetUser()
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.error("Failed to fetch user data:", error);
            // Handle error case, possibly redirect to login
          });
      }
    };

    authenticate();
  }, []);

  if (!token) {
    return null;
  }

  const goToPage = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col items-center gap-6 bg-gray-100 py-10 dark:text-black">
        <h1 className="text-2xl font-bold">Your Consultation</h1>
        <button
          className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition duration-300 font-semibold shadow-md shadow-purple-200"
          onClick={() =>
            router.push({
              pathname: "/choosedoctor/[id]",
              query: {
                id: user?.id,
                name: user?.name,
                role: user?.role,
              },
            })
          }
        >
          Start new Consultation
        </button>
        {cekHistoryChat ? (
          historyChat?.map((chat) => (
            <div
              key={chat.uid_doctor}
              className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 mb-4 shadow-purple-200"
            >
              <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
                {Role === "User" ? chat.u_doctor : chat.u_name}
              </p>
              <button
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
