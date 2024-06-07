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
      <div className="min-h-screen w-full grid grid-cols-2 gap-y-4 gap-x-0 justify-center pt-5 place-items-center">
        {disease?.length != 0 && disease ? (
          disease?.map((d) => (
            <div
              key={d.id}
              className={`flex align-middle rounded-xl bg-white text-gray-700 shadow-md flex-row max-w-xl h-80`}
            >
              <Image
                src="https://img.freepik.com/premium-vector/acne-skin-problems-concept-man-with-magnifying-glass-is-looking-acne-his-facial-falt-vector-cartoon-illustration_77116-1182.jpg?w=900"
                alt="disease-img"
                width={250}
                height={250}
                className="rounded-xl object-cover"
              />
              <div className="w-3/4 p-6 flex flex-col justify-between">
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
                  <h6>See more...</h6>
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
