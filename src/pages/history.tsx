import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/auth";
import { MdDelete } from "react-icons/md";

import { GetHistory } from "@/fetch/getHistory";
import { Prediction } from "@/entity/prediction";
import { deletePredictionbyID } from "@/fetch/deletePredictionbyId";

const History = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const [cekHistory, setcekHistory] = useState(false);
  const [history, setHistory] = useState<Prediction[] | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      const authToken = await withAuth();
      if (!authToken) {
        router.push("/login");
      } else {
        setToken(authToken);
        GetHistory()
          .then((response) => {
            setHistory(response.data);
            console.log(response.data);
            if (response.data && response.data.length > 0) {
              setcekHistory(true);
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
      <div className="min-h-screen w-full flex flex-col justify-center items-center gap-10 bg-gray-100 py-10">
        {cekHistory ? (
          history?.map((predict) => (
            <div
              key={predict.id}
              className="relative w-full max-w-lg bg-white shadow-md rounded-lg p-6 mb-4 shadow-purple-300"
            >
              <button
                onClick={() =>
                  deletePredictionbyID(predict.id, predict.gambar).then(() =>
                    router.reload()
                  )
                }
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                <MdDelete className="size-7" />
              </button>
              <p className="text-gray-700">
                <span className="font-bold">Prediction:</span>{" "}
                {predict.hasil_prediksi}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Date:</span>{" "}
                {new Date(predict.tgl).toLocaleString()}
              </p>
              <div className="text-gray-700 mb-4">
                <span className="font-bold">Image:</span>
                <div className="w-full h-64 mt-2">
                  <img
                    src={`${predict.gambar}`}
                    alt="Prediction image"
                    className="w-full h-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-red-500">
            You have not made any predictions yet.
          </h1>
        )}
      </div>
    </>
  );
};

export default History;
