// components/Navbar.js
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">Inscure Website</div>
        <div className="flex space-x-4">
          <Link href="/home">
            <p className="text-white hover:text-gray-300">Home</p>
          </Link>
          <Link href="/login">
            <p className="text-white hover:text-gray-300">Login</p>
          </Link>
          <Link href="/register">
            <p className="text-white hover:text-gray-300">Register</p>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
