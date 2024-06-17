import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/auth";
import { Disease } from "@/entity/disease";
import { GetDisease } from "@/fetch/getDisease";
import Image from "next/image";
import Link from "next/link";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: "500",
  subsets: ["latin"],
});

const Diseases: React.FC = () => {
  const [disease, setDisease] = useState<Disease[] | null>(null);

  useEffect(() => {
    GetDisease()
      .then((response) => {
        setDisease(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid lg:grid-cols-2 lg:gap-y-4 lg:gap-x-4 justify-center pt-5 place-items-center px-5 bg-gradient-to-b from-slate-100 to-purple-900">
        {disease?.length != 0 && disease ? (
          disease?.map((d, index) => (
            <div
              key={d.id}
              className={`flex align-middle rounded-xl bg-white text-gray-700 shadow-md flex-col sm:w-full md:w-10/12 md:max-h-full lg:flex-row lg:h-80 ${
                index === 10
                  ? "col-span-2 flex justify-center md:w-5/12 lg:w-1/2 "
                  : "lg:w-full"
              }`}
            >
              <div className="flex justify-center items-center sm:w-full lg:w-2/5 h-full p-5">
                <Image
                  src="/dna.png"
                  alt="disease-img"
                  width={512}
                  height={10}
                  className="rounded-xl w-2/5 lg:w-full"
                />
              </div>

              <div className="w-full lg:w-3/5 p-6 flex flex-col justify-between text-center items-center lg:items-start lg:text-justify">
                <div>
                  <h6
                    className={`${poppins.className} block mb-4 font-sans text-base antialiased leading-relaxed tracking-normal text-gray-700 uppercase`}
                  >
                    Disease {d.id}
                  </h6>
                  <h4
                    className={`${poppins.className} block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-gray-900`}
                  >
                    {d.name}
                  </h4>
                  <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                    {d.headline}
                  </p>
                </div>
                <Link
                  href={`/disease/${d.id}`}
                  className="flex items-center gap-2 px-6 py-3 mt-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                >
                  <h6>Get More Information</h6>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                    className="w-4 h-4"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    ></path>
                  </svg>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <>
            <div>belum ada disis</div>
          </>
        )}
      </div>
    </>
  );
};

export default Diseases;
