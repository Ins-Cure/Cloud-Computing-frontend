import Navbar from "@/components/Navbar";
import { setToken, removeToken } from "@/utils/token";

export default function Home() {
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
    </>
  );
}
