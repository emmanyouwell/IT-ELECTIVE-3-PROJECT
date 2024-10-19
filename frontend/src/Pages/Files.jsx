import React, { useState, useRef, useEffect } from 'react'
import Cards from '../Components/Cards';
import SideNav from '../Components/SideNav';
import Carousel from '../Components/Carousel';
import FlipCards from '../Components/FlipCards';
import img1 from '../assets/image/3.png'
import img2 from '../assets/image/4.png'
import questions from '../data/questions.json'
import data from '../data/data.json';
import AddNewSectionButton from '../Components/AddNewSectionButton';
import NewSubtopic from '../Components/NewSubtopic';
const images = [img1, img2];
import { PencilIcon, TrashIcon } from '@heroicons/react/20/solid';
import { SHOW_FORM, SHOW_EDIT, DELETE_SUBTOPICS_RESET } from '../constants/subtopicConstants';

import { useDispatch, useSelector } from 'react-redux';
import { deleteSubtopic, clearErrors} from '../Actions/subtopicActions';
import { getGroupDetails, clearErrors as clearGroupErrors } from '../Actions/groupActions';
import AddQuizSection from '../Components/AddQuizSection';
const getColor = (index, colors) => {
    return colors[index % colors.length]; // Cycle through colors array
};
const borderColors = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51']; // Add as many colors as you like

import EditSubtopic from '../Components/EditSubtopic';
import { toast } from 'react-toastify';
const Files = ({ group }) => {
    const dispatch = useDispatch();
    const editRef = useRef(null);
    const [editId, setEditId] = useState('');
    const [hideQuiz, setHideQuiz] = useState(true);
    const { isVisible } = useSelector(state => state.form)
    const { isVisible: editVisible } = useSelector(state => state.edit)
    const { success, loading, error } = useSelector(state => state.subtopics);
    const {error: deleteError, isDeleted, loading: submitLoading} = useSelector(state => state.subtopic);
    const { groups, loading: groupLoading, error: groupError } = useSelector(state => state.groupDetails);
    // const [isVisible, setIsVisible] = useState(false);
    const toRoman = (num) => {
        const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];

        return romanNumerals[num - 1]; // Index starts at 0, so subtract 1
    };
    const handleEdit = (id) => {
        setEditId(id);
        dispatch({type: SHOW_EDIT});
        setTimeout(()=>{
            if (editRef.current){
                editRef.current.scrollIntoView({behavior: 'smooth'});
            }
        }, 100);
    }
    const handleDelete = (id) => {
        dispatch(deleteSubtopic(id));
    }
    const showForm = () => {
        dispatch({ type: SHOW_FORM });
    }
    
    useEffect(() => {
        dispatch(getGroupDetails(group))
        if (deleteError){
            dispatch(clearErrors());
        }
        if (isDeleted){
            toast.success('Subtopic deleted successfully');
            dispatch({type: DELETE_SUBTOPICS_RESET});
            dispatch(getGroupDetails(group));
        }
    }, [dispatch, error, deleteError, isDeleted, group])
    useEffect(() => {
        if (!isVisible || !editVisible) {
            dispatch(getGroupDetails(group));
        }
        
    }, [isVisible, editVisible])

    return (
        <>
            <div className="flex-grow h-full p-5">

                <section className="p-2 mb-10">
                    <h1 className="text-5xl font-concert font-bold text-center">{groups && groups.topic}</h1>

                </section>
                {groups && groups.subtopics && groups.subtopics.length > 0 && groups.subtopics.map((item, index) => (
                    <section
                        data-aos="fade-up"
                        className="p-5 sm:p-8 md:p-10 border-8 my-3 rounded-lg"
                        key={index}
                        style={{ borderColor: getColor(index, borderColors) }}
                    >
                        <div className="flex justify-between items-center mb-6 sm:mb-10">
                            <p className="text-xl sm:text-2xl">
                                <strong>Subtopic {toRoman(index + 1)}.</strong> {item.title}
                            </p>

                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handleEdit(item._id)}
                                    className="p-4 border-2 border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-200"
                                >
                                    <PencilIcon className="h-6 w-6" /> {/* Edit icon */}
                                </button>
                                <button
                                    onClick={() => handleDelete(item._id)}
                                    className="p-4 border-2 border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-200"
                                >
                                    <TrashIcon className="h-6 w-6" /> {/* Delete icon */}
                                </button>
                            </div>
                        </div>


                        <div className="container flex flex-col md:flex-row justify-between items-center mb-10 mx-auto">
                            {/* Video */}
                            <div className="w-full md:w-1/2 flex justify-center p-4 mb-6 md:mb-0">
                                <div className="border-4 border-yellow-500 rounded-lg overflow-hidden shadow-lg w-full">
                                    <iframe
                                        className="w-full h-48 sm:h-64 md:h-72 lg:h-96"
                                        src={`https://www.youtube.com/embed/${item.videoLink}`}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>

                            {/* Slides */}
                            <div className="w-full md:w-1/2">
                                <Carousel images={item.images} />
                            </div>
                        </div>

                        {/* Transcript */}
                        <div className="text-justify p-3">
                            <h1 className="font-concert text-2xl sm:text-3xl font-bold mb-3">Transcript</h1>
                            <p>{item.transcript}</p>
                        </div>
                    </section>
                   

                ))}
                 {editVisible && (<div ref={editRef}>
                   <EditSubtopic subtopicId={editId} /></div>)}
                {!isVisible && <AddNewSectionButton onAdd={showForm} />}
                {isVisible && (<NewSubtopic groupId={groups._id} />)}

                {hideQuiz && <AddQuizSection />}
                {!hideQuiz &&
                    <section className="p-10 border-8 rounded-lg" style={{ borderColor: borderColors[0] }}>
                        <div className="container flex flex-col justify-center items-center mb-10 mx-auto">
                            <h1 className="font-concert text-3xl font-bold mb-3">Quiz</h1>
                            <FlipCards questions={questions} />
                        </div>
                    </section>}
            </div>



        </>

    )
}

export default Files