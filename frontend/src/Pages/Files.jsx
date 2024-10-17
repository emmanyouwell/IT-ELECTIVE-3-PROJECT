import React, { useState } from 'react'
import Cards from '../Components/Cards';
import SideNav from '../Components/SideNav';
import Carousel from '../Components/Carousel';
import FlipCards from '../Components/FlipCards';
import img1 from '../assets/image/3.png';
import img2 from '../assets/image/4.png';
import img3 from '../assets/image/5.png';
import img4 from '../assets/image/16.png';
import img5 from '../assets/image/18.png';
import img6 from '../assets/image/20.png';
const images = [img1, img2, img3]
const images2 = [img4, img5, img6]

const Files = () => {

    return (
        <>
            <div className="flex justify-center w-screen">

                <SideNav />


                <div className="flex-grow p-10 h-[5000px]">
                    <section className="p-2 mb-10">
                        <h1 className="text-5xl font-concert font-bold text-center">Defining Your Audit Plan</h1>

                    </section>
                    <section className="p-10">
                        <p className="text-2xl mb-10"><strong>Subtopic I.</strong> Interrelated Components of a Computing Environment</p>
                        <div className="container flex justify-between items-center mb-10">
                            {/* Video */}
                            <div className="flex justify-center p-4">
                                <div className="border-4 border-yellow-500 rounded-lg overflow-hidden shadow-lg">
                                    <iframe
                                        width="560"
                                        height="315"
                                        src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                            {/* Slides */}
                            <Carousel images={images}/>
                        </div>
                        {/* Transcript */}
                        <div className="w-50 text-justify p-3">
                            <h1 className="font-concert text-3xl font-bold mb-3">Transcript</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quae modi est quisquam iusto dolor, repudiandae dolore recusandae voluptatum! Deleniti sapiente quos, laborum commodi atque qui consequuntur veniam, perspiciatis dolorem tempora fugiat aut minima eos cum suscipit id voluptas velit ab sint natus ipsa repellat! Dignissimos, voluptas saepe optio laborum quibusdam distinctio nam porro eos! Aliquid earum, facere provident necessitatibus blanditiis assumenda minima ipsa mollitia iusto, voluptatem esse labore omnis natus commodi amet incidunt illo. Accusantium velit nulla, consequuntur earum culpa hic quisquam autem voluptatem cumque quibusdam ipsum tempore dignissimos reprehenderit tenetur labore vitae officiis voluptate accusamus unde blanditiis maiores libero corrupti. Atque molestias quae dolor. Possimus eum quasi quod architecto provident at dolor iusto sint, tempore qui beatae eveniet dolore itaque dignissimos id libero ullam cumque expedita, vel, fuga neque delectus fugiat voluptas debitis. Dolorum vel deleniti excepturi ducimus doloremque alias adipisci ut, assumenda ratione labore! Ratione dicta illo obcaecati consectetur, quibusdam qui, eligendi, voluptatum illum suscipit autem dolor commodi. Laboriosam corrupti commodi, omnis veniam explicabo quod ipsa temporibus ex dolorem eligendi dolores neque aliquam impedit assumenda consectetur cupiditate quas dolor modi enim. Similique libero, quia quae nostrum totam nesciunt numquam, ratione voluptates harum necessitatibus odio. Sed reprehenderit iste tempora cupiditate delectus incidunt architecto quo soluta explicabo, dignissimos quidem similique magnam fugiat maxime unde itaque, hic rerum corrupti rem velit quae iusto? Culpa iusto velit nulla. Doloremque consequatur reiciendis quibusdam laudantium consequuntur, quidem modi magnam ad sunt nulla nisi reprehenderit voluptates temporibus adipisci nemo, ipsam quas? Velit in hic accusamus nulla id nemo dignissimos dolores optio illo? Libero necessitatibus suscipit voluptatum non, ex a distinctio consequuntur ratione consequatur quo exercitationem laborum fugit voluptate similique, dignissimos hic iusto esse molestias. Esse, nobis ea praesentium doloremque nulla voluptatibus dolores, omnis cupiditate quis odio adipisci sunt nam illo maiores ipsa, tempore consequatur consequuntur rem molestias quaerat sed nesciunt dolorum porro quidem. Natus commodi eligendi, cumque, aliquid vero vel cupiditate veniam praesentium et necessitatibus, quibusdam doloremque ut exercitationem nesciunt temporibus alias. Eaque libero fugiat maxime laudantium nam asperiores praesentium, ullam neque! Facere eaque tempore obcaecati quia, rerum fuga aperiam sint quae qui dignissimos expedita placeat nemo possimus vel sit quisquam delectus et suscipit. Quidem ab culpa veniam amet? Nam quam fugiat ut, vitae architecto alias ipsum rem cumque vel, nemo, quod temporibus! Obcaecati optio corrupti, quaerat culpa adipisci modi nobis ipsum amet blanditiis! Accusamus minus rerum reiciendis dolorem maxime, earum expedita? Officia ex voluptatum officiis harum qui debitis dolor molestias error incidunt, magnam, quae odit exercitationem rem eum commodi accusantium dicta unde, doloribus nobis suscipit quibusdam mollitia. Minima, dolore eum? Ut quas, qui laudantium iure unde nisi nobis nemo accusantium at aliquam doloremque amet iste consequuntur ratione illum cum odit architecto in quis ipsum. Debitis magni quia reprehenderit vel, quae tenetur delectus dolore repudiandae eos laborum facere ratione impedit eveniet unde, rerum aut nihil. Iste facilis nihil laboriosam placeat deleniti est vitae ut? Quod voluptatum, tempora veritatis sunt enim, magni, reiciendis quaerat optio sit ad assumenda consectetur vero deserunt distinctio? Aspernatur, eveniet voluptas!</p>
                        </div>
                    </section>
                    <section className="p-10">
                        <p className="text-2xl mb-10"><strong>Subtopic II.</strong> Cybersecurity Models</p>
                        <div className="container flex justify-between items-center mb-10">
                            {/* Video */}
                            <div className="flex justify-center p-4">
                                <div className="border-4 border-yellow-500 rounded-lg overflow-hidden shadow-lg">
                                    <iframe
                                        width="560"
                                        height="315"
                                        src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                            {/* Slides */}
                            <Carousel images={images2}/>
                        </div>
                        {/* Transcript */}
                        <div className="w-50 text-justify p-3">
                            <h1 className="font-concert text-3xl font-bold mb-3">Transcript</h1>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi quae modi est quisquam iusto dolor, repudiandae dolore recusandae voluptatum! Deleniti sapiente quos, laborum commodi atque qui consequuntur veniam, perspiciatis dolorem tempora fugiat aut minima eos cum suscipit id voluptas velit ab sint natus ipsa repellat! Dignissimos, voluptas saepe optio laborum quibusdam distinctio nam porro eos! Aliquid earum, facere provident necessitatibus blanditiis assumenda minima ipsa mollitia iusto, voluptatem esse labore omnis natus commodi amet incidunt illo. Accusantium velit nulla, consequuntur earum culpa hic quisquam autem voluptatem cumque quibusdam ipsum tempore dignissimos reprehenderit tenetur labore vitae officiis voluptate accusamus unde blanditiis maiores libero corrupti. Atque molestias quae dolor. Possimus eum quasi quod architecto provident at dolor iusto sint, tempore qui beatae eveniet dolore itaque dignissimos id libero ullam cumque expedita, vel, fuga neque delectus fugiat voluptas debitis. Dolorum vel deleniti excepturi ducimus doloremque alias adipisci ut, assumenda ratione labore! Ratione dicta illo obcaecati consectetur, quibusdam qui, eligendi, voluptatum illum suscipit autem dolor commodi. Laboriosam corrupti commodi, omnis veniam explicabo quod ipsa temporibus ex dolorem eligendi dolores neque aliquam impedit assumenda consectetur cupiditate quas dolor modi enim. Similique libero, quia quae nostrum totam nesciunt numquam, ratione voluptates harum necessitatibus odio. Sed reprehenderit iste tempora cupiditate delectus incidunt architecto quo soluta explicabo, dignissimos quidem similique magnam fugiat maxime unde itaque, hic rerum corrupti rem velit quae iusto? Culpa iusto velit nulla. Doloremque consequatur reiciendis quibusdam laudantium consequuntur, quidem modi magnam ad sunt nulla nisi reprehenderit voluptates temporibus adipisci nemo, ipsam quas? Velit in hic accusamus nulla id nemo dignissimos dolores optio illo? Libero necessitatibus suscipit voluptatum non, ex a distinctio consequuntur ratione consequatur quo exercitationem laborum fugit voluptate similique, dignissimos hic iusto esse molestias. Esse, nobis ea praesentium doloremque nulla voluptatibus dolores, omnis cupiditate quis odio adipisci sunt nam illo maiores ipsa, tempore consequatur consequuntur rem molestias quaerat sed nesciunt dolorum porro quidem. Natus commodi eligendi, cumque, aliquid vero vel cupiditate veniam praesentium et necessitatibus, quibusdam doloremque ut exercitationem nesciunt temporibus alias. Eaque libero fugiat maxime laudantium nam asperiores praesentium, ullam neque! Facere eaque tempore obcaecati quia, rerum fuga aperiam sint quae qui dignissimos expedita placeat nemo possimus vel sit quisquam delectus et suscipit. Quidem ab culpa veniam amet? Nam quam fugiat ut, vitae architecto alias ipsum rem cumque vel, nemo, quod temporibus! Obcaecati optio corrupti, quaerat culpa adipisci modi nobis ipsum amet blanditiis! Accusamus minus rerum reiciendis dolorem maxime, earum expedita? Officia ex voluptatum officiis harum qui debitis dolor molestias error incidunt, magnam, quae odit exercitationem rem eum commodi accusantium dicta unde, doloribus nobis suscipit quibusdam mollitia. Minima, dolore eum? Ut quas, qui laudantium iure unde nisi nobis nemo accusantium at aliquam doloremque amet iste consequuntur ratione illum cum odit architecto in quis ipsum. Debitis magni quia reprehenderit vel, quae tenetur delectus dolore repudiandae eos laborum facere ratione impedit eveniet unde, rerum aut nihil. Iste facilis nihil laboriosam placeat deleniti est vitae ut? Quod voluptatum, tempora veritatis sunt enim, magni, reiciendis quaerat optio sit ad assumenda consectetur vero deserunt distinctio? Aspernatur, eveniet voluptas!</p>
                        </div>
                    </section>

                    <section className="p-10">
                        <div className="container flex flex-col justify-center items-center mb-10">
                        <h1 className="font-concert text-3xl font-bold mb-3">Quiz</h1>
                            <FlipCards />
                        </div>
                    </section>
                </div>
            </div>


        </>

    )
}

export default Files