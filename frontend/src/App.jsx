import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Files from "./Pages/Files";
import Classroom from "./Pages/Classroom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer } from 'react-toastify';
import NotFoundPage from "./NotFoundPage";
import Register from "./Pages/Register";
import EmailActivationPage from "./Pages/EmailActivationPage";
import EmailActivatedPage from "./Pages/EmailActivatedPage";
import ProtectedRoute from "./Routes/ProtectedRoute";
import ConverterSection from "./Components/ConverterSection";
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
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/classroom" element={
          <ProtectedRoute><Classroom /></ProtectedRoute>} />
        <Route path="/email-activation" element={<EmailActivationPage />} />
        <Route path="/confirm/:token" element={<EmailActivatedPage />} />
        <Route path="/converter" element={<ConverterSection/>}/>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer position="bottom-right" />
    </BrowserRouter>
  );
}

export default App;
