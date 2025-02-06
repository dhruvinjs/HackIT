import React, { useState } from 'react'

function Signup() {

    const [formData,setFormData] = useState({
        name : "",
        email : "",
        password : ""
    }) 

    return (
        <div className='w-full flex items-center justify-center min-h-screen bg-black'>
            <div class="w-full max-w-sm p-6  bg-white rounded-lg shadow-md dark:bg-[#1B1C1D]">
                <div class="flex justify-center mx-auto">
                <p className='text-3xl font-bold text-white'>Sign Up</p>
                </div>

                <form class="mt-6">
                    <div>
                        <label for="fullname" class="block text-sm text-gray-800 dark:text-gray-200">Full Name</label>
                        <input type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-black dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setFormData({...formData , name : e.target.value})}/>
                    </div>
                    <div className='mt-6'>
                        <label for="fullname" class="block text-sm text-gray-800 dark:text-gray-200">Email</label>
                        <input type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-black dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setFormData({...formData,email : e.target.value})} />
                    </div>

                    <div class="mt-6">
                        <div class="flex items-center justify-between">
                            <label for="password" class="block text-sm text-gray-800 dark:text-gray-200">Password</label>
                        </div>

                        <input type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-black dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setFormData({...formData,password : e.target.value})} />
                    </div>

                    <div class="mt-6">
                        <button class="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                            Sign Up
                        </button>
                    </div>
                </form>

                <div class="flex items-center justify-between mt-4">
                    <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                    <a href="#" class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                        or Sign Up with Social Media
                    </a>

                    <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                </div>

                <div class="flex items-center mt-6 -mx-2">
                    <button type="button" class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                        <svg class="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
                            </path>
                        </svg>

                        <span class="hidden mx-2 sm:inline">Sign Up with Google</span>
                    </button>

                    
                </div>

                <p class="mt-8 text-xs font-light text-center text-gray-400"> Already Registered ?<a href="#" class="font-medium text-gray-700 dark:text-gray-200 hover:underline">Login</a></p>
            </div>
        </div>
    )
}

export default Signup