import React,{ useState, useEffect} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Files from "./Pages/Files";
import Classroom from "./Pages/Classroom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import {ToastContainer} from 'react-toastify';
import NotFoundPage from "./NotFoundPage";
function App() {
  useEffect(() => {
    AOS.init({
      duration: 500, // Duration of animation (in ms)
      easing: 'ease-in-out', // Easing function for animation
      once: false, // Whether animation should happen only once - while scrolling down
      mirror: true, // Whether elements should animate out while scrolling past them
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/classroom" element={<Classroom/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      <ToastContainer position="bottom-right"/>
    </BrowserRouter>
  );
}

export default App;
