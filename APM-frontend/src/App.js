import React, { useState, useEffect } from "react";
import "./App.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import background from "./image/sign-up-page-4.jpg";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import Register from "./routes/pre_login/register";
import Login from "./routes/pre_login/login";
import Dashboard from "./routes/post_login/userDashboard";
import CreateJournal from "./routes/post_login/userCreateJournal";
import Collapsible from "./routes/test_files/test";
import AccordianDiv from "./routes/test_files/accordian";
import AllJournal from "./routes/post_login/allJournal";
import AboutUs from "./routes/pre_login/about_us";


export default function ControlledComponent() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.clear();
    window.location.href = "./login";
    setIsLoggedIn(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover", // Adjust background image size
        backgroundRepeat: "no-repeat", // Prevent image repetition
        backgroundColor: "blue", // You can use a color as a fallback
        minHeight: "100vh", // Set minimum height to 100vh
        height: "auto",
      }}
    >
      <>
        <Navbar bg="light" data-bs-theme="light">
          <Container>
            <Navbar.Brand href={ isLoggedIn ? '/userDashboard' : '/login'}>AMP</Navbar.Brand>
            <Nav className="me-auto">
              {/* Conditionally render Logout link */}
              {isLoggedIn ? (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              ) : (
                <>
                  <Nav.Link href="register">Register</Nav.Link>
                  <Nav.Link href="login">Login</Nav.Link>
                  <Nav.Link href="/">About Us</Nav.Link>
                  
                </>
              )}
            </Nav>
          </Container>
        </Navbar>
      </>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ isLoggedIn ? <Dashboard />:<AboutUs />} />
          <Route path="/register" element={ <Register />} />
          <Route path="/login" element={ <Login />} />
          <Route path="/userDashboard" element={ <Dashboard />} />
          <Route path="/journal/all" element={ <AllJournal />} />
          <Route path="/userCreateJournal" element={ <CreateJournal />} />
          <Route path="/test" element={<Collapsible/>} />
          <Route path="/accordian" element={<AccordianDiv />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

// export default App;
