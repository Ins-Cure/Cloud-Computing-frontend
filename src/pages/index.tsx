import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const { query, pathname, replace } = router;
  const toastShownRef = useRef(false);

  useEffect(() => {
    if (query.login == "success" && !toastShownRef.current) {
      toast.success("Login successful");
      toastShownRef.current = true;
      replace(pathname, undefined, { shallow: true });
    }
  }, [query.login, pathname, replace]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex-grow w-full flex py-16 lg:justify-center items-center lg:py-0 flex-col gap-10 bg-gradient-to-b from-slate-100 to-purple-900">
        <div className="flex flex-col gap-3 h-full justify-center items-center lg:px-40 lg:flex-row">
          <div
            className={`font-bold w-5/6 text-center lg:text-left lg:text-7xl lg:w-fit h-full text-shadow`}
          >
            <h1 className="text-5xl text-white">{`Your Skin's Health,`}</h1>
            <h1 className="text-5xl text-white">{`Predicted with `}</h1>
            <h1 className="text-5xl text-white">{`Precision.`}</h1>
            <div className="flex align-middle gap-5 text-black mt-4 flex-col items-center lg:h-10 lg:items-start lg:flex-row text-base">
              <button
                onClick={() => router.push("/prediciton")}
                className="p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition duration-300 w-1/2 "
              >
                Start to predict !
              </button>
              <button className="p-3 border border-purple-800 text-white rounded-lg hover:bg-purple-300 hover:bg-opacity-10 hover:border-purple-600 transition duration-300 w-1/2">
                <a href="#about-us">About us</a>
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <Image
              src="/hero.png"
              width={750}
              height={750}
              alt="inscure logo"
              className="rounded-full size-5/6 lg:size-max lg:translate-x-10"
            />
          </div>
        </div>
      </div>
      <div
        id="about-us"
        className="flex-grow w-full flex py-16 lg:justify-center items-center flex-col gap-10 bg-gradient-to-b from-purple-900 to-slate-100 text-white"
      >
        <div className="flex flex-col gap-3 lg:gap-10 h-full justify-center items-center lg:px-40 lg:flex-row">
          <div className="lg:w-1/2 flex justify-center">
            <Image
              src="/photographer.png"
              width={512}
              height={512}
              alt="inscure logo"
              className="rounded-full size-5/6 lg:size-max lg:-translate-x-10"
            />
          </div>
          <div
            className={`font-bold w-5/6 text-center lg:text-left lg:text-7xl lg:w-fit h-full`}
          >
            <h1 className="text-5xl text-center max-w-md text-shadow">{`I N S C U R E ?`}</h1>
            <h1 className="text-xl mt-5 text-center font-normal max-w-md text-shadow text-white">
              InsCure is an innovative web application designed to provide
              accurate predictions for skin diseases using advanced machine
              learning models.
            </h1>
            <h1 className="text-xl text-center font-normal max-w-md mt-5 text-shadow text-white">
              With just a simple image upload, users can receive fast and
              reliable predictions about various skin conditions, helping them
              take proactive steps towards their health.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
