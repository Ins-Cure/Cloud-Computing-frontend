import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { withAuth } from "@/utils/auth";
import { Disease } from "@/entity/disease";
import { GetDisease } from "@/fetch/getDisease";
import Image from "next/image";
import Link from "next/link";

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
      <div className="min-h-screen w-full flex flex-row flex-wrap justify-center gap-10 pt-5 ">
        {disease?.length != 0 && disease ? (
          disease?.map((d) => (
            <div
              key={d.id}
              className="flex align-middle  bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[25git adrem] max-h-[20rem] flex-row"
            >
              <div className="w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
                <Image
                  src="https://img.freepik.com/premium-vector/acne-skin-problems-concept-man-with-magnifying-glass-is-looking-acne-his-facial-falt-vector-cartoon-illustration_77116-1182.jpg?w=900"
                  alt="disease-img"
                />
              </div>
              <div className="p-6 ">
                <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                  Disease: {d.id}
                </h6>
                <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                  {d.name}
                </h4>
                <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  {d.description.slice(0, 50)}
                </p>
                <Link
                  href={`/disease/${d.id}`}
                  className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
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
