import { Row, Container } from "react-bootstrap";
import { React, useEffect } from "react";
import pic from "./assets/postInt-image.jpeg";
import { Link } from "react-router-dom";
import './PostInterview.css';
import Menu from "./Menu";
import Bottom from "./Bottom";

const Header = () => {
  return (
    <Container fluid>
      <header className="Top-of-page-header-in">
        <Menu />
      </header>
      <Row id="banner-row">

        <img src={pic} alt="hiring" class="img-fluid" id="banner"></img>
        <Row className="text-over-img">
          <p><b>WALLFLOWER</b>
            <br></br>
            <br></br>
            It is now time to weigh up the candidates and choose your preferred hire.</p>
        </Row>

      </Row>

    </Container>
  );
}

const Candidate = (props) => {
  return (
    <div class="col text-center profile">
      <span class="icon"> </span>
      <br></br>
      <div class="line"><h5>{props.name} ({props.school})</h5></div>
      <div>
        <p>If you think {props.name} ({props.school}) is the best candidate</p>
      </div>
      <div>
        <Link to={`/post-interview-candidate/${props.school}/${props.id}`}><p>CLICK HERE TO CHOOSE</p> </Link>
      </div>
    </div>
  );
}

const PostInterview = (props) => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant'
    });
  }, []);

  return (
    

    <Container fluid>

      <Header />
      <Container fluid>

        <div class="row position-relative">
          <Candidate
            id="1"
            name="Kaleb"
            school="Arizona"
          />
          <Candidate
            id="2"
            name="Gary"
            school="Cal Davis"
          />
          <Candidate
            id="3"
            name="Vanessa"
            school="Cal Poly"
          />
        </div>
        <div class="row position-relative">
          <Candidate
            id="4"
            name="Corinne"
            school="Washington"
          />
          <Candidate
            id="5"
            name="Reagan"
            school="Oregon"
          />
        </div>
      </Container>

      <footer className="Footer-home" >
        <Bottom />
      </footer>
    </Container>


  );
}

export default PostInterview;