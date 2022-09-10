import React from "react";
import { AddEventForm } from "./add-event-form";
import { ButtonGroup, Container, Col, Button, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Picker } from "./date-picker";
import { getMonth } from "../../utility/functions";
import { useCalendarDataContext } from "../../context/context";
import { localStorageSet } from "../../utility/local-store";

const Header = () => {
  const { date, setDate } = useCalendarDataContext(); // Get data from Context component

  /*
      Cyclically set the date of the previous month in the selected year
  */
  const handlePrevMonthButtonClick = (event) => {
    event.preventDefault();

    /*
        Check if we have reached the first month
    */
    if (date.getMonth() === 0) {
      const lastMonthOfYear = new Date(date.getFullYear(), 11);

      setDate(lastMonthOfYear);
      localStorageSet("date", lastMonthOfYear);
    } else {
      const pervMonthDate = new Date(date.getFullYear(), date.getMonth() - 1); // Create date of the last month

      setDate(pervMonthDate);
      localStorageSet("date", pervMonthDate);
    }
  };

  /*
      Cyclically set the date of the next month in the selected year
  */
  const handleNextMonthButtonClick = (event) => {
    event.preventDefault();

    /*
        Check if we have reached the last month
    */
    if (date.getMonth() === 11) {
      const firstMonthOfYear = new Date(date.getFullYear(), 0);

      setDate(firstMonthOfYear);
      localStorageSet("date", firstMonthOfYear);
    } else {
      const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1); // Create date of the next month

      console.log(nextMonthDate);
      setDate(nextMonthDate);
      localStorageSet("date", nextMonthDate);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <AddEventForm />
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
              {`${getMonth(date)} ${date.getFullYear()}`}
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
