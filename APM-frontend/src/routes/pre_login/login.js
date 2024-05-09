import React, { useState } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import axios from "axios";
import "../../css/dev.css";
import { Navigate } from "react-router";

export default function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const backend_base_url = process.env.REACT_APP_BACKEND_APM_BASE_URL;
  const token = window.localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = { email, password };
     axios
      .post(
        `${backend_base_url}api/auth/signin`,
        JSON.stringify(formData),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((data) => {
        console.log(data.data.status, "signin");
        if (data.data.status === "ok") {
          setErrorMessage("");
          alert("login success");
          window.localStorage.setItem("token", data.data.data);
          window.localStorage.setItem("user", data.data.user);

          window.location.href = "./userDashboard";
        } else {
          setErrorMessage(`${data.data.message}`);
        }
      }).catch((error)=>{
        });
  };

  if(!token){
      return (
        <Container className="p-3 ">
          <Row className="justify-content-center align-items-center">
            <Col xs={12} md={12} className="text-center">
              <h1 className="fw-normal p-2">Welcome to AMP</h1>
              <h5 className="fw-normal">Set your goals with us today!</h5>
              <Card
                className="border-0 cardStyle justify-content-center align-items-center mb-2 mt-3">
                <p className="fw-bold">LOGIN</p>
                <Card.Body className="d-flex flex-column ">
                  <Form onSubmit={handleSubmit}>
                    <Row className="align-items-center mt-2">
                      Email:
                      <Col>
                        <Form.Control
                          type="text"
                          onChange={(e) => setEmail(e.target.value)} required
                        />
                      </Col>
                    </Row>
                    <Row className="align-items-center mt-2">
                      Password:
                      <Col>
                        <Form.Control
                          type="password"
                          onChange={(e) => setPassword(e.target.value)} required
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
              <a className="mt-2" href="/register">Do not have an account? Register with us!</a>
            </Col>
          </Row>
        </Container>
      );
  }else{
    return <Navigate to="/userDashboard"/>
  }

}
