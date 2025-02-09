"use client";

import React, { useState } from "react";
import { Menu, X, Github } from "lucide-react";
import { Cpu } from 'lucide-react';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="relative bg-[#0A0F1D] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo with Computer Chip Icon */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <a href="/" className="text-white text-xl font-bold flex items-center">
              {/* Computer Chip Logo */}
              <Cpu size={40} color="#ffffff" />
              HackIT
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
            >
              Features
            </a>
            <a
              href="#hackathons"
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
            >
              Hackathons
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium"
            >
              Contact
            </a>
          </nav>

          {/* Right-side Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="https://github.com/dhruvinjs/HackIt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300"
            >
              <Github size={24} className="text-white" />
            </a>
            <button className="bg-white text-[#0A0F1D] hover:bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium">
              Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#0A0F1D]">
            <a
              href="#features"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
            >
              Features
            </a>
            <a
              href="#hackathons"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
            >
              Hackathons
            </a>
            <a
              href="#pricing"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
            >
              Contact
            </a>
            <a
              href="#demo"
              className="bg-white text-[#0A0F1D] hover:bg-gray-100 block px-3 py-2 rounded-lg text-base font-medium"
            >
              Get a Demo
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
