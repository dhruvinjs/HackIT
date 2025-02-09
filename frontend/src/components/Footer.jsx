import React from "react";
import { motion } from 'framer-motion';

function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#1F2937] to-[#111827] text-white">
      <div className="container px-6 py-8 mx-auto">
        <div className="flex flex-col items-center text-center">
          <a href="#" className="flex items-center space-x-2 hover:text-blue-500 text-4xl">
            {/* Replace Image with TypingEffect component */}
            HackIT
          </a>

          <p className="max-w-md mx-auto mt-4 text-gray-300">
            Join the community of innovators and build the future. Let’s HackIT!
          </p>

          <div className="flex flex-col mt-4 sm:flex-row sm:items-center sm:justify-center">
            <button className="w-full px-5 py-2 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mx-2 sm:order-2 sm:w-auto hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
              Get started
            </button>
          </div>
        </div>

        <hr className="my-10 border-gray-700" />

        <div className="flex flex-col items-center sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-300">
            © Copyright 2021. All Rights Reserved.
          </p>

          <div className="flex mt-3 -mx-2 sm:mt-0">
            <a
              href="#"
              className="mx-2 text-sm text-gray-300 transition-colors duration-300 hover:text-gray-200"
              aria-label="Teams"
            >
              Teams
            </a>

            <a
              href="#"
              className="mx-2 text-sm text-gray-300 transition-colors duration-300 hover:text-gray-200"
              aria-label="Privacy"
            >
              Privacy
            </a>

            <a
              href="#"
              className="mx-2 text-sm text-gray-300 transition-colors duration-300 hover:text-gray-200"
              aria-label="Cookies"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
