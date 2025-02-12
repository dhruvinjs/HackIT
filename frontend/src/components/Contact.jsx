
import React, { useState } from 'react';

function Contact() {
  return (
    <section className="bg-gradient-to-b from-gray-900 to-gray-800 py-12" id="contact">
      <div className="container mx-auto px-6 lg:px-20">
        <div className="text-center mb-12">
          <p className="text-lg font-medium text-blue-500">Contact Us</p>
          <h1 className="mt-4 text-3xl lg:text-4xl font-semibold text-white">Get in Touch</h1>
          <p className="mt-2 text-gray-300">We’re here to help and answer any question you might have.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-medium text-white">Email</h2>
                <p className="text-gray-300">Our team is here to assist you.</p>
                <p className="text-blue-500">support@example.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#1E2A47] shadow-lg rounded-lg p-8">
            <h2 className="text-xl font-semibold text-white mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-2 w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-[#1E2A47] dark:border-gray-500 dark:text-white"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-2 w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-[#1E2A47] dark:border-gray-500 dark:text-white"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300">
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="mt-2 w-full p-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-[#1E2A47] dark:border-gray-500 dark:text-white"
                  placeholder="Write your message"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 dark:focus:ring-offset-[#1E2A47]"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
