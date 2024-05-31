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
        <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray 900">
              {`Hello ${user?.name}! 👋`}
            </h3>
            <h3 className="text-lg leading-6 font-medium text-gray 900">
              Details and information about you.
            </h3>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">User</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.name}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Email</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.email}
                </dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">
                  Phone Number
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {user?.notelp}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </>
  );
};

export default Diseases;
