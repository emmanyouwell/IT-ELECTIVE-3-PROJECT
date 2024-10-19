import React, { useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { CheckIcon } from '@heroicons/react/20/solid';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { SHOW_QUIZ_FORM } from '../constants/quizConstants';
import { createQuiz, clearErrors } from '../Actions/quizActions';
import { NEW_QUIZ_RESET } from '../constants/quizConstants';
import { toast } from 'react-toastify';

const AddQuizSection = ({ groupId }) => {
    const dispatch = useDispatch();
    const { loading, error, success } = useSelector(state => state.newQuiz);
    const fileInputRef = useRef(null);

    const formik = useFormik({
        initialValues: {
            file: null,
        },
        validationSchema: Yup.object({
            file: Yup.mixed().required('A file is required'),
        }),
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append('file', values.file);
            dispatch(createQuiz(formData, groupId));
        },
    });

    const handleSectionClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        formik.setFieldValue('file', e.currentTarget.files[0]);
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            toast.success('Quiz created successfully');
            dispatch({ type: NEW_QUIZ_RESET });
            dispatch({ type: SHOW_QUIZ_FORM });
            formik.resetForm(); // Reset form after successful submission
            if (fileInputRef.current) {
                fileInputRef.current.value = ''; // Clear file input
            }
        }
    }, [error, success, dispatch]);

    return (
        <form onSubmit={formik.handleSubmit}>
            <section
                onClick={handleSectionClick}
                className="flex items-center justify-center px-4 py-2 border-4 border-blue-gray-100 hover:border-blue-gray-500 hover:cursor-pointer transition-all duration-200 border-dashed text-gray-800 w-full h-20 hover:h-24 my-5"
            >
                <input
                    type="file"
                    accept=".json"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={formik.values.file !== null}
                />
                {loading ? (
                    <div className="w-10 h-10 border-4 border-t-gray-900 border-gray-300 rounded-full animate-spin"></div>
                ) : (
                    <>
                        {formik.values.file ? (
                            <button
                                type="submit"
                                className="font-bold py-2 px-4 rounded-lg border-2 border-gray-900 hover:bg-gray-900 hover:text-white flex items-center justify-center transition-all duration-200 w-32"
                            >
                                {formik.values.file.name}
                            </button>
                        ) : (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-5 h-5 mr-2"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                                </svg>
                                Add Quiz
                            </>
                        )}
                    </>
                )}
            </section>
            {formik.errors.file && formik.touched.file && (
                <div className="text-red-500 text-sm">{formik.errors.file}</div>
            )}
        </form>
    );
};

export default AddQuizSection;
