import React, { useState } from 'react';
import '../assets/css/Card.css'; // For perspective property or you can use inline styles
const cardColors = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51']; 
const FlipCards = ({ questions }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const getColor = (index, colors) => {
        return colors[index % colors.length]; // Cycle through colors array
    };
    const handleNext = () => {
        // Increment index, but wrap around when it reaches the end of the array
        setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
    };
    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + questions.length) % questions.length);
    }
    return (
        <>
            <div className="flex flex-col justify-between items-center w-full">

                <div className="card mb-5">
                    <div className="card-inner">
                        <div className="card-front flex flex-col items-center justify-center text-white  border-4 rounded-lg p-5" style={{backgroundColor: getColor(currentIndex, cardColors), borderColor: getColor(currentIndex, cardColors)}}>
                            <p className="font-concert text-center text-xl">{questions[currentIndex].q}</p>
                            <p className="font-concert text-center text-xl">{questions[currentIndex].a}</p>
                            <p className="font-concert text-center text-xl">{questions[currentIndex].b}</p>
                            <p className="font-concert text-center text-xl">{questions[currentIndex].c}</p>
                            <p className="font-concert text-center text-xl">{questions[currentIndex].d}</p>
                        </div>
                        <div className="card-back flex items-center justify-center bg-green-500 text-white border-green-500 border-4 rounded-lg p-5">
                            <p className="font-concert text-center text-5xl">{questions[currentIndex].ans}</p>
                        </div>
                    </div>
                </div>
                <div className="container flex justify-between items-center w-[50%]">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handlePrev}
                    >
                        Previous
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>

            </div>

        </>

    );
};

export default FlipCards;
