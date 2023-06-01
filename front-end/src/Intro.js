import pic from "./intro-picture.png";
import React from "react";
import './Intro.css';
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Bottom from "./Bottom";

function Intro() {
  return (
    <div className="App-in" style={{ textAllign: 'right' }}>
      <header className="Top-of-page-header-in">
        <Menu />
      </header>

      <div class="box background-tint" >
        <header className="App-header-in" >
          <br></br><br></br><br></br>
          <img src={pic} alt="flowers on wall" className="img-in"></img>
          <p style={{ color: `blue`, fontSize: '15px', margin: '0px 50px 0px 150px' }}>
            WALLFLOWER <br></br>
          </p>
          <p style={{ fontSize: '30px', margin: '30px 50px 10px 150px', fontWeight: 'bold' }}>
            Welcome to Wallflower <br></br>
          </p>
          <p style={{ fontSize: '15px', margin: '0px 20px 100px 150px' }}>
            It’s time to meet Wallflower’s co-founders, Marco Esperanza and Cassandra Blackwell. They will be giving you a brief history of Wallflower along with more about the position they’re looking to fill.
            <br></br><br></br>
            Make sure you have a piece of scratch paper handy to take notes as you proceed through the simulation.
            <br></br><br></br>
            Please scroll down below to meet the Co-Founders.
            <br></br><br></br><br></br><hr></hr>
          </p>
        </header>
      </div>

      <header>
        <br></br><br></br><br></br>
        <p style={{ fontWeight: 'bold', fontSize: '30px' }}>
          Wallflower
        </p>
        <p style={{ color: 'gray' }}>
          Please watch the video below and take notes as they review the company <br></br>
          and the position they're looking to fill.<br></br>
          <br></br><br></br>

          <iframe title="main-video" width="800" height="500" src="https://www.youtube.com/embed/q1NOxhR-rzo?rel=0"> </iframe>
          <br></br>
          <br></br>
          <br></br>
          <Link to="/resumes">  <button class="button button1-in">CLICK HERE TO MOVE TO NEXT SECTION</button></Link>
          <br></br>
          <br></br>
        </p>
      </header>

      <footer className="Footer-in" >
        <Bottom />
      </footer>
    </div>
  );
}

export default Intro;

