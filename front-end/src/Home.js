import background from "./assets/complete-bg.png";
import React from "react";
import './Home.css';
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Bottom from "./Bottom";

function Home() {
  return (
    <div className="App-home">
      <header className="Top-of-page-header-home">
        <Menu />
      </header>

      <div class="box background-tint">
        <header style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover', fontSize: '30px' }} className="App-header-home" >
          Welcome to Wallflower
          <p style={{ fontWeight: 'normal', fontSize: 'calc(7px + 2vmin)' }}>

            Hello, congratulations on being hired by Wallflower to handle recruitment. Wallflower is the <br></br>
            fastest growing vertical gardening business in the industry. The following series of <br></br>
            application questions and application videos will be used to assess who you think the best <br></br>
            candidate will be for Wallflower’s new Business Development Coordinator position. <br></br>

          </p>

          <Link to="/intro"><button style={{ fontWeight: 'normal', fontSize: 'calc(1px + 2vmin)' }} class="button button1-home">GET STARTED</button></Link>

        </header>
      </div>
      <footer className="Footer-home" >
        <Bottom />
      </footer>
    </div>

  );
}

export default Home;
