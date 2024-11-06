import React, { useEffect, useState } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Card,
    Collapse,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser, getUser } from "../Actions/authActions";
import { toast } from 'react-toastify'
const Headers = () => {
    const [openNav, setOpenNav] = useState(false);
    const dispatch = useDispatch()
    const { user, loading, error } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const logoutHandler = () => {

        dispatch(logoutUser());
        toast.success('Logged out');


    }

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => window.innerWidth >= 960 && setOpenNav(false),
        );
        dispatch(getUser())
    }, [])


    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <Link to="/converter" href="#" className="flex items-center">
                    TXT to JSON
                </Link>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a target="_blank" href="https://drive.google.com/drive/folders/1f-m9ODubC44RMtYNU1dIinDQkFco4Q7u?usp=drive_link">
                    Google Drive
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 font-normal"
            >
                <a target="_blank" href="https://www.canva.com/design/DAGVTSzXZtg/rto-SnGiicdsnMUgKi5dXA/edit?utm_content=DAGVTSzXZtg&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">
                    Thumbnail
                </a>


            </Typography>

        </ul>
    );

    return (

        <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
            <div className="flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="/"
                    className="mr-4 cursor-pointer py-1.5 font-medium"
                >
                    IT PROFESSIONAL ELECTIVE 3 - BSIT S4A
                </Typography>
                <div className="flex items-center gap-4">
                    <div className="mr-4 hidden lg:block">{navList}</div>
                    {user ? (<div className="flex items-center gap-x-4">
                        <Typography variant="small" className="font-concert hidden lg:inline-block" color="blue-gray">
                            Welcome, {user.name}</Typography>
                        <Button
                            onClick={logoutHandler}
                            variant="gradient"
                            size="sm"
                            className="hidden lg:inline-block"
                        >
                            <span>Log Out</span>
                        </Button>
                    </div>) : (<div className="flex items-center gap-x-1">
                        <Link to="/login">
                            <Button
                                variant="text"
                                size="sm"
                                className="hidden lg:inline-block"
                            >
                                <span>Log In</span>
                            </Button>
                        </Link>
                        <Link to="/register">
                            <Button
                                variant="gradient"
                                size="sm"
                                className="hidden lg:inline-block"
                            >
                                <span>Sign in</span>
                            </Button>
                        </Link>
                    </div>)}

                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
            </div>
            <Collapse open={openNav}>
                {navList}
                {user ? (<div className="flex items-center gap-x-1">
                    <Button
                        onClick={logoutHandler}
                        variant="gradient"
                        size="sm"
                        className=""
                    >
                        <span>Log Out</span>
                    </Button>
                </div>) : (<div className="flex items-center gap-x-4">
                    <Link to="/login">
                        <Button
                            variant="text"
                            size="sm"
                            className=""
                        >
                            <span>Log In</span>
                        </Button>
                    </Link>
                    <Link to="/register">
                        <Button
                            variant="gradient"
                            size="sm"
                            className=""
                        >
                            <span>Sign in</span>
                        </Button>
                    </Link>
                </div>)}
            </Collapse>
        </Navbar>
    );
}

export default Headers;