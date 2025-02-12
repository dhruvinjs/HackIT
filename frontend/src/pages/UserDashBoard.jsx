import React from 'react'
import { Footer, Nav ,HackInfoCard, HackathonDetails} from '../components'

function UserDashBoard() {
  return (
    <div>
        <Nav/>
            <div className='flex  '>
                  <div className='flex-1 bg-black  p-5 border-r border-gray-50 h-[90vh] overflow-y-scroll '>
                    <div className='mb-4'>
                    <HackInfoCard/>
                    </div>
                    <div className='mb-4'>
                    <HackInfoCard/>
                    </div>
                    <div className='mb-4'>
                    <HackInfoCard/>
                    </div>
                    <div className='mb-4'>
                    <HackInfoCard/>
                    </div>
                  </div>
                  <div className='flex-3 bg-black h-[90vh] overflow-y-scroll'>
                        <HackathonDetails/>
                  </div>
            </div>
        <Footer/>
    </div>
  )
}

export default UserDashBoard