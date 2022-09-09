import React, { useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Popover, OverlayTrigger, Button } from "react-bootstrap";
import { useCalendarDataContext } from "../../context/context";
import { areDateEqual, findEvent } from "../../utility/functions";

const AddEventForm = () => {
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");

  const { data, eventItems, setEventItems, addNewEventItem } =
    useCalendarDataContext();

  const handleInput = (e) => {
    setTitleValue(e.target.value);
  };
  const handleDescription = (e) => {
    setDescriptionValue(e.target.value);
  };
  const handleDate = (e) => {
    setDateValue(e.target.value);
  };
  const handleTime = (e) => {
    setTimeValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addNewEventItem(titleValue, descriptionValue, dateValue, timeValue);
  };

  return (
    <OverlayTrigger
      trigger="click"
      rootClose
      placement={"bottom"}
      overlay={
        <Popover id={`popover-positioned-${"bottom"}`}>
          <Popover.Header as="h3">Add new event</Popover.Header>
          <Popover.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>
                  <small>Title</small>
                </Form.Label>
                <Form.Control
                  onChange={handleInput}
                  value={titleValue}
                  type="text"
                  required
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
                  required
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
              <Button className="mt-3" type="submit">
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

export { AddEventForm };
