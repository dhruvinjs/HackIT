import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border-b md:border text-white border-gray-100 bg-[#0e1111] py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
      <div className="px-4">
        <div className="flex items-center justify-between">
          <div className="flex shrink-0">
            <Link aria-current="page" className="flex items-center" to="/">
              <p className=" text-white text-2xl font-bold">HACKIT</p>
            </Link>
          </div>
          <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
            <a
              aria-current="page"
              className="inline-block rounded-lg px-2 py-1 text-lg font-medium text-white transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#"
            >
              Features
            </a>
            <a
              className="inline-block rounded-lg px-2 py-1 text-lg font-medium text-white transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#"
            >
              Hackathons
            </a>
            <a
              className="inline-block rounded-lg px-2 py-1 text-lg font-medium text-white transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#"
            >
              Pricing
            </a>
            <a
              className="inline-block rounded-lg px-2 py-1 text-lg font-medium text-white transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
              href="#"
            >
              Contact
            </a>
          </div>
          <div className="flex items-center justify-end gap-3">
            <Link
              className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
              to="/signup"
            >
              Sign Up
            </Link>
            <Link
              className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 focus:visible:outline focus:visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
