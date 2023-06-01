import { React, useState, useEffect } from 'react';
import pic from "./assets/complete-bg.png";
import './Complete.css';
import Menu from "./Menu";
import Bottom from "./Bottom";
import { Container, Row, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const OpinionForm = ({ selectedOpinion, setSelectedOpinion }) => {
  // const [selectedOpinion, setSelectedOpinion] = useState("");

  const handleChange = (event) => {
    setSelectedOpinion(event.target.value);
  };

  return (
    <Container style={{ textAlign: "left" }}>
      <Form>
        <Form.Group>
          <Form.Check
            type="radio"
            label="Yes"
            value="Yes"
            checked={selectedOpinion === "Yes"}
            onChange={handleChange}
            name="opinion"
          />
          <Form.Check
            type="radio"
            label="No"
            value="No"
            checked={selectedOpinion === "No"}
            onChange={handleChange}
            name="opinion"
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

const ValidForm = ({ selectedValid, setSelectedValid }) => {
  // const [selectedValid, setSelectedValid] = useState("");

  const handleChange = (event) => {
    setSelectedValid(event.target.value);
  };

  return (
    <Container style={{ textAlign: "left" }}>
      <Form>
        <Form.Group>
          <Form.Check
            type="radio"
            label="Yes he did"
            value="Yes he did"
            checked={selectedValid === "Yes he did"}
            onChange={handleChange}
            name="valid"
          />
          <Form.Check
            type="radio"
            label="No he did not"
            value="No he did not"
            checked={selectedValid === "No he did not"}
            onChange={handleChange}
            name="valid"
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

const InfluenceForm = ({ selectedInfluence, setSelectedInfluence }) => {
  // const [selectedInfluence, setSelectedInfluence] = useState("");

  const handleChange = (event) => {
    setSelectedInfluence(event.target.value);
  };

  return (
    <Container style={{ textAlign: "left" }}>
      <Form>
        <Form.Group>
          <Form.Check
            type="radio"
            label="Experience"
            value="Experience"
            checked={selectedInfluence === "Experience"}
            onChange={handleChange}
            name="influence"
          />
          <Form.Check
            type="radio"
            label="Appearance"
            value="Appearance"
            checked={selectedInfluence === "Appearance"}
            onChange={handleChange}
            name="influence"
          />
          <Form.Check
            type="radio"
            label="Culture Fit"
            value="Culture Fit"
            checked={selectedInfluence === "Culture Fit"}
            onChange={handleChange}
            name="influence"
          />
          <Form.Check
            type="radio"
            label="An Underlying Bias"
            value="An Underlying Bias"
            checked={selectedInfluence === "An Underlying Bias"}
            onChange={handleChange}
            name="influence"
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

const OverallForm = ({ selectedOverall, setSelectedOverall }) => {
  // const [selectedOverall, setSelectedOverall] = useState("");

  const handleChange = (event) => {
    setSelectedOverall(event.target.value);
  };

  return (
    <Container style={{ textAlign: "left" }}>
      <Form>
        <Form.Group>
          <Form.Check
            type="radio"
            label="Fair"
            value="Fair"
            checked={selectedOverall === "Fair"}
            onChange={handleChange}
            name="overall"
          />
          <Form.Check
            type="radio"
            label="Neutral"
            value="Neutral"
            checked={selectedOverall === "Neutral"}
            onChange={handleChange}
            name="overall"
          />
          <Form.Check
            type="radio"
            label="Unfair"
            value="Unfair"
            checked={selectedOverall === "Unfair"}
            onChange={handleChange}
            name="overall"
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

const FeelingForm = ({ selectedFeeling, setSelectedFeeling }) => {
  // const [selectedFeeling, setSelectedFeeling] = useState("");

  const handleChange = (event) => {
    setSelectedFeeling(event.target.value);
  };

  return (
    <Container style={{ textAlign: "left" }}>
      <Form>
        <Form.Group>
          <Form.Check
            type="radio"
            label="Neutral"
            value="Neutral"
            checked={selectedFeeling === "Neutral"}
            onChange={handleChange}
            name="feeling"
          />
          <Form.Check
            type="radio"
            label="Angry"
            value="Angry"
            checked={selectedFeeling === "Angry"}
            onChange={handleChange}
            name="feeling"
          />
          <Form.Check
            type="radio"
            label="Sad"
            value="Sad"
            checked={selectedFeeling === "Sad"}
            onChange={handleChange}
            name="feeling"
          />
          <Form.Check
            type="radio"
            label="Frustrated"
            value="Frustrated"
            checked={selectedFeeling === "Frustrated"}
            onChange={handleChange}
            name="feeling"
          />
          <Form.Check
            type="radio"
            label="Agreeable"
            value="Agreeable"
            checked={selectedFeeling === "Agreeable"}
            onChange={handleChange}
            name="feeling"
          />
          <Form.Check
            type="radio"
            label="Happy"
            value="Happy"
            checked={selectedFeeling === "Happy"}
            onChange={handleChange}
            name="feeling"
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

const Complete = (props) => {

  const [selectedFeeling, setSelectedFeeling] = useState("");
  const [selectedOverall, setSelectedOverall] = useState("");
  const [selectedInfluence, setSelectedInfluence] = useState("");
  const [selectedValid, setSelectedValid] = useState("");
  const [selectedOpinion, setSelectedOpinion] = useState("");


  const handleSubmit = async () => {
    try {
      await axios.post('https://wallflowerbackend.elcexercises.org/api/addfeeling', { option: selectedFeeling }).then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      await axios.post('https://wallflowerbackend.elcexercises.org/api/addoverall', { option: selectedOverall }).then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      await axios.post('https://wallflowerbackend.elcexercises.org/api/addinfluence', { option: selectedInfluence }).then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      await axios.post('https://wallflowerbackend.elcexercises.org/api/addvalid', { option: selectedValid }).then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      await axios.post('https://wallflowerbackend.elcexercises.org/api/addopinion', { option: selectedOpinion }).then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      alert('Your responses have been submitted! Thank you for your participating.');
    } catch (error) {
      alert('An error occurred while submitting your responses. Please try again.');
      console.error(error);
    }
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, []);
  
  return (
    <div className='feeling'>
      <Menu />
      <Row style={{ backgroundImage: `url(${pic})`, padding: "144px 25%" }}>
        <div style={{ maxWidth: "1200px" }}>
          <h2 style={{ color: "#ffff", fontWeight: "400", fontSize: "35px" }}>
            Your candidate was not selected for the position.
            <p style={{ color: "#ffff", fontSize: "15px", textAlign: "center" }}>
              Unfortunately the hiring team at Wallflower did not select your candidate but for what reasons? Please fill out and submit the following outro questions with your initial observations.
              <br></br>
              <br></br>
              Once you have submitted these questions please scroll down and follow the directions on the page.
              <br></br>
              <br></br>
            </p>
          </h2>

          <div style={{ backgroundColor: "white", padding: "2%", borderRadius: "20px" }}>
            <h4 style={{ padding: "10px" }} >How did you feel when your candidate was rejected?</h4>
            <FeelingForm selectedFeeling={selectedFeeling} setSelectedFeeling={setSelectedFeeling} />


            <h4 style={{ padding: "10px" }} >I found the overall hiring process to be:</h4>
            <OverallForm selectedOverall={selectedOverall} setSelectedOverall={setSelectedOverall} />

            <h4 style={{ padding: "10px" }} >In your view, which one of the following factors most heavily influenced the company’s decision in not hiring the candidate that you selected?</h4>
            <InfluenceForm selectedInfluence={selectedInfluence} setSelectedInfluence={setSelectedInfluence} />

            <h4 style={{ padding: "10px" }} >Did Marco (The Co-Founder) make valid arguments to support the hiring decision?</h4>
            <ValidForm selectedValid={selectedValid} setSelectedValid={setSelectedValid} />

            <h4 style={{ padding: "10px" }} >Did Marco’s hiring decision influence your opinion of the company?</h4>
            <OpinionForm selectedOpinion={selectedOpinion} setSelectedOpinion={setSelectedOpinion} />

            <Button onClick={handleSubmit} variant="outline-secondary">Submit</Button>

          </div>
        </div>

      </Row>
      <Row style={{ backgroundColor: "black", padding: "50px 25%" }}>
        <h8 style={{ color: "#ffff", fontWeight: "400", fontSize: "30px" }}>
          Please Answer the Following on Your Scratch Paper
          <br></br>
          <p style={{ color: "#ffff", fontSize: "15px", textAlign: "center" }}>
            1 Who did you select and why did you select your character?
            <br></br><br></br>
            2 What are some reasons for why you didn’t select others for the position
            <br></br><br></br>
            3 Did you relate to any of the characters, why or why not?
            <br></br><br></br>
            4 Did you find any of the characters to be a firm no, why or why not?
            <br></br><br></br>
            5 Did you agree with the justifications of the co-founder for your selection not receiving the job
            <br></br><br></br>
            6 What might be some arguments for not selecting other candidates?
            <br></br>
          </p>
          Thank You!
          <br></br><br></br>
          <p style={{ color: "#ffff", fontSize: "15px", textAlign: "center" }}>
            Thank you for your participation in the Wallflower simulation!
            <br></br>
            Sincerely,
            <br></br>
            Karan Singh Khangura, Jocelyn Liu, Allen Xu, Alexandros Hatzopoulous, Karl Jiang
          </p>
        </h8>

      </Row>
      <Bottom />
    </div>
  );
}


export default Complete;