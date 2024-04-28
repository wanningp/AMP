import React, { useState } from "react";
import axios from "axios";
import { Container, Row, Col, Form, Card, Button } from "react-bootstrap";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CreateJournal() {
  const [title, setTitle] = useState("");
  const [editorData, setEditorData] = useState("");

  const backend_base_url = process.env.REACT_APP_BACKEND_APM_BASE_URL;

  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  const cardStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    axios
      .post(
        `${backend_base_url}auth/userCreateJournal`,
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
        if(data.data.status===201){
          alert('Journal with Title: '+data.data.entry.title+" has been created");
          window.location.reload();          
        }else{
          alert('Error: '+ data.data.message +" - "+data.data.error);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div>
      {token ? (
        <div>
          <Container>
            <Row className="justify-content-center align-items-center">
              <Col className="text-center"></Col>
            </Row>
            <Row className="text-center">
              <Form onSubmit={handleSubmit}>
                <Card style={cardStyle} className="mt-2">
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
                    <Row className="align-items-center mt-2">
                      <Col></Col>
                      <Col>
                        <Form.Control
                          id="title"
                          type="text"
                          style={{ width: "100vh" }}
                          placeholder="Title"
                          onChange={handleChange}
                          required
                        />
                      </Col>
                      <Col></Col>
                    </Row>
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
                  type="submit"
                  style={{ backgroundColor: "gray" }}
                >
                  Submit
                </Button>
              </Form>
            </Row>
          </Container>
        </div>
      ) : (
        <div>
          <h1>Please log in</h1>
        </div>
      )}
    </div>
  );
}
