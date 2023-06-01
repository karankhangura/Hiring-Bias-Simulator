import { Row, Col, Button, Form, Container } from "react-bootstrap";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Background from "./assets/interviews_bg.jpg";
import Menu from "./Menu";
import Bottom from "./Bottom";
import axios from 'axios';


import './Interviews.css'
const Header = () => {
  return (
    <Row style={{ backgroundColor: "black", padding: "100px 20%", color: "white" }}>
      <h1>
        Candidate Application Videos
      </h1>

      <Row>
        <Col lg={6} >
          <p>
            In order to apply for the position at Wallflower, each candidate submitted a video introducing themselves and why they would be most qualified for the position at Wallflower.
          </p>
        </Col>

        <Col lg={6} >
          <p>
          Please review each candidate’s application video and take notes (on your scratch piece of paper).  After the videos, you will select your top and bottom choices based on the videos alone.  You will ultimately choose the applicant who is most qualified for the position on the next screen.
          </p>
        </Col>
      </Row>

    </Row>

  );
}


const ResumeForm = ({ name, setSelectedChoice }) => {
  const [selectedResume, setSelectedResume] = useState("");

  const handleChange = (event) => {
    setSelectedResume(event.target.value);
    setSelectedChoice(name, event.target.value);
  };

  return (
    <Container style={{ textAlign: "left" }}>
      <Form>
        <Form.Group>
          <Form.Check
            type="radio"
            label="Arizona (Kaleb)"
            value="Kaleb"
            checked={selectedResume === "Kaleb"}
            onChange={handleChange}
            name="resume"
          />
          <Form.Check
            type="radio"
            label="Cal Poly San Luis Obispo (Vanessa)"
            value="Vanessa"
            checked={selectedResume === "Vanessa"}
            onChange={handleChange}
            name="resume"
          />
          <Form.Check
            type="radio"
            label="Cal Davis (Gary)"
            value="Gary"
            checked={selectedResume === "Gary"}
            onChange={handleChange}
            name="resume"
          />
          <Form.Check
            type="radio"
            label="Washington State (Corinne)"
            value="Corinne"
            checked={selectedResume === "Corinne"}
            onChange={handleChange}
            name="resume"
          />
          <Form.Check
            type="radio"
            label="Oregon (Reagan)"
            value="Reagan"
            checked={selectedResume === "Reagan"}
            onChange={handleChange}
            name="resume"
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

const VideoList = (props) => {

  const videos = [
    { state: 'Arizona', name: "Kaleb", url: 'https://www.youtube.com/embed/Wf5bmG1AZJU?rel=0' },
    { state: 'Cal Davis', name: "Gary", url: 'https://www.youtube.com/embed/ovDe5MYcpiM?rel=0' },
    { state: 'Cal Poly', name: "Vanessa", url: 'https://www.youtube.com/embed/-3ipApuGVHo?rel=0' },
    { state: 'Oregon', name: "Reagan", url: 'https://www.youtube.com/embed/DBnR7GZQMSU?rel=0' },
    { state: 'Washington', name: "Corinne", url: 'https://www.youtube.com/embed/TlEhSHdFUQ0?rel=0' },
  ];

  return (
    <Container style={{ maxWidth: "100%", padding: "0" }}>
      <Row className="position-relative" style={{ height: "100%", width: "100%", margin: "0" }}>
        <div className="video-list position-relative" style={{ padding: "114px 20%", zIndex: 1 }}>
          <h2 style={{ padding: "40px 0" }}>Application Videos</h2>
          <div style={{ borderTop: "1px solid #eaeaea" }}>
            {videos.map((video) => (
              <div key={video.state} className="d-flex justify-content-between align-items-center" style={{ borderBottom: "1px solid #eaeaea", padding: "4% 0" }}>
                <h5>{video.state}</h5>
                <Link to={`/application-video/${video.name}/${video.state}`} target="_blank"><Button>View Video</Button> </Link>
                
              </div>
            ))}
          </div>
        </div>
        <div className="position-absolute w-100 h-100" style={{ backgroundImage: `url(${Background})`, zIndex: 0, backgroundPosition: "center center" }}>
          <div className="position-absolute w-100 h-100" style={{ backgroundColor: "#777777", opacity: 0.37 }}></div>
        </div>
      </Row>
    </Container>
  );
}


const Interviews = () => {
  const [selectedChoices, setSelectedChoices] = useState({
    topchoice: "",
    bottomchoice: "",
  });

  const setSelectedChoice = (name, value) => {
    setSelectedChoices((prevChoices) => {
      return { ...prevChoices, [name]: value };
    });
  };

  const submitVotes = async () => {
    const data = { topchoice: selectedChoices.topchoice, bottomchoice: selectedChoices.bottomchoice };
    axios.post('https://wallflowerbackend.elcexercises.org/api/addinfluence/api/addvideochoice', data)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      })
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, []);

  return (
    <div className="interviews">
      <Menu />

      <Header />

      <VideoList />

      <Row style={{ backgroundColor: "black", padding: "144px 25%" }}>
        <div style={{ maxWidth: "1200px" }}>

          <div style={{ color: "#ffff", textAlign: "center" }}>

            <h2 style={{ fontWeight: "400", fontSize: "35px" }}>
              Instructions
            </h2>
            <p>
              After you review each applicant’s video, please take a moment to determine which candidate you believe was the most qualified for the position (using the applicant’s video as your sole reference).
            </p>

            <p>
              Once ready please move on to the next section.
            </p>
          </div>

          <div style={{ backgroundColor: "white", padding: "2%", borderRadius: "20px" }}>
            <h4 style={{ padding: "10px" }} >Who did you select for your top application video choice:</h4>
            <ResumeForm name="topchoice" setSelectedChoice={setSelectedChoice} />
            <h4 style={{ padding: "10px" }} >Who did you select for your bottom application video choice:</h4>
            <ResumeForm name="bottomchoice" setSelectedChoice={setSelectedChoice} />
            <Link to="/post-interview"> <Button variant="outline-secondary" onClick={submitVotes}>Vote</Button>{' '} </Link>

          </div>
        </div>

      </Row>
      <Bottom />
    </div>

  );
}

export default Interviews;