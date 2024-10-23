import React from 'react'
// import img from '../../assets/check-email.png'
import img from '../assets/image/check-email.png'
const EmailActivationPage = () => {
  return (
    <div className='flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 min-h-screen'>
    <div className='max-w-md w-full space-y-8'>
      <div>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Check your email
        </h2>
        <p className='mt-2 text-center text-sm text-gray-600'>
          We've sent an activation link to your email address.
        </p>
        <img src={img} alt="check-email" />
      </div>
    </div>
  </div>
  )
}

export default EmailActivationPage