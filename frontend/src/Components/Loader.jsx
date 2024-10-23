import React from 'react'
import loader from '../assets/image/loader.gif'
const Loader = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <img src={loader} alt="loader" className="w-24 h-24" />
            <p className="animate-fastpulse font-bold text-2xl">Loading...</p>
        </div>

    )
}

export default Loader