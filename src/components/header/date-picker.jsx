import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCalendarDataContext } from "../../context/context";
import { getYearData } from "../../utility/functions";
import { SHORT_MONTH_NAMES } from "../../utility/constants";
import { databaseSet } from "../../utility/control";
import {
  ButtonGroup,
  Popover,
  OverlayTrigger,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import {
  faCalendar,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Picker = () => {
  const { date, setDate } = useCalendarDataContext(); // Get data from Context component

  const yearDate = getYearData(date.getFullYear()); // Get array of month in select year

  /*
      Set the date of the previous year
  */
  const handlePrevYearButtonClick = (event) => {
    event.preventDefault();

    const prevYearDate = new Date(date.getFullYear() - 1, date.getMonth()); // Create date of the last year

    setDate(prevYearDate);
    databaseSet("date", prevYearDate);
  };

  /*
      Set the date of the next year
  */
  const handleNextYearButtonClick = (event) => {
    event.preventDefault();

    const nextYearDate = new Date(date.getFullYear() + 1, date.getMonth()); // Create date of the next year

    setDate(nextYearDate);
    databaseSet("date", nextYearDate);
  };

  /*
      Set date of select month
  */
  const handleMonthClick = (event, month) => {
    event.preventDefault();

    setDate(month);
    databaseSet("date", month);
  };

  return (
    <OverlayTrigger
      trigger="click"
      rootClose
      placement={"bottom"}
      overlay={
        <Popover id={`popover-positioned-${"bottom"}`}>
          <Popover.Header className="d-flex justify-content-around" as="h3">
            <ButtonGroup aria-label="Basic example">
              <Button onClick={handlePrevYearButtonClick} variant="primary">
                <FontAwesomeIcon icon={faAngleLeft} />
              </Button>

              <Button variant="primary">{date.getFullYear()}</Button>

              <Button onClick={handleNextYearButtonClick} variant="primary">
                <FontAwesomeIcon icon={faAngleRight} />
              </Button>
            </ButtonGroup>
          </Popover.Header>
          <Popover.Body>
            {yearDate.map((season, index) => {
              return (
                <Row key={index}>
                  {season.map((month, index) => {
                    return (
                      <Col key={index}>
                        <Button
                          onClick={(event) => handleMonthClick(event, month)}
                          style={{ width: "60px", marginTop: "10px" }}
                          variant="primary"
                        >
                          {SHORT_MONTH_NAMES[month.getMonth()]}
                        </Button>
                      </Col>
                    );
                  })}
                </Row>
              );
            })}
          </Popover.Body>
        </Popover>
      }
    >
      <Button style={{ marginLeft: "10px" }} variant="outline-secondary">
        <FontAwesomeIcon icon={faCalendar} />
      </Button>
    </OverlayTrigger>
  );
};

export { Picker };
