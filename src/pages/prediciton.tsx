import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/auth";
import { GetUser } from "@/fetch/getUser";
import { User } from "@/entity/user";
import { handleSubmit } from "@/fetch/postPredict";
import { Prediction } from "@/entity/prediction";

const Diseases = () => {
  let token = withAuth();
  const router = useRouter();

  const [cekUser, setcekUser] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cekPredict, setcekPredict] = useState(false);
  const [Predict, setPredict] = useState<Prediction | null>(null);

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
  }, []);

  // Check if the user is authenticated
  if (!token) {
    return null;
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSubmit(event)
      .then((response) => {
        setPredict(response);
        setcekPredict(true);
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        // Handle error case, possibly redirect to login
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col justify-center items-center gap-10 bg-gray-100 py-10">
        {cekUser ? (
          user ? (
            <>
              <h1 className="font-bold text-4xl text-gray-800">
                Hello {user.name}, This is the Prediction Page
              </h1>
              <form
                className="w-full max-w-lg bg-white shadow-md rounded-lg p-8"
                onSubmit={handleFormSubmit}
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fileInput"
                  >
                    Upload file for prediction
                  </label>
                  <input
                    id="fileInput"
                    name="fileInput"
                    type="file"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Predict
                </button>
              </form>
            </>
          ) : (
            <p className="text-red-500">Failed to load user data</p>
          )
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}

        {cekPredict ? (
          Predict ? (
            <>
              <div className="mt-8 w-full max-w-lg bg-white shadow-md rounded-lg p-8">
                <h2 className="font-bold text-2xl text-gray-800 mb-4">
                  Prediction Result
                </h2>
                <p className="text-gray-700">
                  <span className="font-bold">Prediction:</span>{" "}
                  {Predict?.hasil_prediksi}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Date:</span> {Predict?.tgl}
                </p>
              </div>
            </>
          ) : (
            <>
              <p className="text-red-500">Failed to load prediction data</p>
            </>
          )
        ) : (
          <div className="mt-8 w-full max-w-lg bg-white shadow-md rounded-lg p-8">
            <h2 className="font-bold text-2xl text-gray-800 mb-4">
              No Prediction Made Yet
            </h2>
            <p className="text-gray-700">
              Please make a prediction using the form above.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Diseases;
