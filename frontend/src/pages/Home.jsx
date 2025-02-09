import React from 'react'
import { Navbar, Footer, Hero, Feature, Pricing, Contact, Work, SampleAcc } from '../components'
function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      {/* <SampleFeatures /> */}
      <Work/>
      <Pricing/>
      <SampleAcc/>
      <Contact/>
      <Footer />
    </div>
  )
}

export default Home