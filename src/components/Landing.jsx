import React, { useContext } from 'react'
import partInfo from './../img/partinfo.svg'
import { CarModel } from '../App';

const Landing = () => {


  return (
    <div className='py-[50px] px-6 bg-white dark:bg-dark-bg'>
    <div className="max-w-[1152px] mx-auto border border-gray rounded-lg min-h-[calc(100vh-398px)]">
        <div className="flex flex-col items-center mt-[64px]">
            <img src={partInfo} className='w-[64px] h-[48px] mb-[16px]' alt="ico" />
            <p className='text-darkgray'>Part info will appear here</p>
        </div>
    </div>
</div>
  )
}

export default Landing