import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Feature from '../components/Feature'
import FAQ from '../components/FAQ'
import Pricing from '../components/Pricing'
import Contact from '../components/Contact'
import Work from '../components/Work'

function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Feature />
      <Work/>
      <Pricing/>
      <FAQ/>
      <Contact/>
      <Footer />
    </div>
  )
}

export default Home