import React, { useState } from "react";
import { faPlus, faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Popover, OverlayTrigger, Button } from "react-bootstrap";
import { useCalendarDataContext } from "../../context/context";

const AddEventForm = () => {
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [disableButton, setDisableButton] = useState(true);

  const { addNewEventItem } = useCalendarDataContext(); // Get data from Context component

  const handleInput = (e) => {
    setTitleValue(e.target.value);
  };

  const handleDescription = (e) => {
    isDescriptionIsFulfield(e.target);
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

    setTitleValue("");
    setDescriptionValue("");
    setDateValue("");
    setTimeValue("");
    addNewEventItem(titleValue, descriptionValue, dateValue, timeValue);
  };

  /*
      Check if description input is fulfield
  */
  const isDescriptionIsFulfield = (description) => {
    if (description !== "") {
      setDisableButton(false);
    } else {
      setDisableButton(true);
    }
  };

  /*
      Clear description input
  */
  const clearDescription = (e) => {
    e.preventDefault();

    setDescriptionValue("");
    setDisableButton(true);
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
                <Button
                  onClick={clearDescription}
                  className="mt-3"
                  variant="success"
                  size="sm"
                  disabled={disableButton}
                >
                  <FontAwesomeIcon icon={faRotateRight} />
                </Button>
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
