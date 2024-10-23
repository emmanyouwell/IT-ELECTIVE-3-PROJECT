import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SideNav from '../Components/SideNav'
import CustomComponent from '../Components/CustomComponent'
import { useNavigate } from 'react-router-dom'
import Headers from '../Components/Headers'
import Rubiks from '../Components/Rubiks'
const Home = () => {
    const navigate = useNavigate();
    const [splash, setSplash] = useState(false);
    const handleClick = () => {
        setSplash(true);
        navigate('/classroom');
    }
    return (
        <>
            <Headers />
            
            <div className="container mx-auto flex justify-center align-center h-screen">
                <CustomComponent onClick={handleClick} />
            </div>


        </>

    )
}

export default Home