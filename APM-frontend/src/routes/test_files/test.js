
import React, {useState} from 'react'
import { Button, Card } from 'react-bootstrap';



const expandOrCollapse=(e)=>{
  const identity='content-'+e.target.value;
  const content_div=document.getElementById(identity);

  if(content_div.style.display=='none'){
    document.querySelectorAll('p').forEach(function(content){
      if(content.style.display=='block'){
        content.style.display='none';
      }
    })
    content_div.style.display='block';
  }else{
    content_div.style.display='none';
  }
}
function Accordion(props){

  const array_items=props.items.map(function(item,index){
  
    return <Card className='m-2 row'>
      <Button className="btn btn-success" onClick={expandOrCollapse} id={'title-'+index} value={index}>
        {item.title}
      </Button>
      <p style={{display:'none'}} id={'content-'+index}>{item.content}</p>
    </Card>
  })
  return array_items;
}
export default function Collapsible() {
  
  return <Accordion items={[
    {
      title: "What is Github and how does it work?",
      content:
        "GitHub is the home for all developers—a platform where you can share code, contribute to open source projects, or even automate your workflow with tools like GitHub Actions and Packages. If you’re just getting started with GitHub, you may know us best as a place for version control and collaboration.",
    },
    {
      title: "How do I see GitHub's availability?",
      content: "Check our real-time status report",
    },
    {
      title: "Why is GitHub so popular?",
      content:
        "GitHub is built by developers for developers, and we’re proud to be home to the world’s largest open source community. With 50 million developers and millions more open source projects, GitHub has become the go-to place to collaborate and build software together.",
    },
 ]}/>
  
}

// run your code by clicking the run button on the right




