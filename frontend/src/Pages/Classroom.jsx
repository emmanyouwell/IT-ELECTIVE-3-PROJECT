import React, { useState, useRef, useEffect } from 'react';
import SideNav from '../Components/SideNav';
import Files from './Files';
import { QuestionMarkCircleIcon } from '@heroicons/react/20/solid';
import AdminSideNav from '../Components/AdminSideNav';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../Actions/authActions';
import { driver } from "driver.js";
const Classroom = () => {
    const dispatch = useDispatch();
    const [isSideNavVisible, setSideNavVisible] = useState(false);
    const sideNavRef = useRef(null); // Create a ref for the SideNav
    const [group, setGroup] = useState(null);
    const { user } = useSelector(state => state.auth);
    
    const driverObj = driver({
        showProgress: true,
        allowClose: false,
        disableActiveInteraction: true,
        steps: [
            {
                element: '#own-group', popover: {
                    title: 'This is your own group.', description: 'Click this to quickly navigate to your group\'s work and start uploading subtopics and quiz.', side: "left", align: 'start', onNextClick: () => {
                        setGroup(user.groupID._id); driverObj.moveNext();
                    }
                }
            },
            { element: '#topic', popover: { title: 'Topic.', description: 'Displays the topic of the selected group.', side: "bottom", align: 'start' } },
            { element: '#all-groups', popover: { title: 'View other groups.', description: 'You can also view other groups to review their topics and practice their quiz as well.', side: "bottom", align: 'start' } },
            { element: '#new-section', popover: { title: 'Add new subtopics.', description: 'Clicking this button opens a form that allows you to add your own subtopics. This button is visible only to your group.', side: "bottom", align: 'start' } },
            { element: '#add-quiz', popover: { title: 'Add your quiz.', description: 'You can submit a .json file containing the question, choices, and answer of your quiz to add a flashcard.', side: "bottom", align: 'start' } }
        ],
    });
    
    const toggleSideNav = () => {
        setSideNavVisible(!isSideNavVisible);
    };

    // Close SideNav when clicking outside
    useEffect(() => {
        // Check if the user is visiting for the first time
        const isFirstVisit = localStorage.getItem('isFirstVisit') === null;

        if (isFirstVisit) {
            // Set the flag in localStorage to indicate that the user has visited
            localStorage.setItem('isFirstVisit', 'false');
            // Play the driver
            driverObj.drive();
        }
        const handleClickOutside = (event) => {
            if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
                setSideNavVisible(false);
            }
        };

        // Attach event listener when SideNav is visible
        if (isSideNavVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        dispatch(getUser());
        // Cleanup event listener on component unmount or when SideNav is not visible
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

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
                {user && user.role === 'admin' ? <AdminSideNav setGroup={setGroup} /> : <SideNav setGroup={setGroup} />}

            </div>
            {isSideNavVisible && (
                <div className={`fixed inset-0 z-30 bg-gray-900 bg-opacity-50 transition-opacity duration-300`}>
                    <div
                        ref={sideNavRef}
                        className={`fixed left-0 top-0 bg-white w-64 h-full transition-transform duration-300 transform ${isSideNavVisible ? 'translate-x-0' : '-translate-x-full'}`}
                        style={{ transition: 'transform 0.3s ease-in-out' }}
                    >
                        {user.role === 'admin' ? <AdminSideNav setGroup={setGroup} /> : <SideNav setGroup={setGroup} />}
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
