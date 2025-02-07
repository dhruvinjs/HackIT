import React from 'react'
import { Navbar, Footer, Hero, Feature, FAQ, Pricing, Contact, Work } from '../components'
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