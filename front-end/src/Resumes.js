import { React, useEffect, useState } from 'react';
import { Link } from "react-router-dom";


import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Resumes.css';
import { faEdit, faBank, faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import Menu from './Menu'
import Bottom from "./Bottom";

import Arizona from "./assets/arizona.jpg";
import CalDavis from "./assets/UCDavis.jpg";
import CalPoly from "./assets/slo.jpg";
import Oregon from "./assets/oregon.jpg";
import Washington from "./assets/WashingtonState.jpg";

const ImageCol = (props) => {
  return (
    <Col lg={4} style={{ position: 'relative', height: "100%", padding: '0px' }} >

      <div className="background-image" style={{ backgroundImage: `url(${props.image})`, position: 'relative', height: "100%", padding: '0px' }} />

      <div className='image-col' style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <h2 style={{ marginBottom: '10px' }}>{props.state}</h2>
        <p>{props.major}</p>
        <p>{props.interest}</p>

      </div>
    </Col>
  );
};
const Reason = (props) => {
  return (
    <Col lg={4} className="column-padding">
      <FontAwesomeIcon icon={faEdit} size="3x" />
      <h4>Reason For Applying</h4>
      <p>{props.reason}</p>
    </Col>
  );
};

const ExperienceCol = (props) => {
  // Create an array of list items based on the `experience` prop
  const experienceList = props.experience.map((exp, index) => <li key={index}>{exp}</li>);

  return (
    <Col lg={4} className="column-padding">
      <FontAwesomeIcon icon={faBank} size="3x" />
      <h4>Work Experience</h4>

      <ul>
        {experienceList}
      </ul>
    </Col>
  );
};

const VolunteerCol = (props) => {
  return (
    <Col lg={4} className="column-padding">
      <FontAwesomeIcon icon={faUsers} size="3x" />
      <h4>Volunteer Work</h4>
      <p> {props.volunteer} </p>
    </Col>
  )
}

const ContentCol = (props) => {
  return (

    <Col lg={8}>
      <Row className='light-text' style={{ padding: "10px" }}>

        <Reason reason={props.reason} />

        <ExperienceCol experience={props.experience} />

        <VolunteerCol volunteer={props.volunteer} />

      </Row>

    </Col>

  );
};

const Resume = (props) => {
  return (

    <Container className="resumes-container" fluid style={{ width: '100%', marginLeft: "0px" }}>
      <Row className="align-items-center" style={{ padding: '0px', height: '1000px', flexWrap: "inherit" }}>

        <ImageCol style={{ top: '0px' }} image={props.image} state={props.state} major={props.major} interest={props.interest} />

        <ContentCol
          reason={props.reason}

          experience={props.experience}

          volunteer={props.volunteer}

        />
      </Row>
    </Container>


  );
};

const Header = () => {
  return (
    <Row style={{ backgroundColor: "black", padding: "100px 20%", color: "white" }}>
      <h1>
        Submitted Application Responses
      </h1>

      <Row>
        <Col lg={6} >
          <p>
            Applicants applying to the Wallflower position were required to respond to a list of questions about their schooling, work experience, volunteer work, and reason for applying to Wallflower. This information is below.
          </p>
        </Col>

        <Col lg={6} >
          <p>
            On a scratch piece of paper please note which applicant’s response best qualifies them for the role Wallflower is looking to fulfill. Also please note the least qualified.
          </p>
        </Col>
      </Row>

    </Row>

  );
}

const ResumeForm = ({name, setSelectedChoice}) => {
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
            label="Arizona"
            value="Arizona"
            checked={selectedResume === "Arizona"}
            onChange={handleChange}
            name="resume"
          />
          <Form.Check
            type="radio"
            label="Cal Poly San Luis Obispo"
            value="Cal Poly"
            checked={selectedResume === "Cal Poly"}
            onChange={handleChange}
            name="resume"
          />
          <Form.Check
            type="radio"
            label="Cal Davis"
            value="Cal Davis"
            checked={selectedResume === "Cal Davis"}
            onChange={handleChange}
            name="resume"
          />
          <Form.Check
            type="radio"
            label="Washington State"
            value="Washington"
            checked={selectedResume === "Washington"}
            onChange={handleChange}
            name="resume"
          />
          <Form.Check
            type="radio"
            label="Oregon"
            value="Oregon"
            checked={selectedResume === "Oregon"}
            onChange={handleChange}
            name="resume"
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

const Resumes = (props) => {
  const experienceList = [
    "UAg Vertical Farm at the University of Arizona Student Worker responsible for maintaining the experimental vertical farm as directed by the faculty and staff.",
    "Arizona Department of Agriculture Analyst responsible for tracking land usage and productivity. Created a newsletter to farmers that provided news on the latest research for improving yields."
  ]
  const experienceList2 = [
    "In Your Backyard, LLC, Owner.  Created this company to design, build, and maintain home gardens.  Our motto is “We do the work and you eat the profits.”",
    "UC Davis Arboretum and Public Garden Operations Engineer responsible for designing and managing the public garden.",
    "Peace Corps Volunteer in Mali teaching farming techniques."
  ];

  const experienceList3 = [
    "Growing Grounds Farm, Operations Manager primarily responsible for coordinating the many volunteers who maintain the gardens and encouraging partnerships with mental health providers.",
    "United States Marine Corps, Corporal with service in Afghanistan and Ghana.  Involved in “Hearts and Minds” operations focusing on building food infrastructures.",
    "Brock Center for Agricultural Communication at California Polytechnic State University, San Luis Obispo Student Worker.  As a work-study student, assisted in researching and communicating information beneficial to the local agricultural community."
  ];
  const experienceList4 = [
    "The Environmental Center, Bend, Oregon, Communication Director responsible for communicating the need and ways to care for the environment.  Developed social media sites to engage the community in environmental issues.  Worked with students at the University of Oregon in designing a game to learn about actions that can be taken to protect the environment.",
    "REI, Bend, Oregon, Sales Associate responsible for hiking equipment sales and organizing hikes for interested customers."
  ];

  const experienceList5 = [
    "World Food Travel Association, Social Media Marketing Manager responsible for creating and managing communication about Culinary Tourism.",
    "Eggert Family Organic Farm at Washington State University, Student Worker.  As a work-study student assigned to the vegetable gardens of the farm, I experienced all aspects of bringing crops to harvest."
  ];

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
    axios.post('https://wallflowerbackend.elcexercises.org/api/addapplicationchoice', data)
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
    <div className='resumes'>
      <Menu />
      <Header />

      <Resume
        image={Arizona}
        state="Arizona"
        major="University of Arizona. Bachelors in Agribusiness Economics and Management"
        interest="Enjoys the great outdoors"
        reason="While a student at the University of Arizona, my best work-study job was with the UAg Vertical Farm on campus.  The efficiency and productivity of the facility was astounding and I am excited to bring that capability out of the experimental stage into the hands of the public."
        experience={experienceList}
        volunteer="Helped to build an urban community garden.  Led a youth group on a hike to Havasupai Falls in the Grand Canyon."
      />

      <hr />

      <Resume
        image={CalDavis}
        state="Cal Davis"
        major="University of California, Davis. Bachelors in Environmental Horticulture and Urban Forestry"
        interest="Enjoys gardening"
        reason="Nothing compares to harvesting fresh produce and having it for your next meal. Vertical gardens allow novice gardeners, restaurants, and food suppliers to achieve success quickly without the need for plots of land and farming implements. I am fanatical in my desire to spread the word on the benefits of gardening and would relish the opportunity to spread the word for Wallflower."
        experience={experienceList2}
        volunteer="Scouting leader at various levels. Created gardens at local elementary, middle, and high schools."
      />

      <hr />

      <Resume
        image={CalPoly}
        state="Cal Poly"
        major="California Polytechnic State University, San Luis Obispo. Bachelors Agricultural Education and Communication"
        interest="Enjoys metal and woodworking. Also Target shooting"
        reason="I have experienced the profound physical and mental health benefits that can be derived from gardening. Vertical gardens exponentially expands the number of people who can experience those benefits by enabling a successful venture. Communicating the value of Wallflower would be another form of service for me."
        experience={experienceList3}
        volunteer="Volunteers at the local Veterans Administration (VA) hospital. Built irrigation systems in Ghana."
      />

      <hr />

      <Resume
        image={Oregon}
        state="Oregon"
        major="University of Oregon. Bachelors in Environmental Studies"
        interest="Enjoys hiking"
        reason="The environmental impact of Wallflower is absolutely exciting just in the reduction of our carbon footprint alone. Just reading about the venture prompted thoughts on structuring a social media campaign highlighting unique and successful gardens. I feel like the Business Development position is what I have been preparing for my whole life."
        experience={experienceList4}
        volunteer="Organizes and leads community hikes."
      />

      <hr />

      <Resume
        image={Washington}
        state="Washington State"
        major="Washington State University Bachelors in Agricultural and Food Systems"
        interest="Enjoys yoga and travel"
        reason="The Business Development position at Wallflower is the perfect blend of my education and employment experiences. While my training was in agriculture with a focus on food systems, my experience is on communicating ideas and services to partners and clients. I understand operations of vertical gardens as well as using all forms of marketing to identify and retain clients."
        experience={experienceList5}
        volunteer="Organizes an annual yoga retreat"
      />

      <Row style={{ backgroundColor: "black", padding: "144px 25%" }}>
        <div style={{ maxWidth: "1200px" }}>
          <h6 style={{ color: "#006cff" }}>
            APPLICATION VIDEO STAGE
          </h6>

          <h2 style={{ color: "#ffff", fontWeight: "400", fontSize: "35px" }}>
            After carefully reading and assessing the candidate’s application questions, please make a note on a scratch piece of paper the candidate’s responses who performed strongest and the candidate’s responses who performed weakest. Take note of the regional “identifier” in your notes. You will be submitting this information at the end of the simulation.
          </h2>
          <div style={{ backgroundColor: "white", padding: "2%", borderRadius: "20px" }}>
            <h4 style={{ padding: "10px" }} >Who did you select for your top application choice:</h4>
            <ResumeForm name="topchoice" setSelectedChoice={setSelectedChoice} />
            <h4 style={{ padding: "10px" }} >Who did you select for your bottom application choice:</h4>
            <ResumeForm name="bottomchoice" setSelectedChoice={setSelectedChoice} />

            <Link to="/interviews"> <Button variant="outline-secondary" onClick={submitVotes}>Vote</Button></Link>

          </div>
        </div>

      </Row>
      <Bottom />
    </div>


  );
}

export default Resumes;