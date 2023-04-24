import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";
import { Client } from "./pages/client/client";
import { Freelancer } from "./pages/freelancer/freelancer";
import { Gig } from "./pages/gig/gig";
import { Gigs } from "./pages/gigs/gigs";
import { Homepage } from "./pages/homepage/homepage";
import { Login } from "./pages/login/login";
import { Signup } from "./pages/signup/signup";

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
          <Route path="/freelancer" element={<Freelancer />}></Route>
          <Route path="/gigs" element={<Gigs />}></Route>
          <Route path="/gigs/:id" element={<Gig />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
