import { Button, Card, Col, Container, Row } from "react-bootstrap";
import "../../css/dev.css";
import founderimg from '../../image/founder-profile.jpeg';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"


export default function AboutUs(){
    return <div class="container">
        <Col xs={12} md={12} className="text-center">
            <div className="p-4 cardStyle center">
                <strong className="text-uppercase text-muted text-center">About the Creator</strong>
                <div className="text-center p-2">
                    <img style={{borderRadius:'50%'}} src={founderimg} width="100" height="auto" />
                </div>
                <p className="small">Hello! My name is Wan Ning. I don't used
                to have a passion/hobby but ever since I started coding, it has since become my passion/hobby.
                </p>
                <strong className="pt-2 text-muted small">Connect with me!</strong><br></br>
                <a href="https://www.linkedin.com/in/wan-ning-poh-b4a84822b/" target="_blank"><FontAwesomeIcon icon={faLinkedin}/></a>
            </div> 
        </Col>
    </div>
}