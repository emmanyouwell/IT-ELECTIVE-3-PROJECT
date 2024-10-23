import React from 'react'

const DotLoader = () => {
    return (
        /* From Uiverse.io by Javierrocadev */
        <div className="flex flex-row gap-2">
            <div className="w-4 h-4 rounded-full bg-gray-900 animate-bounce [animation-delay:.7s]"></div>
            <div className="w-4 h-4 rounded-full bg-gray-900 animate-bounce [animation-delay:.3s]"></div>
            <div className="w-4 h-4 rounded-full bg-gray-900 animate-bounce [animation-delay:.7s]"></div>
        </div>
    )
}

export default DotLoader