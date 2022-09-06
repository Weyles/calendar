import React from "react";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Picker = () => {
  return (
    <OverlayTrigger
      trigger="click"
      placement={"bottom"}
      overlay={
        <Popover id={`popover-positioned-${"bottom"}`}>
          <Popover.Header as="h3">Year</Popover.Header>
          <Popover.Body>Date</Popover.Body>
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
