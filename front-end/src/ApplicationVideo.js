import { Row, Container } from "react-bootstrap";
import { React, useEffect } from "react";
import Menu from "./Menu";
import Bottom from "./Bottom";
import './PostInterviewCandidate.css';

import { useParams } from 'react-router-dom';
const data = {
    Kaleb: "https://www.youtube.com/embed/Wf5bmG1AZJU?rel=0",
    Gary: "https://www.youtube.com/embed/ovDe5MYcpiM?rel=0",
    Vanessa: "https://www.youtube.com/embed/-3ipApuGVHo?rel=0",
    Corinne: "https://www.youtube.com/embed/TlEhSHdFUQ0?rel=0",
    Reagan: "https://www.youtube.com/embed/DBnR7GZQMSU?rel=0",
};

function ApplicationVideo() {
    const { name, school} = useParams();
    const videoSrc = data[name];
    
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
                    <h2 id="school">Meet {name} ({school})</h2>
                </Row>
                <Row>
                    <h3 id="instruc">Please close the tab after watching the video to return to the exercise</h3>
                </Row>
                <iframe title="candiate-video" src={videoSrc} width="854" height="480" allow="autoplay"></iframe>
                <Row id="button">
                    <div className="text-center">
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




export default ApplicationVideo;