import React, { useState, useEffect } from 'react'
import Carousel from '../Components/Carousel';
import { useFormik } from 'formik';
import * as Yup from 'yup';
const images = ['https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png', 'https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png', 'https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png'];
import { createSubtopics, clearErrors } from '../Actions/subtopicActions';
import { useDispatch, useSelector } from 'react-redux';
import { NEW_SUBTOPICS_RESET } from '../constants/subtopicConstants';
import { getYouTubeVideoId } from '../utils/VideoID';
import { toast } from 'react-toastify';
const NewSubtopic = ({ item }) => {
    const dispatch = useDispatch();
    const { success, loading, error } = useSelector(state => state.newSubtopics);
    const [imagePreviews, setImagePreviews] = useState([]);
    // Validation schema using Yup
    const validationSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        videoLink: Yup.string().required('Video link is required'),
        images:Yup.array()
        .of(Yup.mixed().required('At least one image file is required'))
        .min(1, 'At least one image file is required'),
        transcript: Yup.string().required('Transcript is required'),
    });
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const previews = files.map(file => URL.createObjectURL(file)); // Create object URLs for previews
        setImagePreviews(previews); // Update previews state
        formik.setFieldValue('images', files); // Keep original files for submission
    };
    // useFormik hook
    const formik = useFormik({
        initialValues: {
            title: '',
            videoLink: '',
            images: [],
            transcript: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.set('title', values.title);
            formData.set('videoLink', values.videoLink);
            formData.set('images', values.images);
            formData.set('transcript', values.transcript);
            // Add your logic to submit values to the database here
            dispatch(createSubtopics(formData));

            // console.log('Form submitted:', formData);
        },
    });
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (success) {
            // navigate('/admin/modules');
            toast.success('Subtopics created successfully')
            dispatch({ type: NEW_SUBTOPICS_RESET })

        }
    }, [error, success, dispatch])
    return (
        <section
            className="p-5 sm:p-8 md:p-10 border-4 border-dashed border-gray-300 my-3 rounded-lg"
        >
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
                        <Carousel images={imagePreviews.length ? imagePreviews : images} />
                        <div className="mt-4 mb-4 p-4">
                            <label className="block text-sm font-bold mb-2" htmlFor="images">
                                Image Links (comma separated)
                            </label>
                            <input
                                type="file"
                                id="images"
                                name="images"
                                accept="image/*"
                                onChange={handleImageUpload}
                                multiple
                                className="border border-gray-700 rounded-lg p-2 w-full"
                            />
                            {formik.touched.images && formik.errors.images ? (
                                <div className="text-red-500 text-sm mt-3">{formik.errors.images}</div>
                            ) : null}
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

                <div className="flex justify-center mt-4">
                    <button
                        type="submit"
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </section>
    )
}

export default NewSubtopic