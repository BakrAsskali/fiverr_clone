import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/navbar.js";
import { Login } from "/home/bakaria19/Documents/Web/fiverr_clone/client/src/pages/login/login";
import { Signup } from "/home/bakaria19/Documents/Web/fiverr_clone/client/src/pages/signup/signup";
import { Homepage } from "/home/bakaria19/Documents/Web/fiverr_clone/client/src/pages/homepage/homepage";
import { Client } from "/home/bakaria19/Documents/Web/fiverr_clone/client/src/components/client/client";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/client" element={<Client />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
