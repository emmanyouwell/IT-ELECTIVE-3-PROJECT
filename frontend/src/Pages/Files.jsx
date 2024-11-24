import React, { useState, useRef, useEffect } from "react";
import Cards from "../Components/Cards";
import SideNav from "../Components/SideNav";
import Carousel from "../Components/Carousel";
import FlipCards from "../Components/FlipCards";
import img1 from "../assets/image/3.png";
import img2 from "../assets/image/4.png";
import questions from "../data/questions.json";
import data from "../data/data.json";
import AddNewSectionButton from "../Components/AddNewSectionButton";
import NewSubtopic from "../Components/NewSubtopic";
const images = [img1, img2];
import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import {
  SHOW_FORM,
  SHOW_EDIT,
  DELETE_SUBTOPICS_RESET,
} from "../constants/subtopicConstants";
import { HIDE_QUIZ_FORM } from "../constants/quizConstants";
import { DELETE_QUIZ_RESET } from "../constants/quizConstants";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubtopic, clearErrors } from "../Actions/subtopicActions";
import {
  deleteQuiz,
  clearErrors as deleteErrors,
} from "../Actions/quizActions";
import {
  getGroupDetails,
  clearErrors as clearGroupErrors,
} from "../Actions/groupActions";
import AddQuizSection from "../Components/AddQuizSection";
const getColor = (index, colors) => {
  return colors[index % colors.length]; // Cycle through colors array
};
import choose from "../assets/image/choose.png";
const borderColors = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"]; // Add as many colors as you like

