import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/auth";
import { GetUser } from "@/fetch/getUser";
import { User } from "@/entity/user";
import { handleSubmit } from "@/fetch/postPredict";
import { Prediction } from "@/entity/prediction";
import Loading from "@/components/Loading/loading";

const Predictions = () => {
  const [token, setToken] = useState<string | null>(null);

  const router = useRouter();

  const [cekUser, setcekUser] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [cekPredict, setcekPredict] = useState(false);
  const [Predict, setPredict] = useState<Prediction | null>(null);
  const [isLoading, setLoading] = useState(false);

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      const authToken = await withAuth();
      if (!authToken) {
        router.push("/login");
      } else {
        setToken(authToken);

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
    };

    authenticate();
  }, []);

  // Check if the user is authenticated
  if (!token) {
    return null;
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setcekPredict(true);

    handleSubmit(event)
      .then((response) => {
        setPredict(response);
        return response;
      })
      .catch((error) => {
        console.error("Failed to fetch user data:", error);
        // Handle error case, possibly redirect to login
      })
      .finally(() => setLoading(false));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col justify-center items-center gap-10 bg-gray-100 py-10">
        {cekUser ? (
          user ? (
            <>
              <h1 className="font-bold text-4xl text-gray-800 text-center">
                Hello {user.name}, This is the Prediction Page
              </h1>
              <form
                className="w-full max-w-lg bg-white shadow-md rounded-lg p-8 shadow-purple-200"
                onSubmit={handleFormSubmit}
              >
                <div className="mb-4">
                  <label
                    className="block text-purple-700 text-sm font-bold mb-2"
                    htmlFor="fileInput"
                  >
                    Upload file for prediction
                  </label>
                  <input
                    id="fileInput"
                    name="fileInput"
                    type="file"
                    required
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-purple-200 rounded-md text-purple-600"
                  />
                </div>
                {selectedImage && (
                  <div className="mb-4">
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
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
          isLoading ? (
            <Loading />
          ) : Predict ? (
            <>
              <div className="mt-8 w-full max-w-lg bg-white shadow-md rounded-lg overflow-hidden">
                <div className="w-full h-full p-8">
                  <h2 className="font-bold text-2xl text-purple-800 mb-4">
                    Prediction Result
                  </h2>

                  <p className="text-purple-600 mb-2">
                    <span className="font-bold">Prediction:</span>{" "}
                    {Predict?.hasil_prediksi}
                  </p>
                  <p className="text-purple-600 mb-2">
                    <span className="font-bold">Date:</span> {Predict?.tgl}
                  </p>
                </div>

                <div className="bg-gray-800 w-full h-full px-8 pb-8 pt-4 flex flex-col">
                  <h2 className="font-bold text-2xl text-purple-600 self-center">
                    Want to know More ?
                  </h2>
                  <button
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
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4 mb-4 transition-colors duration-300 ease-in-out"
                  >
                    Consult
                  </button>
                  <button
                    onClick={() =>
                      console.log("ke halaman diseases", Predict.disease_id)
                    }
                    className="w-full border border-purple-500 hover:text-white text-purple-500 py-2 px-4 rounded transition-colors duration-300 ease-in-out"
                  >
                    Learn More About This Disease
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-red-500 font-bold">
                Failed to load prediction data
              </p>
            </>
          )
        ) : (
          <>
            <div className="mt-8 w-full max-w-lg bg-white shadow-md rounded-lg p-8 shadow-purple-200">
              <h2 className="font-bold text-2xl text-purple-800 mb-4">
                No Prediction Made Yet
              </h2>
              <p className="text-purple-700">
                Please make a prediction using the form above.
              </p>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Predictions;
