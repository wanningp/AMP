import React from 'react';
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import dev from '../css/dev.css'
import { useNavigate } from 'react-router';

export default function Forbidden(){
  let navigate=useNavigate();

    return <Container className="p-3 ">
    <Row
    className="justify-content-center align-items-center"
    style={{ height: "150px" }}
  >
      <Col xs={12} md={6} className="text-center">
        <h1 className="fw-normal">403 Error</h1>
        <h5 className="fw-normal">FORBIDDEN</h5>
      </Col>
    </Row>
    <Row className="justify-content-center align-items-center">
      <Col xs={12} md={6} className="text-center">
        <Card className={`${dev.cardStyle } border-0 justify-content-center align-items-center`}>
          <h3 class="mt-3">Please log in</h3>
          <Button className="mb-3" onClick={(e)=>{ navigate("/login")}}>Login</Button>
        </Card>
      </Col>
    </Row>
  </Container>
}