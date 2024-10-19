import React from 'react'
import myImage from './assets/image/404.jpg';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const NotFoundPage = () => {
    const navigate = useNavigate()
    const notify = (e) => {
        navigate('/');
        toast.success(`${e.target.innerText} has been removed from the group`)
    }
    return (
        <div className='flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 min-h-screen'>
            <div className='min-w-md w-full space-y-8'>
                <div className="flex flex-col items-center">

                    <h2 className='mt-6 text-center text-4xl font-extrabold text-gray-900'>
                        Page Not Found
                    </h2>
                    <p className='mt-2 text-center font-concert text-lg text-red-800'>
                        I'm just as disappointed as you are.
                    </p>
                    <div className=" flex justify-center items-center py-5">
                        <img src={myImage} alt="Page not found" className='md:w-[60%] sm:block' />
                    </div>


                    <Link to="/" className="underline text-yellow-800">Return home.</Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage