"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Cpu } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()

    const handleHackathon = () => {
        navigate("/create")
    }

    return (
        <div className="relative bg-[#151515] sticky top-0  z-50">
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

                    <div className="flex items-center gap-4">

                        <button
                            onClick={handleHackathon}
                            className="px-6 py-2 rounded-lg bg-blue-500 text-white"
                        >
                            Host
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-300 hover:text-white p-2"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <div className="flex items-center space-x-2">
                                <p>Nihal</p>
                                <img
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full"
                                />
                            </div>}
                        </button>
                    </div>




                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen &&
                <div className="absolute  top-0 right-0 z-90">
                    <Sidebar value={{ isMenuOpen, setIsMenuOpen }} />
                </div>
            }
        </div>
    );
};

export default Nav;
