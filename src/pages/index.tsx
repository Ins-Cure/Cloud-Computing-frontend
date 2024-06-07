import Navbar from "@/components/Navbar";
import { setToken, removeToken } from "@/utils/token";

export default function Home() {
  const random = Math.random();
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full flex justify-center items-center flex-col gap-10">
        <h1 className="font-bold text-6xl">Hello Inscure User</h1>
      </div>
    </>
  );
}
