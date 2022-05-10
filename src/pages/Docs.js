import { Card, Col, Row, Stack } from "react-bootstrap";
import React from "react";

export function Docs() {
  const questions = [
    {
      question: "What is Tulip.money?",
      answer:
        "A brief answer to a commonly asked question. A brief answer to a commonly asked question.",
    },
    {
      question: "When does the Garden print?",
      answer:
        "A brief answer to a commonly asked question. A brief answer to a commonly asked question.",
    },
    {
      question: "How do I earn rewards?",
      answer:
        "A brief answer to a commonly asked question. A brief answer to a commonly asked question.",
    },
    {
      question: "How long is each epoch?",
      answer:
        "A brief answer to a commonly asked question. A brief answer to a commonly asked question.",
    },
    {
      question: "How can I get involved?",
      answer:
        "A brief answer to a commonly asked question. A brief answer to a commonly asked question.",
    },
  ];

  return (
    <Stack gap={3}>
      <Row>
        <Col className="h2 text-gradient fw-bold text-end">
          FAQ & Documentation
        </Col>
      </Row>
      <Row className="fade-in-bottom text-gray">
        <Col md="5">
          {questions.map((q, i) => {
            return (
              <div key={i} className="mb-5">
                <div
                  className="h3 fw-bold"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {q.question}
                </div>
                <div className="answer">
                  {q.answer}{" "}
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>
                    Read More.
                  </span>
                </div>
              </div>
            );
          })}
        </Col>
        <Col md="2"></Col>
        <Col md="5">
          <Row className="mt-5 mb-5">
            <Col>
              <Card
                bg="dark"
                text="light"
                className="text-center border-gradient"
              >
                <Card.Body>
                  <Card.Text className="text-gradient h3 fw-bold">
                    Learn More
                  </Card.Text>
                  <Card.Text>
                    This page only covers a few commonly asked questions. Be
                    sure to check out the full documenation on the Tulip.money
                    Gitbook!
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-10 mb-5">
            <Col>
              <div>
                <div
                  className="h3 fw-bold"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  How can I get involved?
                </div>
                <div className="answer">
                  A brief answer to a commonly asked question. A brief answer to
                  a commonly asked question.{" "}
                  <span style={{ color: "rgba(255,255,255,0.8)" }}>
                    Read More.
                  </span>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="mt-10 mb-5">
            <Col>
              <div className="text-gradient h1 fw-bold">Roadmap</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Stack>
  );
}
