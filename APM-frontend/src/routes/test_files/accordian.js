import React, {useState} from "react";

const Accordion = ({ items }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);
  
    const handleOnToggle = (index) => {
      if (index === expandedIndex) {
        // If the user clicked the already open header,
        // close it
        setExpandedIndex(null);
      } else {
        setExpandedIndex(index);
      }
    };
    return (
      <div>
        {items.map((item, index) => (
          <AccordionHeader
            title={item.title}
            isOpen={index === expandedIndex}
            onToggle={() => handleOnToggle(index)}
          >
            {item.content}
          </AccordionHeader>
        ))}
      </div>
    );
  };

  const AccordionHeader = ({ title, isOpen, onToggle, children }) => {
    return (
      <section>
        <h3 onClick={onToggle}>{title}</h3>
        {isOpen && <p>{children}</p>}
      </section>
    );
  };

  export default function AccordianDiv() {
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