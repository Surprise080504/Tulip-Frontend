import { Button, Card, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import Countdown from "react-countdown";
import { useWeb3 } from "utils/web3Utils";
import { makeFixed } from "utils/numUtils";
import CountUp from "react-countup";
import AttentionIcon from "assets/img/attention-icon.png";
import { GardenModel } from "../models/GardenModel";
import { getPetalPrice, getRosePrice, getTulipPrice } from "utils/priceFeed";
import TulipLogo from "assets/img/tulip.png";
import PetalLogo from "assets/img/petal.png";
import { GardenCardPart } from "SideBar.style";

const GARDEN_MODEL = "0x";

export function Garden() {
  const web3 = useWeb3();

  const [nextAllocation, setNextAllocation] = useState(
    Date.now() + 60 * 60 * 6 * 1000
  );
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [treasury] = useState(null);
  const [gardenApi, setGardenApi] = useState(null);
  const [, setRosePrice] = useState(0.1);
  const [tulipPrice, setTulipPrice] = useState(0);
  const [petalPrice, setPetalPrice] = useState(0);
  const [depositValue, setDepositValue] = useState(0);
  const [epochTimerStart, setEpochTimerStart] = useState(currentEpoch);

  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const [gardenState, setGardenState] = useState({
    earnings: 0,
    canClaim: false,
    staked: 0,
    balance: 0,
    allowance: 0,
  });

  const [expectedPrice, setExpectedPrice] = useState(0);
  const [apr, setApr] = useState(0);
  const [TVL, setTVL] = useState(0);

  useEffect(async () => {
    setTulipPrice(await getTulipPrice());
    setRosePrice(await getRosePrice());
    setPetalPrice(await getPetalPrice());
  });

  useEffect(async () => {
    if (web3 == null) {
      return;
    }
    setGardenApi(new GardenModel(web3));
  }, [web3]);

  useEffect(async () => {
    if (gardenApi == null) return;
    setNextAllocation(await gardenApi.getNextAllocationTime());
    setCurrentEpoch(await gardenApi.getCurrentEpoch());
    setApr(await gardenApi.getAnnualPercentageRate(petalPrice, tulipPrice));
    setTVL(await gardenApi.getTotalSupply());
    setExpectedPrice(await gardenApi.getPrice());
    setEpochTimerStart(await gardenApi.getEpochStartTimer());
    setGardenState({
      earnings: await gardenApi.getEarnings(),
      canClaim: await gardenApi.doCanClaim(),
      staked: await gardenApi.getStakedBalance(),
      balance: await gardenApi.getBalance(),
      allowance: await gardenApi.getAllowance(),
    });
  }, [gardenApi, petalPrice, tulipPrice]);

  useEffect(async () => {
    if (gardenApi == null) return;
    console.log("");
  }, [gardenApi]);

  const stake = async () => {
    setShowModal(false);
    await gardenApi.stake(depositValue);
  };
  const refresh = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    await treasury.methods
      .allocateSeigniorage()
      .send({
        from: address,
        gas: 1000000,
        gasPrice: 10 ** 11,
      })
      .then((a) => alert("done!"));
  };
  const Completionist = () => (
    <Button
      variant="secondary"
      className="btn-sm p-2 text-white text-i-gradient"
      onClick={refresh}
    >
      Advance
    </Button>
  );

  return (
    <Stack gap={3}>
      <Row>
        <Col className="h2 text-gradient fw-bold text-end">Garden</Col>
      </Row>
      <Row className="justify-content-center fade-in-bottom custom-grid">
        {[
          {
            title: "Next Epoch",
            data: (
              <Countdown daysInHours={true} date={nextAllocation}>
                <Completionist />
              </Countdown>
            ),
          },
          { title: "Current Epoch", data: currentEpoch },
        ].map((epochStat) => {
          return (
            <Col
              key={epochStat.title}
              xs={{ span: 12 }}
              sm={{ span: 4 }}
              md={{ span: 3 }}
              className="mt-3"
            >
              <Card
                bg="dark"
                text="light"
                className="text-center border-gradient"
              >
                <Card.Body>
                  <Card.Title className="h6">{epochStat.title}</Card.Title>
                  <Card.Text className="h4 fw-bold text-gradient">
                    {epochStat.data}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row className="justify-content-center fade-in-bottom custom-grid">
        {[
          {
            title: "TULIP Price",
            data: makeFixed(expectedPrice, " ROSE", 4),
            rawdata: expectedPrice / 1e18,
            decimals: 4,
          },
          {
            title: "APR",
            data: makeFixed(apr, "%", 4),
            rawdata: apr,
            decimals: 4,
          },
          {
            title: "TVL",
            data: makeFixed(TVL / 10 ** 18, " PETAL", 0),
            rawdata: TVL / 10 ** 18,
            decimals: 0,
          },
        ].map((gardenStat) => {
          return (
            <Col
              key={gardenStat.title}
              xs={{ span: 12 }}
              sm={{ span: 4 }}
              md={{ span: 3 }}
              className="mt-3"
            >
              <Card
                bg="dark"
                text="light"
                className="text-center border-gradient"
              >
                <Card.Body>
                  <Card.Title className="h6">{gardenStat.title}</Card.Title>
                  <Card.Text className="h4 fw-bold text-gradient">
                    <CountUp
                      end={gardenStat.rawdata}
                      separator={","}
                      decimals={gardenStat.decimals}
                      duration={1}
                      suffix={
                        gardenStat.title === "TULIP PRICE"
                          ? " ROSE"
                          : gardenStat.title === "APR"
                          ? "%"
                          : " PETAL"
                      }
                    />
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <Row className="justify-content-md-center mt-3 fade-in-bottom">
        <Col md="8">
          <div
            className="text-attention text-center items-center"
            style={{
              justifyContent: "center",
              display: "flex",
              lineHeight: "20px",
              alignItems: "center",
              padding: "6px",
            }}
          >
            <img
              className="inline-image-logo pe-2"
              src={AttentionIcon}
              alt="Attention"
            />
            STAKED PETAL CAN ONLY BE WITHDRAWN AFTER 3 EPOCHS SINCE DEPOSIT.
          </div>
        </Col>
      </Row>
      {/* {gardenApi && ( */}
      <GardenCardPart>
        <Row className="justify-content-md-center fade-in-bottom custom-grid">
          <Col className="pt-3" md={5}>
            <Card
              bg="dark"
              text="light"
              className="text-center h-100 border-gradient"
            >
              <Card.Body>
                <Stack gap={4}>
                  <Card.Title className="tswap-gradient-text display-6 gardentitle">
                    TOKEN
                  </Card.Title>
                  <Row>
                    <Col sm="12">
                      <img
                        className="d-block mx-auto img-fluid w-25"
                        style={{ minWidth: "100px" }}
                        src={TulipLogo}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" className="text-center">
                      <Row>
                        <h3 className="strong tswap-gradient-text gradientText">
                          {makeFixed(gardenState.earnings / 10 ** 18)}
                        </h3>
                        <h6>TOKEN Earned</h6>
                      </Row>
                    </Col>
                  </Row>
                </Stack>
                <Row className="pt-3 justify-content-center">
                  <Col md={{ span: 8 }} className="text-center">
                    <Button
                      className="mb-4 text-white"
                      variant="outline-primary"
                      // disabled={!gardenState.canClaim}
                      onClick={() => gardenApi.doClaimReward()}
                    >
                      CLAIM
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col className="pt-3 flex-grow-0" md={5}>
            <Card
              bg="dark"
              text="light"
              className="text-center border-gradient"
            >
              <Card.Body>
                <Stack gap={4}>
                  <Card.Title className="tswap-gradient-text display-6 gardentitle">
                    PETAL
                  </Card.Title>
                  <Row>
                    <Col sm="12">
                      <img
                        className="d-block mx-auto img-fluid w-25"
                        style={{ minWidth: "100px" }}
                        src={PetalLogo}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs="12" style={{ textAlign: "center" }}>
                      <Row>
                        <h3 className="tswap-gradient-text gradientText">
                          {makeFixed(gardenState.staked / 10 ** 18)}
                        </h3>
                        <h6>TOKEN Staked</h6>
                      </Row>
                    </Col>
                  </Row>
                </Stack>
                <Row className="pt-3 justify-content-center">
                  <Col md={{ span: 8 }} className="text-center">
                    {gardenState.allowance < 10 ** 18 * 1000 ? (
                      <span>
                        <Button
                          variant="outline-primary"
                          className="text-white"
                          onClick={() => gardenApi.doApprove()}
                        >
                          STAKE
                        </Button>
                      </span>
                    ) : (
                      <>
                        <Col xs="11" className="text-center">
                          <>
                            <Button
                              className="text-white"
                              variant="outline-primary"
                              onClick={handleShowModal}
                            >
                              STAKE
                            </Button>

                            <Modal show={showModal} onHide={handleCloseModal}>
                              <Modal.Header closeButton>
                                <Modal.Title>
                                  <span className="tswap-gradient-text">
                                    Stake PETAL
                                  </span>
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Row>
                                  <span className="tswap-gradient-text"></span>
                                </Row>
                                <Row>
                                  <Form>
                                    <Form.Group>
                                      <Form.Label>
                                        BALANCE:{" "}
                                        {gardenState.balance / 10 ** 18}
                                      </Form.Label>
                                      <Row>
                                        <Col>
                                          <Form.Control
                                            placeholder="0"
                                            value={depositValue}
                                            onChange={(e) =>
                                              setDepositValue(e.target.value)
                                            }
                                          ></Form.Control>
                                        </Col>
                                        <Col className="col-auto my-auto text-end">
                                          <Button
                                            className="text-white"
                                            variant="outline-primary"
                                            onClick={() =>
                                              setDepositValue(
                                                (
                                                  (Math.floor(
                                                    gardenState.balance /
                                                      10 ** 13
                                                  ) *
                                                    10 ** 13) /
                                                  10 ** 18
                                                ).toString()
                                              )
                                            }
                                          >
                                            MAX
                                          </Button>
                                        </Col>
                                      </Row>
                                    </Form.Group>
                                  </Form>
                                </Row>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  className="text-white"
                                  variant="outline-primary"
                                  onClick={stake}
                                >
                                  Stake
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </>
                        </Col>
                      </>
                    )}
                  </Col>
                </Row>
                <Row className="mt-3 mb-1">
                  <Col className="text-center small">
                    Epoch Timer Start:{" "}
                    <span className="gradientText">
                      {new Date(epochTimerStart * 1000)
                        .toISOString()
                        .substr(11, 8)}
                    </span>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center pt-3 fade-in-bottom">
          <Col md="4" sm="12" className="text-center">
            <Button
              className="text-white ps-5 pe-5"
              variant="outline-primary"
              // disabled={!gardenState.canClaim}
              onClick={() => gardenApi.doExit()}
            >
              {" "}
              CLAIM &amp; WITHDRAW{" "}
            </Button>
          </Col>
        </Row>
      </GardenCardPart>
      {/* )} */}
    </Stack>
  );
}
