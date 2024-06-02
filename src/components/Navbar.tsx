// components/Navbar.js
import Link from "next/link";
import { withAuth } from "@/utils/auth";
import { useState } from "react";
import { useEffect } from "react";
import { PT_Sans } from "next/font/google";
import Image from "next/image";

const ptSans = PT_Sans({ weight: "400", subsets: ["latin"] });
const ptSansBold = PT_Sans({ weight: "700", subsets: ["latin"] });

const Navbar = () => {
  // let token = withAuth();
  const [token, setToken] = useState(withAuth());

  useEffect(() => {
    setToken(withAuth());
  }, []);

  return (
    // <nav className="bg-gray-800 p-4">
    //   <div className="container mx-auto flex justify-between items-center">
    //     <div className="text-white text-lg font-bold">Inscure Website</div>
    //     <div className="flex space-x-4">
    //       <Link href="/home">
    //         <p className="text-white hover:text-gray-300">Home</p>
    //       </Link>
    //       <Link href="/diseases">
    //         <p className="text-white hover:text-gray-300">Diseases</p>
    //       </Link>
    //       <Link href="/prediciton">
    //         <p className="text-white hover:text-gray-300">Predict</p>
    //       </Link>
    //       <Link href="/history">
    //         <p className="text-white hover:text-gray-300">History</p>
    //       </Link>
    //       {token == null ? (
    //         <>
    //           <Link href="/login">
    //             <p className="text-white hover:text-gray-300">Login</p>
    //           </Link>
    //         </>
    //       ) : (
    //         <>
    //           <Link href="/profile">
    //             <p className="text-white hover:text-gray-300">Profile</p>
    //           </Link>
    //         </>
    //       )}
    //     </div>
    //   </div>
    // </nav>
    <nav className="bg-white border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="http://localhost:3000/home"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src="/inscure.jpg" width={35} height={35} alt="inscure logo" />
          <span
            className={`self-center text-black text-2xl ${ptSansBold.className} font-bold whitespace-nowrap tracking-widest`}
          >
            INSCURE
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-user"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-user"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul
            className={`flex flex-col ${ptSans.className} p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white`}
          >
            <li>
              <Link
                href="/home"
                className={`${ptSans.className} text-black `}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/diseases"
                className={`${ptSans.className} text-black`}
              >
                Diseases
              </Link>
            </li>
            <li>
              <Link
                href="/prediciton"
                className={`${ptSans.className} text-black`}
              >
                Prediction
              </Link>
            </li>
            <li>
              <Link
                href="/history"
                className={`${ptSans.className} text-black`}
              >
                History
              </Link>
            </li>
            {!token ? (
              <li>
                <Link
                  href="/login"
                  className={`${ptSans.className} text-black`}
                >
                  Login
                </Link>
              </li>
            ) : (
              <Link
                href="/profile"
                className={`${ptSans.className} text-black`}
              >
                Profile
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
