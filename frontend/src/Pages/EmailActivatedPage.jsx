import React, { useEffect } from 'react'
import axios from 'axios'
import {Link, useParams} from 'react-router-dom'
import myImage from '../assets/image/email-activated.png'
const EmailActivatedPage = () => {
    const {token} = useParams()
    const activate = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/confirm/${token}`)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    
    }
    useEffect(() => {
        activate()
    },[])
  return (
    <div className='flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 min-h-screen'>
    <div className='max-w-md w-full space-y-8'>
      <div className="flex flex-col items-center">
       
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Your account has been activated.
        </h2>
        
        <img src={myImage} alt="MyImage" /> {/* Add this line */}
        <Link to="/login" className='hover:text-white'>
        <p className='mt-2 text-md font-bold btn btn-outline text-warning border-yellow-800 hover:border-yellow-800 hover:bg-yellow-700 hover:text-white'>
        Log in now.
        </p>
       </Link>

      </div>
    </div>
  </div>
  )
}

export default EmailActivatedPage