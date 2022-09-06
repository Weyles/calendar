import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faAngleLeft,
  faAngleRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./header.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

export default function Header() {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Button variant="primary">
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </Col>
        <Col className="d-flex justify-content-end">
          <ButtonGroup aria-label="Basic example">
            <Button variant="outline-dark">
              <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
            <Button variant="outline-dark" active>
              DATA
            </Button>
            <Button variant="outline-dark">
              <FontAwesomeIcon icon={faAngleRight} />
            </Button>
          </ButtonGroup>
            <Button className="calendar-button" variant="outline-dark">
              <FontAwesomeIcon icon={faCalendar} />
            </Button>
        </Col>
      </Row>
    </Container>
  );
}
