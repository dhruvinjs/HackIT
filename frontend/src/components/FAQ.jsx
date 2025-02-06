import React from 'react'

function FAQ() {
    return (
        <div>
            <div className="w-full px-4 py-10 sm:px-6 lg:px-40 lg:py-14 mx-auto bg-black">
                <div className="grid md:grid-cols-5 gap-10">
                    <div className="md:col-span-2">
                        <div className="max-w-xs">
                            <h2 className="text-3xl font-bold md:text-4xl md:leading-tight dark:text-white">Frequently<br />asked questions</h2>
                            <p className="mt-1 hidden md:block text-gray-600 dark:text-neutral-400">Answers to the most frequently asked questions.</p>
                        </div>
                    </div>

                    <div className="md:col-span-3">
                        <div className="hs-accordion-group divide-y divide-gray-200 dark:divide-neutral-700">
                            <div className="hs-accordion pb-3 active" id="hs-basic-with-title-and-arrow-stretched-heading-one">
                                <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-xl font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" aria-expanded="true" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-one">
                                    How do I create a new hackathon event?
                                    <svg className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    <svg className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                </button>
                                <div id="hs-basic-with-title-and-arrow-stretched-collapse-one" className="hs-accordion-content w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-one">
                                    <p className="text-gray-600 dark:text-neutral-400">
                                        Go to your organizer dashboard, click "Create Hackathon," and fill in event details like name, date, rules, and registration info. Once done, publish it and manage participants from your dashboard.
                                    </p>
                                </div>
                            </div>

                            <div className="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-two">
                                <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-xl font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-two">
                                    What payment methods do you accept?
                                    <svg className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    <svg className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                </button>
                                <div id="hs-basic-with-title-and-arrow-stretched-collapse-two" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-two">
                                    <p className="text-gray-600 dark:text-neutral-400">
                                        We accept Credit/Debit Cards, UPI, Net Banking, PayPal, and digital wallets like Google Pay and PhonePe. For international payments, PayPal is available.                                    </p>
                                </div>
                            </div>

                            <div className="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-three">
                                <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-xl font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-three">
                                    Can I customize the judging criteria?
                                    <svg className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    <svg className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                </button>
                                <div id="hs-basic-with-title-and-arrow-stretched-collapse-three" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-three">
                                    <p className="text-gray-600 dark:text-neutral-400">
                                        Yes! Organizers can set custom judging criteria, including parameters like innovation, feasibility, and technical implementation. You can define weights for each criterion in the event settings</p>
                                </div>
                            </div>

                            <div className="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-four">
                                <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-xl font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-four">
                                    Is there a limit to the number of participants?

                                    <svg className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    <svg className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                </button>
                                <div id="hs-basic-with-title-and-arrow-stretched-collapse-four" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-four">
                                    <p className="text-gray-600 dark:text-neutral-400">
                                        It depends on the organizer! Organizers can set a participant limit, but if no limit is specified, anyone can join.
                                    </p>
                                </div>
                            </div>

                            <div className="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-five">
                                <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-xl font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-five">
                                    How can participants communicate with organizers?
                                    <svg className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    <svg className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                </button>
                                <div id="hs-basic-with-title-and-arrow-stretched-collapse-five" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-five">
                                    <p className="text-gray-600 dark:text-neutral-400">
                                        Participants can contact organizers through the event dashboard via chat, email, or discussion forums. Organizers may also set up a Discord or Slack channel for communication.
                                    </p>
                                </div>
                            </div>

                            <div className="hs-accordion pt-6 pb-3" id="hs-basic-with-title-and-arrow-stretched-heading-six">
                                <button className="hs-accordion-toggle group pb-3 inline-flex items-center justify-between gap-x-3 w-full md:text-xl font-semibold text-start text-gray-800 rounded-lg transition hover:text-gray-500 focus:outline-none focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-400 dark:focus:text-neutral-400" aria-expanded="false" aria-controls="hs-basic-with-title-and-arrow-stretched-collapse-six">
                                    Can I edit hackathon details after publishing?
                                    <svg className="hs-accordion-active:hidden block shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                    <svg className="hs-accordion-active:block hidden shrink-0 size-5 text-gray-600 group-hover:text-gray-500 dark:text-neutral-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6" /></svg>
                                </button>
                                <div id="hs-basic-with-title-and-arrow-stretched-collapse-six" className="hs-accordion-content hidden w-full overflow-hidden transition-[height] duration-300" role="region" aria-labelledby="hs-basic-with-title-and-arrow-stretched-heading-six">
                                    <p className="text-gray-600 dark:text-neutral-400">
                                        Yes, organizers can update event details like description, rules, or deadlines from the dashboard. However, major changes might require notifying registered participants.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ;
