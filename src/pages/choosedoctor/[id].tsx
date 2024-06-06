import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/auth";

import { GetAllDoctor } from "@/fetch/getAllDoctor";
import { User } from "@/entity/user";
import { HandleAddChat } from "@/fetch/postChatroom";

const History = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const [cekDoctor, setcekDoctor] = useState(false);
  const [doctor, setDoctor] = useState<User[] | null>(null);
  const { id, name } = router.query;

  useEffect(() => {
    const authenticate = async () => {
      const authToken = await withAuth();
      if (!authToken) {
        router.push("/login");
      } else {
        setToken(authToken);
        GetAllDoctor()
          .then((response) => {
            setDoctor(response.data);
            console.log(response.data);
            if (response.data && response.data.length > 0) {
              setcekDoctor(true);
            }
          })
          .catch((error) => {});
      }
    };

    authenticate();
  }, [router]);

  if (!token) {
    return null;
  }

  const goToPage = (path: string) => {
    router.push(path);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen w-full flex flex-col justify-center items-center bg-gray-100 py-10">
        {cekDoctor ? (
          doctor?.map((doctor) => (
            <div
              key={doctor.id}
              className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6 mb-6 transform hover:scale-105 transition-transform duration-300"
            >
              <p className="text-gray-800 text-lg mb-2">
                <span className="font-bold">Nama:</span> {doctor.name}
              </p>
              <p className="text-gray-800 text-lg mb-2">
                <span className="font-bold">Email:</span> {doctor.email}
              </p>
              <p className="text-gray-800 text-lg mb-4">
                <span className="font-bold">NoTelp:</span> {doctor.notelp}
              </p>
              <button
                onClick={() => {
                  if (typeof id === "string" && typeof name === "string") {
                    HandleAddChat(id, name, doctor.id, doctor.name).then(() =>
                      goToPage(`/chat/${doctor.id}`)
                    );
                  }
                }}
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Chat with this doctor
              </button>
            </div>
          ))
        ) : (
          <h1 className="text-red-500 text-2xl font-semibold">
            There is no Doctor Available
          </h1>
        )}
      </div>
    </>
  );
};

export default History;
