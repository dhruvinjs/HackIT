import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore';

function Signup() {

    const {signup , isSigningUp } = useAuthStore();

    const [formData,setFormData] = useState({
        name : "",
        email : "",
        password : ""
    }) 
    function isValidEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    const [error , setError] = useState(null);

    const handleSignup = () => {
        // window.location.href = 'http://localhost:3000/api/auth/google';
        //Signup with google.
      };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(formData.name.length == 0){
            setError("Name is required.")
            return;
        }
        if(formData.email.length == 0){
            setError("Email is required.");
            return ;
        }
        if(!isValidEmail(formData.email)){
            setError("Invalid Email.");
            return;
        }
        if(formData.password.length == 0){
            setError("Password is required.");
            return ;
        }
        if(formData.password.length < 6){
            setError("Password length must be atleast 6.")
            return;
          }
        setError(null);
        await signup(formData);
    }

    return (
        <div className='w-full flex items-center justify-center min-h-screen bg-black'>
            <div className="w-full max-w-sm p-6  bg-white rounded-lg shadow-md dark:bg-[#1B1C1D]">
                <div className="flex justify-center mx-auto">
                <p className='text-3xl font-bold text-white'>Sign Up</p>
                </div>

                <form className="mt-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="fullname" className="block text-sm text-gray-800 dark:text-gray-200">Full Name</label>
                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-black dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setFormData({...formData , name : e.target.value})}/>
                    </div>
                    <div className='mt-6'>
                        <label htmlFor="fullname" className="block text-sm text-gray-800 dark:text-gray-200">Email</label>
                        <input type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-black dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setFormData({...formData,email : e.target.value})} />
                    </div>

                    <div className="mt-6">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm text-gray-800 dark:text-gray-200">Password</label>
                        </div>

                        <input type="password" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:bg-black dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setFormData({...formData,password : e.target.value})} />
                    </div>

                    {error && <div className='mt-4 text-red-500'>{error}</div>}

                    <div className="mt-6">
                        <button className="flex justify-center cursor-pointer w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50" type='submit'>
                            { isSigningUp ? 
                            <div role="status">
                                <svg aria-hidden="true" class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div> :"Sign Up" }
                        </button>
                    </div>
                </form>

                <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

                    <Link to="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
                        or Sign Up with Social Media
                    </Link>

                    <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
                </div>

                <div className="flex items-center mt-6 -mx-2">
                    <button type="button" className="cursor-pointer flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
                        <svg className="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                            <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" onClick={handleSignup}>
                            </path>
                        </svg>

                        <span className="hidden mx-2 sm:inline ">Sign Up with Google</span>
                    </button>

                    
                </div>

                <p className="mt-8 text-xs font-light text-center text-gray-400"> Already Registered ?<Link to="/login" className="font-medium text-gray-700 dark:text-gray-200 hover:underline">Login</Link></p>
            </div>
        </div>
    )
}

export default Signup