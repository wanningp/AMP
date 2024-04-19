import React, { useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";

import PropTypes from "prop-types";
import axios from "axios";
import { Button } from "react-bootstrap";

export default function Login() {
  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.7)", // The last value (0.5) represents the opacity (translucency)
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add a box shadow for a nice effect
  };
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { email, password };
    fetch("http://localhost:8000/api/auth/signin", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "signin");
        if (data.status == "ok") {
          setErrorMessage("");
          alert("login success");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("user", data.user);

          // window.localStorage.setItem("email", data.email);
          window.location.href = "./userDashboard";
        } else {
          setErrorMessage(`${data.message}`);
        }
      });
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
            <p className="fw-bold">LOGIN</p>
            <Card.Body className="d-flex flex-column ">
              <Form onSubmit={handleSubmit}>
                <Row className="align-items-center mt-2">
                  Email:
                  <Col>
                    <Form.Control
                      type="text"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </Row>
                <Row className="align-items-center mt-2">
                  Password:
                  <Col>
                    <Form.Control
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Row>
                <div>
                  {errorMessage && (
                    <div style={{ color: "red" }}>{errorMessage}</div>
                  )}
                  <Button type="submit" className="mt-2">
                    Submit
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}