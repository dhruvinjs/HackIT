import { motion } from 'framer-motion';
import { useState } from 'react';
import { Nav } from '../components';


const UpdateProfile = () => {




    return (
        <div className=''>
            <Nav />
            <div class="px-4 py-10 sm:px-6 lg:px-8 mx-auto bg-black">
                <div class="bg-white rounded-xl shadow p-4 sm:p-7 dark:bg-[#151515]">
                    <div class="mb-8">
                        <h2 class="text-xl font-bold text-gray-800 dark:text-neutral-200">
                            Profile
                        </h2>
                        <p class="text-sm text-gray-600 dark:text-neutral-400">
                            Manage your name, password and account settings.
                        </p>
                    </div>

                    <form>
                        <div class="grid sm:grid-cols-12 gap-2 sm:gap-6">
                            <div class="sm:col-span-3">
                                <label class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    Profile photo
                                </label>
                            </div>

                            <div class="sm:col-span-9">
                                <div class="flex items-center gap-5">
                                    <img class="inline-block size-16 rounded-full ring-2 ring-white dark:ring-neutral-900" src="https://preline.co/assets/img/160x160/img1.jpg" alt="Avatar" />
                                    <div class="flex gap-x-2">
                                        <div>
                                            <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                                <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" /></svg>
                                                Upload photo
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="fullname" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    Full name
                                </label>
                                <div class="hs-tooltip inline-block">
                                    <svg class="hs-tooltip-toggle ms-1 inline-block size-3 text-gray-400 dark:text-neutral-600" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                    </svg>
                                    <span class="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible w-40 text-center z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-neutral-700" role="tooltip">
                                        Displayed on public forums, such as Preline
                                    </span>
                                </div>
                            </div>

                            <div class="sm:col-span-9">
                                <div class="sm:flex">
                                <input id="fullname" type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Nihal Panday" />
                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="af-account-email" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    Email
                                </label>
                            </div>

                            <div class="sm:col-span-9">
                                <input id="af-account-email" type="email" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="maria@site.com" />
                            </div>

                            <div class="sm:col-span-3">
                                <label for="clg-name" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    College name
                                </label>
                            </div>

                            <div class="sm:col-span-9">
                                <div class="space-y-2">
                                    <input id="clg-name" type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter the College name" />

                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="address" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    Address
                                </label>
                            </div>
                            <div class="sm:col-span-9">
                                <div class="space-y-2">
                                    <input id="address" type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter The Address" />

                                </div>
                            </div>
                            <div class="sm:col-span-3">
                                <label for="github-link" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    Github
                                </label>
                            </div>
                            <div class="sm:col-span-9">
                                <div class="space-y-2">
                                    <input id="github-link" type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter The Github Link" />

                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="linkedin-link" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    LinkedIn
                                </label>
                            </div>
                            <div class="sm:col-span-9">
                                <div class="space-y-2">
                                    <input id="linkedin-link" type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter The LinkedIn Link" />

                                </div>
                            </div>


                            <div class="sm:col-span-3">
                                <label for="twitter" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    Twitter
                                </label>
                            </div>
                            <div class="sm:col-span-9">
                                <div class="space-y-2">
                                    <input id="twitter" type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter  The Twitter Link" />

                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="skills" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    Skills
                                </label>
                            </div>
                            <div class="sm:col-span-9">
                                <div class="space-y-2">
                                    <input id="skills" type="text" class="py-2 px-3 pe-11 block w-full border-gray-200 shadow-sm rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter The Skills" />

                                </div>
                            </div>

                            <div class="sm:col-span-3">
                                <label for="af-account-gender-checkbox" class="inline-block text-sm text-gray-800 mt-2.5 dark:text-neutral-200">
                                    Gender
                                </label>
                            </div>
                            <div class="sm:col-span-9">
                                <div class="sm:flex">
                                    <label for="af-account-gender-checkbox" class="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                                        <input type="radio" name="af-account-gender-checkbox" class="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="af-account-gender-checkbox" checked />
                                        <span class="text-sm text-gray-500 ms-3 dark:text-neutral-400">Male</span>
                                    </label>

                                    <label for="af-account-gender-checkbox-female" class="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                                        <input type="radio" name="af-account-gender-checkbox" class="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="af-account-gender-checkbox-female" />
                                        <span class="text-sm text-gray-500 ms-3 dark:text-neutral-400">Female</span>
                                    </label>

                                    <label for="af-account-gender-checkbox-other" class="flex py-2 px-3 w-full border border-gray-200 shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600">
                                        <input type="radio" name="af-account-gender-checkbox" class="shrink-0 mt-0.5 border-gray-300 rounded-full text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-500 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="af-account-gender-checkbox-other" />
                                        <span class="text-sm text-gray-500 ms-3 dark:text-neutral-400">Other</span>
                                    </label>
                                </div>
                            </div>

                            
                        </div>

                        <div class="mt-5 flex justify-end gap-x-2">
                            <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-50 dark:bg-transparent dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:focus:bg-neutral-800">
                                Cancel
                            </button>
                            <button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none">
                                Save changes
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default UpdateProfile;
