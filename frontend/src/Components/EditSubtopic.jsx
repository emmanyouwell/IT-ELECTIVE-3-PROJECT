import React, { useState, useEffect } from 'react'
import Carousel from '../Components/Carousel';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid';
const images = ['https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png', 'https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png', 'https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png'];
import { getSubtopicDetails, updateSubtopic, clearErrors } from '../Actions/subtopicActions';
import { useDispatch, useSelector } from 'react-redux';
import { UPDATE_SUBTOPICS_RESET, HIDE_EDIT } from '../constants/subtopicConstants';
import { getYouTubeVideoId } from '../utils/VideoID';
import { toast } from 'react-toastify';
const EditSubtopic = ({ subtopicId, isVisible }) => {
    const dispatch = useDispatch();
    const { isUpdated, loading, error } = useSelector(state => state.subtopic);
    const { subtopics } = useSelector(state => state.subtopicsDetails);
    const [imagePreview, setImagePreview] = useState(images)
    const [image, setImage] = useState('')
    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        videoLink: Yup.string().required('Video link is required'),

        transcript: Yup.string().required('Transcript is required'),
    });
    const onChange = e => {

        const files = Array.from(e.target.files)
        setImagePreview([])
        setImage([])
        files.forEach(file => {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImage(oldArray => [...oldArray, reader.result])
                    setImagePreview(oldArray => [...oldArray, reader.result])
                }
            }
            reader.readAsDataURL(file)
        })

    }
    // useFormik hook
    const formik = useFormik({
        initialValues: {
            title: '',
            videoLink: '',
            transcript: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.set('title', values.title);
            formData.set('videoLink', values.videoLink);
            // Ensure image is always an array
            const imagesArray = Array.isArray(image) ? image : [image];

            if (imagesArray.length > 0) {

                imagesArray.forEach(file => { formData.append('images', file) });
            }
            else {
                console.log('No images uploaded')
            }
            formData.set('transcript', values.transcript);
            // console.log('dispatching')

            // Add your logic to submit values to the database here
            dispatch(updateSubtopic(subtopicId, formData));

            // console.log('Form submitted:', formData);
        },
    });
    useEffect(() => {
        dispatch(getSubtopicDetails(subtopicId));

        if (error) {
            dispatch(clearErrors())
        }

        if (isUpdated) {

            toast.success('Subtopic updated successfully');
            dispatch({ type: HIDE_EDIT });
            dispatch({ type: UPDATE_SUBTOPICS_RESET })

        }


    }, [error, dispatch, isUpdated, subtopicId])

    useEffect(() => {
        if (subtopics) {
            formik.values.title = subtopics.title;
            formik.values.videoLink = subtopics.videoLink;
            formik.values.transcript = subtopics.transcript;

            if (subtopics && subtopics.images && subtopics.images.length > 1) {
                console.log(subtopics.images)
                if (!subtopics.images.every(image => image === '')) {

                    setImagePreview(subtopics.images.map(image => image.url));
                }
                else {
                    setImagePreview(images)
                }
            }
            else {

                if (subtopics && subtopics.images) {
                    // console.log(subtopics.images);
                    if (subtopics.images[0].url !== '') {
                        setImagePreview(subtopics.images[0].url);
                        console.log(subtopics.images)
                    }
                    else {
                        setImagePreview(images)
                    }
                }

            }
        }
    }, [subtopics])
    return (

        <section
            className="p-5 sm:p-8 md:p-10 border-4 border-dashed border-gray-300 my-3 rounded-lg"
        >
            <h1 className="font-concert text-5xl text-center">Edit Subtopic</h1>
            <form onSubmit={formik.handleSubmit}>
                <div className="text-xl sm:text-2xl mb-6 sm:mb-10 flex flex-col">
                    <label className="block text-sm font-bold mb-2" htmlFor="title">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter title here"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.title}
                        className="border border-gray-700 rounded-lg p-2"
                    />
                    {formik.touched.title && formik.errors.title ? (
                        <div className="text-red-500 text-sm mt-3">{formik.errors.title}</div>
                    ) : null}
                </div>

                <div className="container flex flex-col md:flex-row justify-between items-center mb-10 mx-auto">
                    {/* Video */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center p-4 mb-6 md:mb-0">
                        <div className="border-4 border-yellow-500 rounded-lg overflow-hidden shadow-lg w-full mb-4">
                            <iframe
                                className="w-full h-48 sm:h-64 md:h-72 lg:h-96"
                                src={`https://www.youtube.com/embed/${formik.values.videoLink}`} // Use formData if present
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                        <div className="mb-4 p-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="videoLink">
                                Video Link
                            </label>
                            <input
                                type="text"
                                id="videoLink"
                                name="videoLink"
                                placeholder="Enter YouTube Video ID"
                                onChange={(e) => {
                                    // Custom processing logic here
                                    const { value } = e.target;

                                    // Example: Trim whitespace
                                    const trimmedValue = getYouTubeVideoId(value);

                                    // Update Formik state with the processed value
                                    formik.setFieldValue("videoLink", trimmedValue);

                                    // Call the original handleChange if needed
                                    // formik.handleChange(e); // You can keep this if you still want to invoke it
                                }}
                                onBlur={formik.handleBlur}
                                value={formik.values.videoLink}
                                className="border border-gray-700 rounded-lg p-2 w-full"
                            />
                            {formik.touched.videoLink && formik.errors.videoLink ? (
                                <div className="text-red-500 text-sm mt-3">{formik.errors.videoLink}</div>
                            ) : null}
                        </div>
                    </div>

                    {/* Slides */}
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                        <Carousel images={imagePreview && imagePreview.length ? imagePreview : images} />
                        <div className="mt-4 mb-4 p-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="images">
                                Image Links (comma separated)
                            </label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                accept="image/*"
                                onChange={onChange}
                                multiple

                                className="border border-gray-700 rounded-lg p-2 w-full"
                            />

                        </div>
                    </div>
                </div>

                {/* Form Fields */}





                <div className="text-justify">
                    <h1 className="font-concert text-2xl sm:text-3xl font-bold mb-3">Transcript</h1>
                    <textarea
                        name="transcript"
                        placeholder="Enter Transcript"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.transcript}
                        className="border border-gray-700 rounded-lg p-2 w-full h-24"
                    />
                    {formik.touched.transcript && formik.errors.transcript ? (
                        <div className="text-red-500 text-sm mt-3">{formik.errors.transcript}</div>
                    ) : null}
                </div>

                <div className="flex justify-center w-full mt-4 space-x-4">

                    <button
                        type="submit"
                        className="font-bold py-2 px-4 rounded-lg border-2 border-gray-900 hover:bg-gray-900 hover:text-white flex items-center justify-center transition-all duration-200 w-28"
                    >
                        {loading ? (
                            <div className="w-10 h-10 border-4 border-t-gray-900 border-gray-300 rounded-full animate-spin"></div>
                        ) : (
                            <CheckIcon className="h-10 w-10" />
                        )}
                    </button>
                    <button
                        onClick={() => dispatch({ type: HIDE_EDIT })}
                        className="font-bold py-2 px-4 rounded-lg border-2  border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center transition-all duration-200 w-28"
                    >
                        <XMarkIcon className="h-10 w-10" />
                    </button>
                </div>
            </form>
        </section>
    )
}

export default EditSubtopic