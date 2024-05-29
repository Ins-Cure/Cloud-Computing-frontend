import { useRouter } from "next/router";
import * as React from "react";
import Head from "next/head";

export default function Profile() {
  const { id } = useRouter().query;
  return (
    <>
      <Head>
        <title>Tset RafiS</title>
      </Head>
      <div className="min-h-screen w-full overflow-x-hidden">
        ini: {id}
        <h1 className="flex-auto text-lg font-semibold text-slate-900">
          Hello World!
        </h1>
        <main className="">React.ReactNode</main>
      </div>
    </>
  );
}
