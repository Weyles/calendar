import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Popover, OverlayTrigger, Button } from "react-bootstrap";
import { useCalendarDataContext } from "./context";

const Event = () => {
  const [inputValue, setInputValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");

  const { events, setEvents } = useCalendarDataContext();

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };
  const handleDescription = (event) => {
    setDescriptionValue(event.target.value);
  };
  const handleDate = (event) => {
    console.log(event.target.value);
    setDateValue(event.target.value);
  };
  const handleTime = (event) => {
    setTimeValue(event.target.value);
  };

  const handleButton = (event) => {
    event.preventDefault();

    const isDateEqual = events.find((item) => {
      return String(item.date) === String(new Date(dateValue));
    });

    if (!isDateEqual) {
      setEvents([
        ...events,
        {
          date: new Date(dateValue),
          title: inputValue,
          description: descriptionValue,
          time: timeValue,
        },
      ]);
    }
  };

  return (
    <OverlayTrigger
      trigger="click"
      placement={"bottom"}
      overlay={
        <Popover id={`popover-positioned-${"bottom"}`}>
          <Popover.Header as="h3">Add new event</Popover.Header>
          <Popover.Body>
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  <small>Title</small>
                </Form.Label>
                <Form.Control
                  onChange={handleInput}
                  value={inputValue}
                  type="text"
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>
                  <small>Description</small>
                </Form.Label>
                <Form.Control
                  onChange={handleDescription}
                  value={descriptionValue}
                  as="textarea"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridCity">
                <Form.Label>
                  <small>Date</small>
                </Form.Label>
                <Form.Control
                  onChange={handleDate}
                  value={dateValue}
                  type="date"
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGridCity">
                <Form.Label>
                  <small>Time</small>
                </Form.Label>
                <Form.Control
                  onChange={handleTime}
                  value={timeValue}
                  type="time"
                />
              </Form.Group>
              <Button onClick={handleButton} className="mt-3" type="submit">
                Save
              </Button>
            </Form>
          </Popover.Body>
        </Popover>
      }
    >
      <Button variant="primary" className="rounded-circle">
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </OverlayTrigger>
  );
};

export { Event };