import EditSubtopic from "../Components/EditSubtopic";
import { toast } from "react-toastify";
const Files = ({ group, selectedSubtopic }) => {
  const dispatch = useDispatch();
  const editRef = useRef(null);
  const subtopicRefs = useRef({});
  const [editId, setEditId] = useState("");
  const { quiz } = useSelector((state) => state.quizDetails);
  const { isVisible } = useSelector((state) => state.form);
  const { isVisible: quizVisible } = useSelector((state) => state.quizForm);
  const { isVisible: editVisible } = useSelector((state) => state.edit);
  const { user } = useSelector((state) => state.auth);
  const { success, loading, error } = useSelector((state) => state.subtopics);
  const {
    error: deleteError,
    isDeleted,
    loading: submitLoading,
  } = useSelector((state) => state.subtopic);
  const {
    isDeleted: quizDelete,
    loading: deleteLoading,
    error: quizDeleteError,
  } = useSelector((state) => state.quiz);
  const {
    groups,
    loading: groupLoading,
    error: groupError,
  } = useSelector((state) => state.groupDetails);
  // const [isVisible, setIsVisible] = useState(false);
  const toRoman = (num) => {
    const romanNumerals = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX",
      "X",
      "XI",
      "XII",
      "XIII",
      "XIV",
      "XV",
      "XVI",
      "XVII",
      "XVIII",
      "XIX",
      "XX",
    ];

    return romanNumerals[num - 1]; // Index starts at 0, so subtract 1
  };
  const handleEdit = (id) => {
    setEditId(id);
    dispatch({ type: SHOW_EDIT });
    setTimeout(() => {
      if (editRef.current) {
        editRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };
  const handleQuizDelete = (id) => {
    dispatch(deleteQuiz(id));
  };
  const handleDelete = (id) => {
    dispatch(deleteSubtopic(id));
  };
  const showForm = () => {
    dispatch({ type: SHOW_FORM });
  };

  useEffect(() => {
    if (group) {
      dispatch(getGroupDetails(group));
    }

    if (deleteError) {
      dispatch(clearErrors());
    }
    if (quizDeleteError) {
      dispatch(deleteErrors());
    }
    if (isDeleted) {
      toast.success("Subtopic deleted successfully");
      dispatch({ type: DELETE_SUBTOPICS_RESET });
      dispatch(getGroupDetails(group));
    }
    if (quizDelete) {
      toast.success("Quiz deleted successfully");
      dispatch({ type: DELETE_QUIZ_RESET });
      dispatch({ type: HIDE_QUIZ_FORM });
      dispatch(getGroupDetails(group));
    }
  }, [
    dispatch,
    error,
    deleteError,
    quizDelete,
    quizDeleteError,
    isDeleted,
    group,
  ]);
  useEffect(() => {
    if (group && (!isVisible || !editVisible || !quizVisible)) {
      dispatch(getGroupDetails(group));
    }
  }, [isVisible, editVisible, quizVisible]);
  useEffect(() => {
    if (selectedSubtopic && subtopicRefs.current[selectedSubtopic]) {
      const element = subtopicRefs.current[selectedSubtopic];
      const offset = -100; // Adjust the value for desired spacing
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition + offset,
        behavior: "smooth",
      });
    }
  }, [selectedSubtopic]);

  return (
    <>
      <div className="flex-grow h-full p-5">
        <section className="p-2 mb-10">
          <h1
            className="text-5xl font-concert font-bold text-center"
            id="topic"
          >
            {groups && groups.topic}
          </h1>
        </section>
        {groups && groups.topic ? (
          <>
            {groups &&
              groups.subtopics &&
              groups.subtopics.length > 0 &&
              groups.subtopics.map((item, index) => (
                <>
                  <section
                    data-aos="fade-up"
                    className="p-5 sm:p-8 md:p-10 border-8 my-3 rounded-lg"
                    key={index}
                    ref={(el) => (subtopicRefs.current[item._id] = el)} // Store ref for each subtopic
                    style={{ borderColor: getColor(index, borderColors) }}
                  >
                    <div className="flex justify-between items-center mb-6 sm:mb-10">
                      <p className="text-xl sm:text-2xl">
                        <strong>Subtopic {toRoman(index + 1)}.</strong>{" "}
                        {item.title}
                      </p>
                      {user.groupID._id === groups._id &&
                        user.role !== "admin" && (
                          <div className="flex space-x-4">
                            <button
                              onClick={() => handleEdit(item._id)}
                              className="p-4 border-2 border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-200"
                            >
                              <PencilIcon className="h-6 w-6" />{" "}
                              {/* Edit icon */}
                            </button>
                            <button
                              onClick={() => handleDelete(item._id)}
                              className="p-4 border-2 border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-200"
                            >
                              {submitLoading ? (
                                <div className="w-10 h-10 border-4 border-t-gray-900 border-gray-300 rounded-full animate-spin"></div>
                              ) : (
                                <TrashIcon className="h-6 w-6" />
                              )}
                            </button>
                          </div>
                        )}
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
                      <h1 className="font-concert text-2xl sm:text-3xl font-bold mb-3">
                        Transcript
                      </h1>
                      <pre className="max-w-full overflow-x-auto whitespace-pre-wrap">
                        {item.transcript}
                      </pre>
                    </div>
                  </section>
                </>
              ))}
            {user.groupID._id === groups._id && user.role !== "admin" ? (
              <>
                {editVisible && (
                  <div ref={editRef}>
                    <EditSubtopic subtopicId={editId} />
                  </div>
                )}
                {!isVisible && <AddNewSectionButton onAdd={showForm} />}
                {isVisible && <NewSubtopic groupId={groups._id} />}

                {!groups.quiz && <AddQuizSection groupId={groups._id} />}
                {groups.quiz &&
                  groups.quiz.questions &&
                  groups.quiz.questions.length > 0 && (
                    <section
                      className="p-4 lg:p-10 border-8 rounded-lg"
                      style={{ borderColor: borderColors[0] }}
                    >
                      <div className="container flex flex-col justify-center items-center mb-10 mx-auto">
                        <div className="flex justify-end w-full">
                          {user.groupID._id === groups._id &&
                            user.role !== "admin" && (
                              <div className="flex space-x-4">
                                <button
                                  onClick={() =>
                                    handleQuizDelete(groups.quiz._id)
                                  }
                                  className="p-4 border-2 border-gray-900 rounded-lg hover:bg-gray-900 hover:text-white transition-all duration-200"
                                >
                                  {deleteLoading ? (
                                    <div className="w-10 h-10 border-4 border-t-gray-900 border-gray-300 rounded-full animate-spin"></div>
                                  ) : (
                                    <TrashIcon className="h-6 w-6" />
                                  )}
                                </button>
                              </div>
                            )}
                        </div>
                        <h1 className="font-concert  text-3xl font-bold mb-3">
                          Quiz
                        </h1>
                        <FlipCards questions={groups.quiz.questions} />
                      </div>
                    </section>
                  )}
              </>
            ) : (
              <>
                {groups.subtopics.length === 0 && (
                  <div className="container flex flex-col justify-center items-center mb-10 mx-auto">
                    No subtopics available
                  </div>
                )}
              </>
            )}
            {user.groupID._id !== groups._id && (
              <>
                {groups.quiz && groups.quiz.questions ? (
                  <section className="p-4 lg:p-10 border-8 rounded-lg">
                    <div className="container flex flex-col justify-center items-center mb-10 mx-auto">
                      <h1 className="font-concert  text-3xl font-bold mb-3">
                        Quiz
                      </h1>

                      <FlipCards questions={groups.quiz.questions} />
                    </div>
                  </section>
                ) : (
                  <div className="container flex flex-col justify-center items-center mb-10 mx-auto">
                    No quiz available
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <>
            <div className="flex justify-center items-center h-[90%]">
              <img src={choose} alt="choose group" />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Files;
