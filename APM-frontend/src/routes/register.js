import React, { useState } from "react";
import { Card, Row, Col, Form, Alert } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Register() {
  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.7)", // The last value (0.5) represents the opacity (translucency)
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a box shadow for a nice effect
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [userError, setUserError] = useState("");

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
    if (password != confirmPassword) {
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
    console.log(formData);
    try {
      const response = await axios.post("/api/users", formData, {
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
  return (
    <Container className="p-3 ">
      <Row
        className="justify-content-center align-items-center"
        style={{ height: "150px" }}
      >
        <Col xs={12} md={6} className="text-center">
          <h1 className="fw-normal">Welcome to AMP</h1>
          <h5 className="fw-normal">Set your goals with us today!</h5>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col xs={12} md={6} className="text-center">
          <Card
            className="border-0 justify-content-center align-items-center"
            style={cardStyle}
          >
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
        </Col>
      </Row>
    </Container>
  );
}
