import React from 'react'

function Footer() {
    return (
        <footer class="mx-auto w-full relative text-center dark:bg-[#1B1C1D] text-white">
            <div class="px-6 py-8 md:py-14 xl:pt-20 xl:pb-12">
                <h2 class="mt-10 font-bold text-lg xl:text-2xl leading-snug">
                    Ready to get your productivity back?<br />Start your free trial today.
                </h2>
                <a class="mt-5 px-6 py-2 text-lg font-medium leading-tight inline-block bg-blue-800 rounded-full shadow-xl border border-transparent hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-999 focus:ring-sky-500"
                    href="#">Get
                    started</a>
                <div class="mt-10">
                    <nav class="flex flex-wrap justify-center text-lg font-medium">
                        <div class="px-5 py-2"><a href="#">Contact</a></div>
                        <div class="px-5 py-2"><a href="#">Pricing</a></div>
                        <div class="px-5 py-2"><a href="#">Privacy</a></div>
                        <div class="px-5 py-2"><a href="#">Terms</a></div>
                        <div class="px-5 py-2"><a href="#">Hackathons</a></div>
                    </nav>
                    <p class="mt-7 text-base">© 2025 All rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer