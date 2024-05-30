import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { GetUser } from "@/fetch/getUser";
import { useEffect, useState } from "react";
import { User } from "@/entity/user";

const Diseases: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    GetUser()
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-white text-black min-h-screen w-full flex justify-center items-center flex-col gap-10">
        <h1 className="font-bold text-4xl">Hello, This is the profile page</h1>
        <h2 className="font-bold text-xl">{user?.name}</h2>
      </div>
    </>
  );
};

export default Diseases;
