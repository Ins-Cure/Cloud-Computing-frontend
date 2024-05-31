// components/Navbar.js
import Link from "next/link";
import { withAuth } from "@/utils/auth";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      const authToken = await withAuth();
      if (!authToken) {
        setToken(null);
      } else {
        setToken(authToken);
      }
    };

    authenticate();
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Inscure Website</div>
        <div className="flex space-x-4">
          <Link href="/home">
            <p className="text-white hover:text-gray-300">Home</p>
          </Link>
          <Link href="/diseases">
            <p className="text-white hover:text-gray-300">Diseases</p>
          </Link>
          <Link href="/prediciton">
            <p className="text-white hover:text-gray-300">Predict</p>
          </Link>
          <Link href="/history">
            <p className="text-white hover:text-gray-300">History</p>
          </Link>
          {token == null ? (
            <>
              <Link href="/login">
                <p className="text-white hover:text-gray-300">Login</p>
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile">
                <p className="text-white hover:text-gray-300">Profile</p>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
