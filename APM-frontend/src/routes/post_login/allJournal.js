import React, { useState,useEffect, Component} from "react";
import parse from 'html-react-parser';
import { Button, Card, Col } from "react-bootstrap";
import dateFormat from 'dateformat';
import { Navigate, useNavigate } from "react-router";

export default function AllJournal(){
    const [data,setData]=useState([])
    const [activeTab,setActiveTab]=useState("");
    const token = localStorage.getItem("token")
    const backend_base_url = process.env.REACT_APP_BACKEND_APM_BASE_URL;
    let navigate=useNavigate();


    useEffect(() => {
        
        fetch(`${backend_base_url}api/journal/all`,{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Parse the response body as JSON
        })
        .then(data => {
            console.log('Data received:', data.entry); // Log the parsed data
            setData(data.entry);
            // Further processing of the data can be done here
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });

        
    },[]);
    const handleClick= (e)=>{
        const element = document.querySelector('#content-' + e.target.id);
        setActiveTab('content-' + e.target.id);
    }
    if(token){
       if(data){
            return (<div>
                <Col>
                <Button onClick={()=>navigate(-1)} className="mx-4 my-2">Back to Dashboard</Button>
                {data.map((entry,index) => (
                    <div className="py-2 px-4">   
                        <Button variant="light" className="text-uppercase active" onClick={handleClick} id={entry.id} style={{width:'100%'}}><strong>{entry.title}</strong></Button>
                        <Card className="p-3"  id={'content-'+entry.id}>
                            <p className="text-center text-muted small">{entry.user.name} - {dateFormat(entry.createdAt, "dS mmm yyyy, ddd, h:mm TT ")}</p>
                            {parse(entry.content)}
                        </Card>
                    </div>
                ))}
                </Col>
            </div>
            );

        }
        return <div>No Entries</div>; 
    }else{
        return <Navigate to="/login"/>
    }
    
}