import React from 'react'
import { Navbar, Footer, Hero, Feature, FAQ, Pricing, Contact, Work, SampleAcc } from '../components'
function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Feature />
      <Work/>
      <Pricing/>
      <SampleAcc/>
      <Contact/>
      <Footer />
    </div>
  )
}

export default Home