import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/auth";

import { GetHistory } from "@/fetch/getHistory";
import { Prediction } from "@/entity/prediction";

const History = () => {
  let token = withAuth();
  const router = useRouter();

  const [cekHistory, setcekHistory] = useState(false);
  const [history, setHistory] = useState<Prediction[] | null>(null);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    } else {
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
  }, []);

  if (!token) {
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col justify-center items-center gap-10 bg-gray-100 py-10">
        {cekHistory ? (
          history?.map((predict, index) => (
            <div
              key={predict.id}
              className="w-full max-w-lg bg-white shadow-md rounded-lg p-8 mb-4"
            >
              <p className="text-gray-700">
                <span className="font-bold">Prediction:</span>{" "}
                {predict.hasil_prediksi}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Date:</span>{" "}
                {new Date(predict.tgl).toLocaleString()}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">Image ID:</span> {predict.gambar}
              </p>
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
