import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CarModel } from '../App'

const UserDashboard = () => {
    const navigate = useNavigate()
    let {user} = useContext(CarModel)
  return (
    <div>
        <div className="flex justify-between items-center">
        <div className="flex gap-2">
            <img src={user?.img} alt="userlogo" />
            <p>vitya aka</p>
        </div>
        <div className="">
            <button onClick={()=>navigate('/')} className='p-2 bg-black text-white uppercase'>close</button>
        </div>

        </div>
    </div>
  )
}

export default UserDashboard