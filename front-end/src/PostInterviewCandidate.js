import { Row, Button, Container } from "react-bootstrap";
import { React, useEffect } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Bottom from "./Bottom";
import './PostInterviewCandidate.css';
import axios from "axios";

import { useParams } from 'react-router-dom';
const data = {
    1: "https://www.youtube.com/embed/j0BwvBrs2LI?rel=0",
    2: "https://www.youtube.com/embed/291WRw8eKeQ?rel=0",
    3: "https://www.youtube.com/embed/DI6BwECmqAE?rel=0",
    4: "https://www.youtube.com/embed/A6P5f-HF7xc?rel=0",
    5: "https://www.youtube.com/embed/rli1sWFpJK0?rel=0",
};

const submitName = (school) => {
    const data = { choice: school };
    axios.post('https://wallflowerbackend.elcexercises.org/api/addpreferredchoice', data)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    console.log("submitName");
}

function PostInterviewCandidate() {
    const { school, id } = useParams();
    const videoSrc = data[id];
    
    useEffect(() => {
        window.scrollTo({
          top: 0,
          behavior: 'instant'
        });
      }, []);

    return (
        <Container fluid>

            <Header />

            <Container fluid id="video">
                <Row>
                    <h2 id="school">{school}</h2>
                </Row>
                <iframe title="candiate-video" src={videoSrc} width="854" height="480" allow="autoplay"></iframe>
                <Row id="button">
                    <div className="text-center">
                        <Link onClick={() => submitName(school)} to="/Complete"><Button variant="primary" className="btn-block d-inline-block">CLICK HERE TO FINAL SECTION</Button></Link>
                    </div>
                </Row>




            </Container>

            <footer className="Footer-home" >
                <Bottom />
            </footer>
        </Container>
    );
}


const Header = () => {
    return (
        <header className="Top-of-page-header-in">
            <Menu />
        </header>
    );
}




export default PostInterviewCandidate;