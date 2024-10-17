import React,{ useState } from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Files from "./Pages/Files";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/files" element={<Files/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
