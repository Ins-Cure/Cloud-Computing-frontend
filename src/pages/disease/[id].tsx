import React from "react";
import { Disease } from "@/entity/disease";
import { GetDiseasebyId } from "@/fetch/getDiseasebyID";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Poppins } from "next/font/google";
import Image from "next/image";

const montsLight = Poppins({ weight: "200", subsets: ["latin"] });
const monts = Poppins({ weight: "400", subsets: ["latin"] });
const montsBold = Poppins({ weight: "600", subsets: ["latin"] });

export default function DetailDisease() {
  const [Disease, setDisease] = useState<Disease | null>(null);
  const router = useRouter();
  const { id } = router.query;
  let numId: number;

  const staticImages = [
    {
      id: 1,
      href: "https://drive.google.com/uc?export=view&id=1w33SBrKnP0VhtGN4WBWKzqK4BbppO2uN",
    },
    {
      id: 2,
      href: "https://drive.google.com/uc?export=view&id=126SMWAO500yQt3xGbCv2S5W3ht5j-VYZ",
    },
    {
      id: 3,
      href: "https://drive.google.com/uc?export=view&id=1f-jbFWq87NoqUG5Nqe39H_OeEWcQoBIR",
    },
    {
      id: 4,
      href: "https://drive.google.com/uc?export=view&id=1FyJvpW2R0i3L-VWrCDzzD_RkCGWw3iP3",
    },
    {
      id: 5,
      href: "https://drive.google.com/uc?export=view&id=1kHe1t0LIUV5nHPCEFPgvlmwlvrAOEWM_",
    },
    {
      id: 6,
      href: "https://drive.google.com/uc?export=view&id=1gHRNBSMyPxP71B0uOr-SwIfqcU1ynxhO",
    },
    {
      id: 7,
      href: "https://drive.google.com/uc?export=view&id=1uatSO8mfqc5bCLFdmDwEDXH5T-V2hB-U",
    },
    {
      id: 8,
      href: "https://drive.google.com/uc?export=view&id=1KHv81eaHnlwMHuwcqW3y9zPQTIjkLOwD",
    },
    {
      id: 9,
      href: "https://drive.google.com/uc?export=view&id=1wQ7SaYm7krcCdpNF_U1Si33XumTlNYgS",
    },
    {
      id: 10,
      href: "https://drive.google.com/uc?export=view&id=1yUd3RFTWJVkuW8cAAEYpt3vwLLNSqs29",
    },
    {
      id: 11,
      href: "https://drive.google.com/uc?export=view&id=1Bnr-UbqEoRgeRF50m2S28Z-ZeXjLoH4n",
    },
  ];

  let currHref;
  if (id != undefined) {
    numId = +id;
    currHref = staticImages.at(numId - 1)?.href;
  }

  // console.log(currHref);

  useEffect(() => {
    GetDiseasebyId(numId)
      .then((response) => {
        setDisease(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex align-middle justify-center bg-gradient-to-b from-slate-100 to-purple-900">
        <div className="min-h-screen bg-white w-4/5 lg:w-1/2 px-6 py-6">
          <div className="flex flex-col gap-3">
            <h1 className={`${montsBold.className} text-4xl text-black`}>
              {Disease?.name}
            </h1>
            <h1 className={`${montsLight.className} text-xl text-black`}>
              {Disease?.headline}
            </h1>
            <hr className="h-px my-3 bg-gray-200 border-0 dark:bg-gray-700"></hr>
          </div>
          <div className="flex flex-col gap-3">
            {currHref && (
              <div className="flex items-center flex-col">
                <Image
                  src={currHref}
                  alt="disease-img"
                  width={500}
                  height={300}
                />
              </div>
            )}
            <h1 className={`${monts.className} text-xl text-black`}>
              {Disease?.description}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
