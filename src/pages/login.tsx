import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import { NextRouter, useRouter } from "next/router";
import { handleSubmit } from "@/fetch/postLogin";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/components/Loading/loading";

const LoginUser = () => {
  const router = useRouter();
  const { query, pathname, replace } = router;
  const toastShownRef = useRef(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (query.logout == "success" && !toastShownRef.current) {
      toast.success("Logout successful");
      toastShownRef.current = true;
      replace(pathname, undefined, { shallow: true });
    } else if (query.register == "success" && !toastShownRef.current) {
      toast.success("Register successful");
      toastShownRef.current = true;
      replace(pathname, undefined, { shallow: true });
    } else if (query.auth == "false" && !toastShownRef.current) {
      toast.error("Please Login First");
      toastShownRef.current = true;
      replace(pathname, undefined, { shallow: true });
    }
  }, [query.logout, pathname, replace]);

  const goToPage = (path: string) => {
    router.push(path);
  };

  const handleFormSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    router: NextRouter
  ) => {
    event.preventDefault();
    setLoading(true);

    handleSubmit(event, router)
      .catch((error) => {
        console.error("Failed to fetch login:", error);
        // Handle error case, possibly redirect to login
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="min-h-screen w-full flex items-center flex-col gap-10 bg-gray-100 p-5">
            <form
              onSubmit={(e) => {
                handleFormSubmit(e, router);
              }}
              className="flex flex-col gap-5 bg-white p-8 rounded-lg shadow-lg shadow-purple-200 w-full max-w-md text-black"
            >
              <h2 className="text-3xl font-bold text-purple-800 pb-5 self-center">
                Login
              </h2>
              <input
                type="email"
                name="email"
                placeholder="Email"
                required
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition duration-300 font-semibold"
              >
                Submit
              </button>
              <div className="flex flex-col gap-2 shadow-lg w-full max-w-md">
                <p className="self-center">
                  Dont Have account ? Please Register
                </p>
                <button
                  type="button"
                  onClick={() => goToPage("/register")}
                  className="p-3 border border-purple-500 text-black rounded-lg hover:bg-purple-100 transition duration-300"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default LoginUser;
