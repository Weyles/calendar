import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Item = (props) => {
  const { data, day } = props;

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex justify-content-between">
          <small>{data}</small>
          <small>{day}</small>
        </Col>
      </Row>
      <Row>
        <Col></Col>
      </Row>
    </Container>
  );
};

export { Item };
