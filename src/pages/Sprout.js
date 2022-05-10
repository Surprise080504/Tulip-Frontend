import { Col, Row, Stack } from "react-bootstrap";
import React from "react";

export function Sprout() {
  return (
    <Stack gap={3} className="h-100">
      <Row>
        <Col className="h2 text-gradient fw-bold text-end">Sprout</Col>
      </Row>
      <Row
        className="align-items-center"
        style={{ height: "calc(100vh - 200px)" }}
      >
        <Col className="text-center mb-5">
          <span className="display-1 text-gradient">Coming Soon</span>
        </Col>
      </Row>
    </Stack>
  );
}
