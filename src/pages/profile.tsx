import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { GetUser } from "@/fetch/getUser";
import { useEffect, useRef, useState } from "react";
import { User } from "@/entity/user";
import { getProfpic, setProfpic } from "@/utils/profilepic";
import Image from "next/image";
import { putProfilePict } from "@/fetch/putProfilePict";

const Diseases: React.FC = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isClient, setIsClient] = useState(false);
  const profile_picture = getProfpic();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // You can handle file upload here
      var bodyFormData = new FormData();
      bodyFormData.append("file", file);

      try {
        await putProfilePict(bodyFormData);
        const response = await GetUser();
        setUser(response.data);

        setProfpic("profpic", response.data.picture);

        router.reload();
      } catch (error) {
        console.error("failed to update profpic", error);
      }
    }
  };

  useEffect(() => {
    setIsClient(true);
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
        <div className="bg-white w-3/4 lg:w-1/2 overflow-hidden sm:rounded-lg shadow-lg shadow-purple-200">
          <div className="px-4 py-5 sm:px-6 flex gap-5">
            <button
              className="group relative inline-block"
              onClick={handleButtonClick}
            >
              {isClient && profile_picture && (
                <Image
                  className="rounded-full border-2 border-purple-500 overflow-hidden w-10 h-10"
                  width={35}
                  height={35}
                  src={profile_picture}
                  alt="avatar-logged-in"
                />
              )}
              <div className="absolute rounded-full inset-0 h-10 translate-y-1 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center">
                <span className="text-white text-sm">EDIT</span>
              </div>
            </button>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept="image/*"
            />

            <div>
              <h3 className="text-lg leading-6 font-medium text-gray 900">
                {`Hello ${user?.name}! 👋`}
              </h3>
              <h3 className="text-lg leading-6 font-medium text-gray 900">
                Details and information about you.
              </h3>
            </div>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Username</dt>
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
