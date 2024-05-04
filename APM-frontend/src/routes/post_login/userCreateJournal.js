import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useNavigate,Redirect, Navigate } from "react-router-dom";
import Forbidden from "../../components/403";
import  "../../css/dev.css";

export default function CreateJournal() {
  const [title, setTitle] = useState("");
  const [editorData, setEditorData] = useState("");
  let navigate=useNavigate();

  const backend_base_url = process.env.REACT_APP_BACKEND_APM_BASE_URL;

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post(
        `${backend_base_url}api/userCreateJournal`,
        { title: title, content: editorData, user_id: user },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((data)=>{
        console.log(data);
        if(data.status===200){
          alert('Journal with Title: '+data.data.entry.title+" has been created");
          navigate("/userDashboard");         
        }else{
          alert('Error: '+ data.data.message +" - "+data.data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  if(token){
    return <div>
      <Container>
        <Col>
          <Button onClick={()=>navigate(-1)} className="m-2">Back to Dashboard</Button>
          <Row className="text-center">
            <Form onSubmit={handleSubmit}>
              <Card  className="mt-2 cardStyle">
                <div className="justify-content-center align-items-center">
                  <h4
                    style={{
                      fontFamily: "Verdana, sans-serif",
                    }}
                  >
                    JOURNAL
                  </h4>
                  <p
                    style={{
                      color: "gray",
                      fontFamily: "Verdana, sans-serif",
                    }}
                  >
                    Start writing your journal here...
                  </p>
                  <div className="align-items-center p-2">
                      <Form.Control
                        id="title"
                        type="text"
                        placeholder="Title"
                        onChange={handleChange}
                        required
                      />
                  </div>
                </div>
                <div className="p-2">
                  <CKEditor
                    editor={ClassicEditor}
                    data={editorData}
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      setEditorData(data);
                    }}
                  />
                </div>
              </Card>
              <Button
                className="m-2"
                type="submit">
                Submit
              </Button>
            </Form>
          </Row>
        </Col>
      </Container>
    </div>
  }
  else{
    return <Navigate to="/login" />
  }
}
