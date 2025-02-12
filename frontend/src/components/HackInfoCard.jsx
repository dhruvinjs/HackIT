import React from 'react'
import { motion } from 'framer-motion';


function HackInfoCard() {
    return (
        <motion.div
            className="bg-white dark:bg-[#151515] rounded-xl p-6 w-full  shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="flex gap-6">
                <div className="flex">
                    <img
                        src="https://placehold.co/100x100"
                        alt="TechCorp Logo"
                        className="w-15 h-15 rounded-lg object-cover"
                    />
                </div>

                <div className="flex-grow">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        AI Innovation Hack 2025
                    </h2>

                    <div className="flex items-center mb-3">
                        <span className="text-gray-600 dark:text-gray-400 text-sm mr-2">Organized by:</span>
                        <span className="font-semibold text-gray-800 dark:text-gray-200">TechCorp Solutions</span>
                    </div>

                    <div className="flex gap-6 mb-4">
                        <div className="bg-blue-100 dark:bg-blue-900 px-4 py-2 rounded-lg">
                            <span className="text-blue-600 dark:text-blue-300 font-bold text-xl">12</span>
                            <span className="text-blue-600 dark:text-blue-300 text-sm ml-1">days left</span>
                        </div>

                        <div className="bg-green-50 dark:bg-green-900 px-4  py-2 rounded-lg">
                            <div className="text-green-800 dark:text-green-300 text-sm">Prize Pool</div>
                            <div className="text-green-600 dark:text-green-200 font-bold text-lg">$25,000</div>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <motion.span
                            whileHover={{ scale: 1.1 }}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                            #AI
                        </motion.span>
                        <motion.span
                            whileHover={{ scale: 1.1 }}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                            #Innovation
                        </motion.span>
                        
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default HackInfoCard