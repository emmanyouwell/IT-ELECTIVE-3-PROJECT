import React, { useState, useEffect } from 'react'
import Carousel from '../Components/Carousel';

import { useFormik } from 'formik';
import * as Yup from 'yup';
const images = 'https://images.unsplash.com/photo-1522252234503-e356532cafd5?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
import { login, clearErrors } from '../Actions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Headers from '../Components/Headers';
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import Loader from '../Components/Loader';
import Rubiks from '../Components/Rubiks';
import DotLoader from '../Components/DotLoader';



const Login = () => {
    const dispatch = useDispatch();
    const { error, loading, user, isAuthenticated, isVerified } = useSelector(state => state.auth)
    const [visible, setVisible] = useState(true)

    const icon = visible ? <i className="fa-solid fa-eye-slash hover:cursor-pointer" onClick={() => setVisible(!visible)}></i> : <i className="fa-solid fa-eye" onClick={() => setVisible(!visible)}></i>
    const inputType = visible ? "password" : "text"
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            dispatch(login(values.email, values.password, navigate))

        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
        })

    })

    let location = useLocation();
    const redirect = location.search ? new URLSearchParams(location.search).get('redirect') : ''



    useEffect(() => {
        if (isAuthenticated && redirect === 'email-activation') {
            navigate(`/${redirect}`)
        }
        else if (isAuthenticated && isVerified) {
            navigate('/')
        }
        if (error) {

            dispatch(clearErrors())

        }


    }, [error, isAuthenticated, dispatch, navigate, redirect])
    return (
        <>
            <Headers />
            {loading ? <div className="container flex justify-center items-center mx-auto w-full h-screen"><DotLoader /></div> : (<section
                className="container mx-auto flex flex-col justify-center items-center lg:justify-between lg:items-center lg:flex-row p-10 sm:p-8 md:p-10 my-10 rounded-lg lg:border-4 lg:border-gray-300"
            >

                <Card color="transparent" className="border-4 border-gray-300 lg:border-0 p-4 sm:p-8" shadow={false}>
                    <Typography variant="h4" color="blue-gray">
                        Login
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Login to your account to see your files.
                    </Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
                        <div className="mb-1 flex flex-col gap-6">
                            <div className="text-xl sm:text-2xl mb-6 sm:mb-8 flex flex-col">
                                <Typography variant="h6" color="blue-gray">
                                    Your Email
                                </Typography>
                                <Input
                                    size="lg"
                                    placeholder="name@mail.com"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-500 text-sm mt-3">{formik.errors.email}</div>
                                ) : null}
                            </div>
                            <div className="text-xl sm:text-2xl mb-6 sm:mb-8 flex flex-col">
                                <Typography variant="h6" color="blue-gray" >
                                    Password
                                </Typography>
                                <Input
                                    type="password"
                                    size="lg"
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    placeholder="********"
                                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                    labelProps={{
                                        className: "before:content-none after:content-none",
                                    }}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-red-500 text-sm mt-3">{formik.errors.password}</div>
                                ) : null}
                            </div>
                        </div>

                        <Button className="mt-6" fullWidth type="submit">
                            Login
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Don't have an account?{" "}
                            <Link to="/register" className="font-medium text-gray-900">
                                Sign Up
                            </Link>
                        </Typography>
                    </form>
                </Card>

                <div className="container mx-auto px-4">
                    <img src={images} className="w-full max-w-full h-auto hidden lg:inline-block" alt="image" />
                </div>
            </section>)}

        </>

    )
}

export default Login