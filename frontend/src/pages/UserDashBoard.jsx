import React, { useEffect, useState } from 'react'
import { Footer, Nav, HackInfoCard, HackathonDetails } from '../components'
import { useHostStore } from '../store/useHostStore'




function UserDashBoard() {

  const { getActiveEvents, hackathons } = useHostStore()
  const [data,setData] = useState({})

  useEffect(() => {
    const fetchActiveEvents = async () => {
      console.log("hiii")
      await getActiveEvents()
    }
    fetchActiveEvents()
  }, [])

  const handleClick = (h) => {
    setData(h)
  }

  return (
    <div>
      <Nav />
      <div className='flex  '>
        <div className='flex-1 bg-black  p-5 border-r border-gray-50 h-[90vh] overflow-y-scroll '>
          {hackathons && hackathons.map((h, i) => (
            <div className='mb-4' key={i} onClick={() => handleClick(h)}>
              <HackInfoCard value={h} />
            </div>
          ))}
        </div>
        <div className='flex-3 bg-black h-[90vh] overflow-y-scroll'>
          <HackathonDetails value={data} />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default UserDashBoard