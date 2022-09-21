import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="bg-gray-200 dark:bg-gray-900 h-screen flex items-center justify-center">
      <header className="p-5 w-[300px]">
        <Link
          to="/signup"
          className=" block text-gray-900 hover:text-gray-50 dark:text-gray-50 text-xl font-semibold my-2 border border-gray-300 w-full rounded-md text-center py-2 hover:bg-gray-500 hover:border-gray-500 transition-all"
        >
          Signup
        </Link>
        <Link
          to="/login"
          className=" block text-gray-900 hover:text-gray-50 dark:text-gray-50 text-xl font-semibold my-2 border border-gray-300 w-full rounded-md text-center py-2 hover:bg-gray-500 hover:border-gray-500 transition-all "
        >
          Login
        </Link>
        <span className="block my-3 text-center text-[#aaaaaa] select-none pointer-events-none">
          or
        </span>
        <button className="cursor-pointer block text-gray-50 text-lg font-semibold mt-4 w-full rounded-md text-center py-2 bg-blue-500 hover:bg-blue-600 transition-all ">
          Login with google
        </button>
      </header>
    </div>
  );
}

export default Home;
