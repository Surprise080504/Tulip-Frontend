import React from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const FarmLPCard = ({ pool, img, inactive }) => {
  const title = pool.name;
  return (
    <Card
      bg="dark"
      text="light"
      className="p-1 border-gradient"
      style={{ height: "100%" }}
    >
      <Card.Body>
        <Row className="justify-content-center align-self-end">
          <Col xs={9}>
            <div
              className="text-gradient fw-bold h5 "
              dangerouslySetInnerHTML={{ __html: title }}
            ></div>
            <div className="fw-light text-nowrap">
              <span>Deposit</span> {pool.tokenName}
              {/* {inactive && <span className="inactive-text">INACTIVE</span>} */}
            </div>
          </Col>
          <Col xs={3} style={{ minHeight: "10vh" }}>
            <img
              className="d-block img-fluid mx-auto farm-image-shadow"
              style={{ objectFit: "contain" }}
              src={img}
              alt=""
            />
          </Col>
        </Row>
        <Row className="mt-2">
          <Col className="d-flex flex-row gap-3">
            <Link to={`/farms/farm/${pool.pool}`}>
              <Button variant="outline-primary" className="text-white">
                View
              </Button>
            </Link>
            <div className="align-self-end" style={{ height: "100%" }}>
              {pool.earnToken === "TSWAP" ? (
                <Button
                  style={{ height: "30px", marginTop: "10px" }}
                  variant="primary"
                  className="btn-sm py-1 text-white btn-flatten"
                >
                  Earn {pool.earnToken}
                </Button>
              ) : (
                <Button
                  style={{ height: "30px", marginTop: "10px" }}
                  variant="secondary"
                  className="btn-sm py-1 text-white btn-flatten"
                >
                  Earn {pool.earnToken}
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FarmLPCard;
