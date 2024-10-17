import React, { useState, useEffect } from 'react'

const Login = () => {
    const [splashActive, setSplashActive] = useState(false);
    
    return (
        <div className="relative h-screen flex justify-center items-center">
            
            {splashActive && (
                <div
                    className="absolute bg-yellow-400 rounded-full w-4 h-4 animate-splash"
                    style={{
                        animation: 'radial-splash 1s ease-out forwards',
                        transformOrigin: 'center',
                    }}
                ></div>
            )}
        </div>

    )
}

export default Login