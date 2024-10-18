import React, { useState, useEffect } from 'react'
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

const getColor = (index, colors) => {
    return colors[index % colors.length]; // Cycle through colors array
};
const borderColors = ['#264653', '#2a9d8f', '#e9c46a', '#f4a261', '#e76f51']; // Add as many colors as you like

const Files = ({ group }) => {

    const toRoman = (num) => {
        const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX'];

        return romanNumerals[num - 1]; // Index starts at 0, so subtract 1
    };
    useEffect(() => {
        if (group) {
            console.log(group);
        }

    }, [group])
    return (
        <>
            <div className="flex-grow h-full p-5">

                <section className="p-2 mb-10">
                    <h1 className="text-5xl font-concert font-bold text-center">{data[group].topic}</h1>

                </section>
                {data[group].subtopic.map((item, index) => (
                    <section
                        data-aos="fade-up"
                        className="p-5 sm:p-8 md:p-10 border-8 my-3 rounded-lg"
                        key={index}
                        style={{ borderColor: getColor(index, borderColors) }}
                    >
                        <p className="text-xl sm:text-2xl mb-6 sm:mb-10">
                            <strong>Subtopic {toRoman(index + 1)}.</strong> {item.title}
                        </p>

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

                <AddNewSectionButton />
                <NewSubtopic item={data[group].subtopic[0]} />
                <section className="p-10 border-8 rounded-lg" style={{ borderColor: borderColors[0] }}>
                    <div className="container flex flex-col justify-center items-center mb-10 mx-auto">
                        <h1 className="font-concert text-3xl font-bold mb-3">Quiz</h1>
                        <FlipCards questions={questions} />
                    </div>
                </section>
            </div>



        </>

    )
}

export default Files