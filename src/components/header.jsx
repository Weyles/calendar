import React from "react";
import { Event } from "./event";
import { ButtonGroup, Container, Col, Button, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Picker } from "./date-picker";
import { getMonth } from "../utility/functions";
import { useCalendarDataContext } from "./context";

const Header = () => {
  const { date, setDate, day, year, month } = useCalendarDataContext();

  const handlePrevMonthButtonClick = (event) => {
    event.preventDefault();
    if (month() === 0) {
      setDate(new Date(year(), 11));
    } else {
      setDate(new Date(year(), month() - 1));
    }
  };

  const handleNextMonthButtonClick = (event) => {
    event.preventDefault();
    if (month() === 11) {
      setDate(new Date(year(), 0));
    } else {
      setDate(new Date(year(), month() + 1));
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <Event />
        </Col>
        <Col className="d-flex justify-content-end">
          <ButtonGroup aria-label="Basic example">
            <Button
              onClick={handlePrevMonthButtonClick}
              variant="outline-secondary"
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
            <Button
              style={{ width: "150px" }}
              variant="outline-secondary"
              active
            >
              {`${getMonth(date)} ${year()}`}
            </Button>
            <Button
              onClick={handleNextMonthButtonClick}
              variant="outline-secondary"
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </Button>
          </ButtonGroup>
          <Picker />
        </Col>
      </Row>
    </Container>
  );
};

export { Header };
