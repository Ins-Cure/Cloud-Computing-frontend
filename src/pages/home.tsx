import axios from "axios";
import Link from "next/link";
import { useState } from "react";

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

  const random = Math.random();
  return (
    <>
      <h1>Ini home.</h1>
      <button onClick={postUser}>REGISTER</button>
      <br />
      {response ? <p>belum regist</p> : <div>{responseData}</div>}
      <Link href={`/homepage/${responseData}`}>GOTO</Link>
    </>
  );
}
