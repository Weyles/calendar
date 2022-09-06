import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Picker } from "./date-picker";

const Header = () => {
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
            <Button variant="outline-secondary">
              <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
            <Button variant="outline-secondary" active>
              DATA
            </Button>
            <Button variant="outline-secondary">
              <FontAwesomeIcon icon={faAngleRight} />
            </Button>
          </ButtonGroup>
          <Picker />
        </Col>
      </Row>
    </Container>
  );
}

export {Header}