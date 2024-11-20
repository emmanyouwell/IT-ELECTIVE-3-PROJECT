import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SideNav from '../Components/SideNav'
import CustomComponent from '../Components/CustomComponent'
import { useNavigate } from 'react-router-dom'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../assets/image/ICON.png'
import icon1 from '../assets/image/icon1.png'
import icon2 from '../assets/image/icon2.png'
import icon3 from '../assets/image/icon3.png'
import icon4 from '../assets/image/icon4.png'

import Headers from '../Components/Headers'
import Rubiks from '../Components/Rubiks'
import Footer from '../Components/Footer'
import CardNew from '../Components/CardNew'
const Home = () => {
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [splash, setSplash] = useState(false);
    const navigation = [
        { name: 'Text to Json', href: '/converter' },
        { name: 'Classroom', href: '/classroom' },
    ]
    const handleClick = () => {
        setSplash(true);
        navigate('/classroom');
    }
    return (
        <>
            <div className="bg-white mb-36">
                <header className="absolute inset-x-0 top-0 z-50">
                    <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
                        <div className="flex lg:flex-1">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">IT Professional Elective 3</span>
                                <img
                                    alt=""
                                    src={logo}
                                    className="h-20 w-auto"
                                />
                            </a>
                        </div>
                        <div className="flex lg:hidden">
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(true)}
                                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                            >
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="size-6" />
                            </button>
                        </div>
                        <div className="hidden lg:flex lg:gap-x-12">
                            {navigation.map((item) => (
                                <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-gray-900">
                                    {item.name}
                                </a>
                            ))}
                        </div>
                        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                            <a href="/login" className="text-sm/6 font-semibold text-gray-900">
                                Log in <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </nav>
                    <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                        <div className="fixed inset-0 z-50" />
                        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <a href="#" className="-m-1.5 p-1.5">
                                    <span className="sr-only">IT Professional Elective 3</span>
                                    <img
                                        alt=""
                                        src={logo}
                                        className="h-20 w-auto"
                                    />
                                </a>
                                <button
                                    type="button"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700"
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                </button>
                            </div>
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-500/10">
                                    <div className="space-y-2 py-6">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                    <div className="py-6">
                                        <a
                                            href="#"
                                            className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                                        >
                                            Log in
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </DialogPanel>
                    </Dialog>
                </header>

                <div className="relative isolate px-6 pt-14 lg:px-8">
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                        />
                    </div>
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                            <div className=" mx-auto flex justify-center align-center">
                                <CustomComponent onClick={handleClick} />
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl">
                                IT Professional Elective 3
                            </h1>
                            <p className="mt-8 text-pretty text-lg font-medium text-gray-500 sm:text-xl/8">
                                A specialized course designed to enhance advanced skills and knowledge in IT, focusing on emerging technologies, industry trends, or specific areas like networking, software development, data analytics, or cybersecurity. Tailored for IT students, it prepares them for real-world challenges and career growth in fast-paced tech environments.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <a
                                    href="#"
                                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Get started
                                </a>
                                <a href="/login" className="text-sm/6 font-semibold text-gray-900">
                                    Log in <span aria-hidden="true">→</span>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div
                        aria-hidden="true"
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                    >
                        <div
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                        />
                    </div>
                </div>
                <section className="flex justify-center items-center px-36">
                    <div className="flex items-start gap-4">
                        <img src={icon1} alt="icon1" className="size-20 rounded-lg object-cover" />

                        <div>
                            <h3 className="text-lg/tight font-medium text-gray-900">Specialized Skill Development</h3>

                            <p className="mt-0.5 text-gray-700">
                                Focuses on enhancing specific IT skills based on the elective's specialization, such as cybersecurity, data analytics, cloud computing, or software development.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <img src={icon2} alt="icon1" className="size-20 rounded-lg object-cover" />

                        <div>
                            <h3 className="text-lg/tight font-medium text-gray-900">Industry-Relevant Applications</h3>

                            <p className="mt-0.5 text-gray-700">
                            Covers practical applications of IT concepts and tools to address real-world problems, bridging the gap between academic knowledge and industry requirements.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <img src={icon3} alt="icon1" className="size-20 rounded-lg object-cover" />

                        <div>
                            <h3 className="text-lg/tight font-medium text-gray-900">Emerging Technologies and Trends</h3>

                            <p className="mt-0.5 text-gray-700">
                            Explores cutting-edge technologies, frameworks, and methodologies in IT, ensuring students stay updated with the latest advancements and best practices.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <img src={icon4} alt="icon1" className="size-20 rounded-lg object-cover" />

                        <div>
                            <h3 className="text-lg/tight font-medium text-gray-900">Project-Based Learning</h3>

                            <p className="mt-0.5 text-gray-700">
                            Includes hands-on projects or case studies to encourage innovation, problem-solving, and teamwork while applying the skills learned during the course.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
         
            <Footer/>
            {/* <div className="container mx-auto flex justify-center align-center h-screen">
                <CustomComponent onClick={handleClick}/>
            </div> */}




        </>

    )
}

export default Home