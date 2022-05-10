import { Button, Card, Col, Container, Form, Nav, Row, Stack, Tab } from 'react-bootstrap'
import SettingsIcon from 'assets/img/slider-icon.svg'
import React from 'react'

import ArrowDownIcon from 'assets/img/arrow-down.svg'
import TSwapLogo from 'assets/img/tswap-logo.svg'

export function TulipSwap () {
  return <Container className="h-100" fluid style={{ background: 'linear-gradient(135deg, #6F44FF 0%, #4A3D74 100%' }}>
    <Row className="m-auto h-100">
      <Card className="p-3 m-auto" bg="transparent" body
            style={{ width: '800px', height: '800px', borderRadius: '404.5px', border: '8px  solid #A3F182' }}>
        <Card.Img className="img-fluid" style={{ height: '75px' }} src={TSwapLogo} alt='TSwap Logo'/>
        <Tab.Container defaultActiveKey="swap">
          <Row>
            <Col md="auto" className="mx-auto mt-3">
              <Nav variant="pills"
                   className="tswap-tab-nav"
                   style={{
                     background: 'linear-gradient(90deg, #7571FF 16.07%, #796DEE 53.67%, #9D91DF 105.36%)',
                     borderRadius: '19px'
                   }}
              >
                <Nav.Item>
                  <Nav.Link
                    className="m-2 tswap-nav-link strong"
                    eventKey="swap"
                  >
                    SWAP
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    className="m-2 tswap-nav-link strong"
                    eventKey="liquidity">
                    LIQUIDITY
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>
          <Tab.Content>
            <Tab.Pane eventKey="swap">
              <Stack gap={3} className="p-5">
                <Row className="align-items-end">
                  <Col className="ms-auto" md={1}>
                    <Button className="bg-transparent border-0 shadow-none">
                      <img src={SettingsIcon} alt="Settings Button"/>
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Form>
                    <Form.Group>
                      <Row>
                        <Col>
                          <Form.Control placeholder="5000"/>
                        </Col>
                        <Col className="col-auto my-auto">
                          <p className="text-white my-auto">
                            <img className='inline-image-logo pe-2' src={ArrowDownIcon} alt="Swap"/>
                            <img className='inline-image-logo pe-2' src={ArrowDownIcon} alt="Swap"/>
                          </p>
                        </Col>
                      </Row>
                      <Form.Label className="ms-3 small w-100">
                        <Row>
                          <Col>
                            <p>~$0.00</p>
                          </Col>
                          <Col>
                            <p className="text-end">Balance: 0.0000</p>
                          </Col>
                          <Col className="col-auto pe-5">
                            <p onClick={() => alert('Hi')} className="text-warning">(Max)</p>
                          </Col>
                        </Row>
                      </Form.Label>
                    </Form.Group>
                    <Row className="text-center pb-3">
                      <img style={{ height: '55px' }} src={ArrowDownIcon} alt="Swap"/>
                    </Row>
                    <Form.Group>
                      <Row>
                        <Col>
                          <Form.Control placeholder="5000"/>
                        </Col>
                        <Col className="col-auto my-auto">
                          <p className="text-white my-auto">
                            <img className='inline-image-logo pe-2' src={ArrowDownIcon} alt="Swap"/>
                            <img className='inline-image-logo pe-2' src={ArrowDownIcon} alt="Swap"/>
                          </p>
                        </Col>
                      </Row>
                      <Form.Label className="ms-3 small w-100">
                        <Row>
                          <Col>
                            <p>~$0.00</p>
                          </Col>
                          <Col>
                            <p className="text-end">Balance: 0.0000</p>
                          </Col>
                          <Col className="col-auto pe-5">
                            <p onClick={() => alert('Hi')} className="text-warning">(Max)</p>
                          </Col>
                        </Row>
                      </Form.Label>
                    </Form.Group>
                    <Row className="align-content-center align-items-center justify-content-center">
                      <Col md={2} className="small">
                        <Row>
                          <Button>SWAP</Button>
                          <div className="mt-2 p-3">
                            <Row>Minimum Received</Row>
                            <Row>Price Impact</Row>
                            <Row>Fee</Row>
                          </div>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                </Row>
              </Stack>

            </Tab.Pane>
            <Tab.Pane eventKey="liquidity">
              <p>Liquidity</p>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </Card>
    </Row>
  </Container>
}
