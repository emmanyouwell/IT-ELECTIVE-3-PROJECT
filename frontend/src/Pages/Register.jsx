import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGroups, clearErrors } from '../Actions/groupActions';
import { register, clearErrors as registerClearErrors } from '../Actions/authActions';
const images = 'https://images.unsplash.com/photo-1499673610122-01c7122c5dcb?q=80&w=1927&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
import { useNavigate, Link } from 'react-router-dom';
// @material-tailwind/react
import {
    Input,
    Typography,
    Select,
    Option,
    Popover,
    PopoverHandler,
    PopoverContent,
    Card,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import Headers from "../Components/Headers";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Loader from '../Components/Loader';
import Rubiks from '../Components/Rubiks';
import DotLoader from '../Components/DotLoader';

const Register = () => {
    const dispatch = useDispatch();
    const { groups, loading, error } = useSelector(state => state.groups);
    const { isRegistered, loading: registerLoading, error: registerError } = useSelector(state => state.auth);
    // Yup validation schema
    const validationSchema = Yup.object({
        name: Yup.string()
            .required('Name is required')
            .min(3, 'Name must be at least 3 characters'),
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        groupId: Yup.string()
            .required('Please select a group')
    });
    // Formik initialization
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            groupId: '' // For select input
        },
        validationSchema, // Pass the Yup validation schema
        onSubmit: (values) => {
            const formData = new FormData();
            formData.set('name', values.name);
            formData.set('email', values.email);
            formData.set('password', values.password);
            formData.set('groupId', values.groupId);
            console.log(formData.get('groupId'));
            // console.log('Submitted');
            dispatch(register(formData));
        }
    });
    let navigate = useNavigate();
    useEffect(() => {
        dispatch(getGroups());
        if (isRegistered) {
            navigate('/email-activation');
        }
        if (registerError) {
            dispatch(registerClearErrors());
        }
        if (error) {
            dispatch(clearErrors());
        }
    }, [dispatch, error, isRegistered, navigate, registerError]);
    return (
        <>
            <Headers />
            {registerLoading ? <div className="container flex justify-center items-center mx-auto w-full h-screen"><DotLoader /></div> : (<section
                className="container flex flex-col justify-center items-center lg:justify-between lg:items-center lg:flex-row  mx-auto p-5 sm:p-8 md:p-10  my-10 rounded-lg"
            >

                <Card color="transparent" className="border-4 border-gray-300 p-8" shadow={false}>
                    <Typography variant="h4" color="blue-gray">
                        Sign Up
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Nice to meet you! Enter your details to register.
                    </Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>

                        <div className="text-xl sm:text-2xl mb-6 sm:mb-8 flex flex-col">
                            <Typography variant="h6" color="blue-gray" className="">
                                Your Name
                            </Typography>
                            <Input
                                size="lg"
                                name="name"
                                id="name"
                                placeholder="name@mail.com"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                onBlur={formik.handleBlur}
                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                                labelProps={{
                                    className: "before:content-none after:content-none",
                                }}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-500 text-sm mt-3">{formik.errors.name}</div>
                            ) : null}
                        </div>
                        <div className="text-xl sm:text-2xl mb-6 sm:mb-8 flex flex-col">
                            <Typography variant="h6" color="blue-gray" className="">
                                Your Email
                            </Typography>
                            <Input
                                size="lg"
                                name="email"
                                id="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                placeholder="name@mail.com"
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
                            <Typography variant="h6" color="blue-gray" className="">
                                Password
                            </Typography>
                            <Input
                                type="password"
                                size="lg"
                                name="password"
                                id="password"
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
                        <div className="text-xl sm:text-2xl mb-6 sm:mb-8 flex flex-col">
                            <Typography variant="h6" color="blue-gray">
                                Group
                            </Typography>
                            <Select
                                size="lg"
                                name="groupId"
                                value={formik.values.groupId}  // Ensure Formik's value is passed here
                                onChange={(value) => {
                                    formik.values.groupId = value  // Set Formik's value to the selected value
                                    console.log("groupId: ", formik.values.groupId);
                                }}
                                // onBlur={formik.handleBlur}  // Handle blur event to mark as touched

                                className="border-t-blue-gray-200 aria-[expanded=true]:border-t-primary"
                            >
                                {groups.map(group => (
                                    <Option key={group._id} value={group._id}>
                                        Group {group.group}
                                    </Option>
                                ))}
                            </Select>
                            {formik.touched.groupId && formik.errors.groupId && (
                                <div className="text-red-500 text-sm mt-3">{formik.errors.groupId}</div>
                            )}
                        </div>


                        <Button className="mt-6" fullWidth type="submit">
                            sign up
                        </Button>
                        <Typography color="gray" className="mt-4 text-center font-normal">
                            Already have an account?{" "}
                            <Link to="/login" className="font-medium text-gray-900">
                                Sign In
                            </Link>
                        </Typography>
                    </form>
                </Card>
                <div className="container mx-auto px-4">
                    <img src={images} className="w-full max-w-full h-auto hidden lg:inline-block" alt="image" />
                </div>
            </section>)}

        </>
    );
}

export default Register;