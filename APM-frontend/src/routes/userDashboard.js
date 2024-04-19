import React, { useState, Component, useNavigate } from "react";
import axios from "axios";
import { Container, Col, Row, Button } from "react-bootstrap";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { userData: "" };
  }
  componentDidMount() {
    const token = window.localStorage.getItem("token");

    axios
      .post(
        "http://localhost:8000/auth/userDashboard",
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

  handleRouteChange = () => {
    // Use this.props.history.push() to navigate
    window.location.href = "/userCreateJournal";
  };

  render() {
    return (
      <div>
        <Container>
          <Row
            className="justify-content-center align-items-center"
            style={{ height: "150px" }}
          >
            <Col xs={12} md={8} className="text-center">
              <h1
                className="fw-normal p-5 fw-bold"
                style={{ color: "#808080", opacity: "75%" }}
              >
                Welcome back {this.state.userData.name}
              </h1>
              <h5 className="fw-normal">What would you like to do today?</h5>
              <Button
                variant="light"
                style={{ margin: "20px" }}
                onClick={this.handleRouteChange}
              >
                Write a journal
              </Button>
              <Button
                variant="light"
                style={{ margin: "20px" }}
                onClick={this.handleRouteChange}
              >
                Track Finances
              </Button>
            </Col>
          </Row>
          <Row></Row>
        </Container>
      </div>
    );
  }
}
