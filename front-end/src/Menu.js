import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Menu = (params) => {
  return (
    <header className="Top-of-page-header">
      <Row>
        <Col>
          <br></br>
          Wallflower
          <br></br>
          <br></br>

        </Col>
        <Col>
          <Link to="/Login"> <Button variant="outline-secondary">Admin Login</Button></Link>

        </Col>
      </Row>
    </header>
  );
}

export default Menu;