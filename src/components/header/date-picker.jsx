import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCalendarDataContext } from "../../context/context";
import { getYearData } from "../../utility/functions";
import { SHORT_MONTH_NAMES } from "../../utility/constants";
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
  const { date, setDate, year, month } = useCalendarDataContext();

  const yearDate = getYearData(date.getFullYear());

  const handlePrevYearButtonClick = (event) => {
    event.preventDefault();

    setDate(new Date(year() - 1, month()));
  };

  const handleNextYearButtonClick = (event) => {
    event.preventDefault();

    setDate(new Date(year() + 1, month()));
  };

  const handleMonthClick = (event, month) => {
    event.preventDefault();

    setDate(month);
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

              <Button variant="primary">{year()}</Button>

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
