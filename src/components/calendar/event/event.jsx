import React, { useState } from "react";
import "./event.css";
import { Form, Offcanvas, Button, Modal } from "react-bootstrap";
import { getStringDate, areDateEqual } from "../../../utility/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Event = (props) => {
  const { event, date, deleteEvent, changeEvent } = props;

  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const [dateValue, setDateValue] = useState("");
  const [timeValue, setTimeValue] = useState("");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowOffcanvas(false);

  const handleShow = (event) => {
    setShowOffcanvas(true);
    setTitleValue(event.title);
    setDescriptionValue(event.description);
    setDateValue(getStringDate(date));
    setTimeValue(event.time);
  };

  const handleInput = (e) => setTitleValue(e.target.value);
  const handleDescription = (e) => setDescriptionValue(e.target.value);
  const handleDate = (e) => setDateValue(e.target.value);
  const handleTime = (e) => setTimeValue(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (titleValue === "" || dateValue === "") {
      setShowModal(true);
    } else {
      changeEvent(
        event.id,
        new Date(dateValue),
        titleValue,
        descriptionValue,
        timeValue
      );
    }
  };

  return (
    <div>
      <div
        className={
          areDateEqual(new Date(), date)
            ? "current-date-event-text-block"
            : "event-text-block"
        }
        onClick={() => handleShow(event)}
      >
        <b>{event.title}</b>
        <div>{event.description}</div>
      </div>

      <Offcanvas show={showOffcanvas} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Edit idea item</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Oops, something's wrong!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Title field and date field must be filled.</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={() => setShowModal(false)}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>
                <small>Title</small>
              </Form.Label>
              <Form.Control
                onChange={handleInput}
                value={titleValue}
                type="text"
                required
              />{" "}
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
            <Button onClick={handleSubmit} className="mt-3">
              Save
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              variant="danger"
              onClick={() => deleteEvent(event.id)}
              className="mt-3"
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
};

export { Event };
