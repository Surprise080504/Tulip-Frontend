import FamilyBouquet from "components/Family";
import { Row, Col, Stack } from "react-bootstrap";

export function Bouquet() {
  return (
    <Stack gap={3}>
      <Row>
        <Col className="h2 text-gradient fw-bold text-end">Bouquet</Col>
      </Row>
      <Row>
        <Col xl={11}>
          <FamilyBouquet />
        </Col>
      </Row>
    </Stack>
  );
}
