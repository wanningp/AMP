import React, { Component } from "react";
import axios from "axios";
import { Container, Col, Row, Button } from "react-bootstrap";
import { Navigate } from "react-router";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { userData: "" };
  }

  componentDidMount() {
    const token = window.localStorage.getItem("token");
    const backend_base_url = process.env.REACT_APP_BACKEND_APM_BASE_URL;

    axios
      .post(
        `${backend_base_url}api/userDashboard`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        const data = res.data;
        this.setState({ userData: data.data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }

  render() {
    const token = window.localStorage.getItem("token");

    if(token){
      return (
        <div>
          <Container>
            <Row
              className="justify-content-center align-items-center"
              style={{ height: "150px" }}
            >
              <Col xs={12} md={12} className="text-center">
                <h1
                  className="fw-normal p-5 fw-bold"
                  style={{ color: "#808080", opacity: "75%" }}
                >
                  Welcome back {this.state.userData.name}
                </h1>
                <h5 className="fw-normal">What would you like to do today?</h5>
                <Col className="pt-2"><Button variant="light" onClick={()=>{window.location.href = "/journal/all";}}>See All Journals</Button></Col>
                <Button
                  variant="light"
                  style={{ margin: "20px" }}
                  onClick={()=>{window.location.href = "/userCreateJournal"}}
                >
                  Write a journal
                </Button>
                <Button
                  variant="light"
                  style={{ margin: "20px" }}
                  onClick={()=>{window.location.href = "/userCreateJournal";}}
                >
                  Track Finances
                </Button>
              </Col>
            </Row>
            <Row className="justify-content-center align-items-center"></Row>
          </Container>
        </div>
      );
    }else{
      return <Navigate to="/login"/>
    }
    
  }
}
