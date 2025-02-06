import React from 'react'

function Footer() {
    return (
        <footer className="mx-auto w-full relative text-center dark:bg-[#151515] text-white">
            <div className="px-6 py-4 md:py-7 xl:pt-10 xl:pb-6">
                <h2 className="font-bold text-lg xl:text-2xl leading-snug">
                    Ready to get your productivity back?<br />Start your free trial today.
                </h2>
                <a className="mt-5 px-6 py-2 text-lg font-medium leading-tight inline-block bg-blue-800 rounded-full shadow-xl border border-transparent hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-sky-999 focus:ring-sky-500"
                    href="#">Get
                    started</a>
                <div className="mt-10">
                    <nav className="flex flex-wrap justify-center text-lg font-medium">
                        <div className="px-5 py-2"><a href="#">Contact</a></div>
                        <div className="px-5 py-2"><a href="#">Pricing</a></div>
                        <div className="px-5 py-2"><a href="#">Privacy</a></div>
                        <div className="px-5 py-2"><a href="#">Terms</a></div>
                        <div className="px-5 py-2"><a href="#">Hackathons</a></div>
                    </nav>
                    <p className="mt-7 text-base">© 2025 All rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer