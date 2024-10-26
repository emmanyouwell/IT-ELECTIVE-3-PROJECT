import React from 'react';

const AddNewSectionButton = ({ onAdd }) => {
    return (
        <section
            onClick={onAdd} // Function to handle the addition of a new section
            className="flex items-center justify-center px-4 py-2 border-4 border-blue-gray-100 hover:border-blue-gray-500 hover:cursor-pointer transition-all duration-200  border-dashed text-gray-800 w-full h-16 hover:h-24 my-5"
            id="new-section" 
        >
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
            Add New Subtopic
        </section>
    );
};

export default AddNewSectionButton;
