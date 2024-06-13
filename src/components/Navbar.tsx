// components/Navbar.js
import Link from "next/link";
import { getToken, removeToken } from "@/utils/token";
import { useState } from "react";
import { useEffect } from "react";
import { PT_Sans } from "next/font/google";
import Image from "next/image";
import { FiMenu } from "react-icons/fi";
import { FaHistory } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { RiMenuUnfold4Fill } from "react-icons/ri";
import { GetUser } from "@/fetch/getUser";
import { User } from "@/entity/user";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { getProfpic, removeProfpic } from "@/utils/profilepic";

const ptSans = PT_Sans({ weight: "400", subsets: ["latin"] });
const ptSansBold = PT_Sans({ weight: "700", subsets: ["latin"] });

const Navbar = () => {
  // let token = withAuth();
  const [token, setToken] = useState<string | null>(null);
  const [isSideMenuOpen, setisSideMenuOpen] = useState(false);
  const [role, setRole] = useState("");
  const router = useRouter();

  const navLinks = [
    { label: "HOME", href: "/" },
    { label: "DISEASES", href: "/diseases" },
    { label: "PREDICTION", href: "/prediciton" },
    { label: "CONSULTATION", href: "/consultation" },
  ];

  const navLinksDoctor = [
    { label: "HOME", href: "/" },
    { label: "DISEASES", href: "/diseases" },
    { label: "CONSULTATION", href: "/consultation" },
  ];

  function handleLogout() {
    removeToken();
    removeProfpic();
    router.push({
      pathname: "/login",
      query: { logout: "success" },
    });
    // router.reload();
  }

  useEffect(() => {
    setToken(getToken());
  }, [token]);

  const profile_picture = getProfpic();

  return (
    <>
      <nav
        className={` h-1/5 flex justify-between items-center px-8 py-9 bg-white text-black w-auto lg:px-24`}
      >
        <div className="flex items-center gap-8 text-black">
          <section className="flex items-center gap-4">
            {/* menu */}
            {/* logo */}
            <FiMenu
              size={25}
              className="cursor-pointer lg:hidden"
              onClick={() => setisSideMenuOpen(true)}
            />
            <Link
              href="http://localhost:3000/"
              className={`${ptSansBold.className} flex items-center tracking-widest text-2xl`}
            >
              INSCURE
            </Link>
            <Image
              src="/inscure.jpg"
              width={35}
              height={35}
              alt="inscure logo"
              className="rounded-full"
            />
          </section>
          {navLinks.map((link, index) => (
            <Link
              key={index}
              className="hidden lg:block font-bold text-sm text-black hover:text-[#9AC8CD] duration-500 tracking-wide"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* mobile menu sidebar */}
        <div
          className={`fixed h-full w-screen lg:hidden bg-black/50 backdrop-blur-sm top-0 right-0 transition-all ${
            isSideMenuOpen ? "-translate-x-0" : "translate-x-full"
          }`}
        >
          <section className="text-black bg-white flex-col absolute left-0 top-0 h-screen p-8 gap-8 z-50 w-56 flex">
            <RiMenuUnfold4Fill
              className="mt-0 mb-8 text-3xl cursor-pointer"
              onClick={() => setisSideMenuOpen(false)}
            />
            {navLinks.map((link, index) => (
              <Link
                key={index}
                className="font-bold text-black"
                href={link.href}
              >
                {link.label}
              </Link>
            ))}
          </section>
        </div>

        <section className="flex items-center gap-4">
          {/* history icon */}
          <Link href="/history" passHref>
            <div className="flex items-center gap-4 group">
              <div className="hidden absolute font-bold tracking-widesttransform -translate-x-4 opacity-0 transition-all duration-300 ease-in-out group-hover:block group-hover:opacity-100 group-hover:-translate-x-28 bg-gray-100 rounded-full px-4 py-1">
                HISTORY
              </div>
              <FaHistory size={20} />
            </div>
          </Link>
          {!token ? (
            <Link href="/login">
              <RxAvatar size={25} />
            </Link>
          ) : (
            <div className="group">
              <Link href="/profile">
                <div>
                  {profile_picture && (
                    <Image
                      className="rounded-full border-2 border-purple-500 overflow-hidden w-10 h-10"
                      width={35}
                      height={35}
                      src={profile_picture}
                      alt="avatar-logged-in"
                    />
                  )}
                </div>
              </Link>
              <div className="flex flex-col gap-2 right-5 lg:right-20 absolute mt-2 w-max rounded-lg bg-gray-100 px-5 py-1 transition-all duration-300 ease-in-out opacity-0 transform translate-y-2 z-10 group-hover:flex-col group-hover:opacity-100 group-hover:translate-y-0">
                <Link href="/profile" className=" hover:text-[#9AC8CD]">
                  Profile
                </Link>
                <button onClick={handleLogout} className="hover:text-[#9AC8CD]">
                  Logout
                </button>
              </div>
            </div>
          )}
          {/* // <Link href="/profile">
          //   <RxAvatar size={25} />
          // </Link> */}
        </section>
      </nav>
      <hr className="mx-24 lg:mx-24" />
    </>

    // <nav className="bg-white border-gray-200">
    //   <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    //     <Link
    //       href="http://localhost:3000/"
    //       className="flex items-center space-x-3 rtl:space-x-reverse"
    //     >
    //       <Image src="/inscure.jpg" width={35} height={35} alt="inscure logo" />
    //       <span
    //         className={`self-center text-black text-2xl ${ptSansBold.className} font-bold whitespace-nowrap tracking-widest`}
    //       >
    //         INSCURE
    //       </span>
    //     </Link>
    //     <button
    //       data-collapse-toggle="navbar-user"
    //       type="button"
    //       className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    //       aria-controls="navbar-user"
    //       aria-expanded="false"
    //     >
    //       <span className="sr-only">Open main menu</span>
    //       <svg
    //         className="w-5 h-5"
    //         aria-hidden="true"
    //         xmlns="http://www.w3.org/2000/svg"
    //         fill="none"
    //         viewBox="0 0 17 14"
    //       >
    //         <path
    //           stroke="currentColor"
    //           stroke-linecap="round"
    //           stroke-linejoin="round"
    //           stroke-width="2"
    //           d="M1 1h15M1 7h15M1 13h15"
    //         />
    //       </svg>
    //     </button>
    //     <div
    //       className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
    //       id="navbar-user"
    //     >
    //       <ul
    //         className={`flex flex-col ${ptSans.className} p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white`}
    //       >
    //         <li>
    //           <Link
    //             href="/"
    //             className={`${ptSans.className} text-black `}
    //             aria-current="page"
    //           >
    //             Home
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             href="/diseases"
    //             className={`${ptSans.className} text-black`}
    //           >
    //             Diseases
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             href="/prediciton"
    //             className={`${ptSans.className} text-black`}
    //           >
    //             Prediction
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             href="/history"
    //             className={`${ptSans.className} text-black`}
    //           >
    //             History
    //           </Link>
    //         </li>
    //         <li>
    //           <Link
    //             href="/historychat"
    //             className={`${ptSans.className} text-black`}
    //           >
    //             Chat
    //           </Link>
    //         </li>
    //         {!token ? (
    //           <li>
    //             <Link
    //               href="/login"
    //               className={`${ptSans.className} text-black`}
    //             >
    //               Login
    //             </Link>
    //           </li>
    //         ) : (
    //           <Link
    //             href="/profile"
    //             className={`${ptSans.className} text-black`}
    //           >
    //             Profile
    //           </Link>
    //         )}
    //       </ul>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;
