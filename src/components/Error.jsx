import React from 'react'
import error from '../img/error.svg'

const Error = () => {
  return (
    <div className='py-[50px] px-6'>
    <div className="max-w-[1152px] mx-auto border border-gray rounded-lg min-h-[calc(100vh-398px)]">
        <div className="flex flex-col items-center mt-[64px]">
            <img src={error} className='w-[64px] h-[52px] mb-[16px]' alt="ico" />
            <p className='text-black mb-[48px] text-[21px]'>Cant get info about the part</p>
            <p className='font-bold'>Please make sure:</p>
            <p className=''>1. Your United States VPN is turned on (If you actually located in US you don’t need it).</p>
            <p>2. You have <a className='text-blue cursor-pointer' href="https://chromewebstore.google.com/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc" target='blank'>CORS  browser extension</a> installed and it’s working now.</p>
        </div>
    </div>
</div>
  )
}

export default Error