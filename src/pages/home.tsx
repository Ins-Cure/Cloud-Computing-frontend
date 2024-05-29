import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { setToken, removeToken } from "@/utils/token";

export default function Home() {
  const [response, setResp] = useState(true);
  const [responseData, setResponse] = useState("");

  async function postUser() {
    const { data } = await axios.post("http://localhost:8080/inscure/add", {
      name: "rafigajelas",
      email: "tes123bapak455@gmail.com",
      notelp: "081210820128012",
      pass: "baratayuda",
    });
    setResponse(data.data.id);
    setResp(false);
    console.log(data.data);
  }

  function addToken() {
    let add = setToken("token", "hello");
  }

  function rmToken() {
    let add = removeToken();
  }
  const random = Math.random();
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex justify-center items-center flex-col gap-10">
        <h1 className="font-bold text-4xl">Hello Inscure User</h1>
        <p>Please Login first</p>

        <button onClick={addToken}>add</button>
        <button onClick={rmToken}>remove</button>
      </div>

      {/* <button onClick={postUser}>REGISTER</button>
      <br />
      {response ? <p>belum regist</p> : <div>{responseData}</div>}
      <Link href={`/homepage/${responseData}`}>GOTO</Link> */}
    </>
  );
}
