import React, { useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/dev.css";
import { Navigate } from "react-router";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [userError, setUserError] = useState("");
  const token = localStorage.getItem("token");


  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const [passwordShown, setPasswordShown] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setConfirmPasswordError("- Passwords do not match");
      return;
    } else {
      setConfirmPasswordError("");
    }
    const response = await axios.get(`/api/checkUserExist/${email}`);
    if (response.data.exists) {
      setUserError("- User with this email already exists");
      return;
    } else {
      setUserError("");
    }

    alert(`Name:${name},Email:${email}`);
    const formData = { name, email, password };
    try {
      await axios.post("/api/users", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Form submitted successfully!");
      window.location.href = "/login";
    } catch (error) {
      // Handle errors
      console.error("Error submitting form:", error);
    }
  };

  if(!token){
    return (
      <Container className="p-3 ">
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={12} className="text-center">
            <h1 className="fw-normal p-2">Welcome to AMP</h1>
            <h5 className="fw-normal pb-3">Set your goals with us today!</h5>
            <Card
              className="border-0 cardStyle justify-content-center align-items-center">
              <p className="fw-bold">Register with us now!</p>
              <Card.Body className="d-flex flex-column ">
                <Form onSubmit={handleSubmit}>
                  <Row className="align-items-center mt-2">
                    Name:
                    <Col>
                      <Form.Control
                        id="name"
                        type="text"
                        onChange={handleName}
                        placeholder="Name"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center mt-2">
                    Email:
                    <Col>
                      <Form.Control
                        id="email"
                        type="email"
                        onChange={handleEmail}
                        placeholder="Email"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="align-items-center mt-2">
                    Password:
                    <Col className="pr-0">
                      <Form.Control
                        id="password"
                        type={passwordShown ? "text" : "password"}
                        placeholder="Password"
                        onChange={handlePassword}
                        required
                      />
                    </Col>
                    <Col xs="auto" className="p-0"></Col>
                  </Row>
                  <Row className="align-items-center mt-2">
                    Confirm Password:
                    <Col className="pr-0">
                      <Form.Control
                        id="confirm-password"
                        type={passwordShown ? "text" : "password"}
                        placeholder="Confirm Password"
                        onChange={handleConfirmPassword}
                        required
                      />
                    </Col>
                    <Col xs="auto" className="p-0"></Col>
                  </Row>
                  {confirmPasswordError && (
                    <div style={{ color: "red" }}>{confirmPasswordError}</div>
                  )}
                  {userError && <div style={{ color: "red" }}>{userError}</div>}
                  <Row className="pt-4 justify-content-center align-items-center">
                    <Button type="submit" variant="primary" className="mt-2">
                      Submit
                    </Button>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
            <a className="mt-2" href="/login">Have an existing account with us? Login here!</a>
          </Col>
        </Row>
      </Container>
    );
  }else{
    return <Navigate to="/userDashboard"/>
  }
}
