import React, { useState, useRef, useEffect } from 'react';
import SideNav from '../Components/SideNav';
import Files from './Files';
import AdminSideNav from '../Components/AdminSideNav';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../Actions/authActions';
const Classroom = () => {
    const dispatch = useDispatch();
    const [isSideNavVisible, setSideNavVisible] = useState(false);
    const sideNavRef = useRef(null); // Create a ref for the SideNav
    const [group, setGroup] = useState(null);
    const {user} = useSelector(state => state.auth) 
    const toggleSideNav = () => {
        setSideNavVisible(!isSideNavVisible);
    };

    // Close SideNav when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
                setSideNavVisible(false);
            }
        };

        // Attach event listener when SideNav is visible
        if (isSideNavVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        // Cleanup event listener on component unmount or when SideNav is not visible
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
        dispatch(getUser());
    }, [isSideNavVisible]);

    return (
        <div className="flex relative">
            <button
                className="md:hidden p-2 text-blue-500 absolute top-5 left-5"
                onClick={toggleSideNav}
            >
                {/* Hamburger Icon */}
                <span className="text-2xl">&#9776;</span>
            </button>
            <div className={`hidden md:block`}>
                {user && user.role === 'admin' ? <AdminSideNav setGroup={setGroup}/>: <SideNav setGroup={setGroup}/>}
                
            </div>
            {isSideNavVisible && (
                <div className={`fixed inset-0 z-30 bg-gray-900 bg-opacity-50 transition-opacity duration-300`}>
                    <div 
                        ref={sideNavRef} 
                        className={`fixed left-0 top-0 bg-white w-64 h-full transition-transform duration-300 transform ${isSideNavVisible ? 'translate-x-0' : '-translate-x-full'}`}
                        style={{ transition: 'transform 0.3s ease-in-out' }}
                    >
                        {user.role === 'admin' ? <AdminSideNav setGroup={setGroup}/>: <SideNav setGroup={setGroup}/>}
                    </div>
                </div>
            )}
            <div className="pt-10 w-full">
                <Files group={group}/>
            </div>
        </div>
    );
};

export default Classroom;
