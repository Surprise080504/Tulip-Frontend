/* eslint-disable no-unused-vars */
import {
  Button,
  Card,
  Col,
  Row,
  Stack,
  FormControl,
  FormGroup,
  FormLabel,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import AttentionIcon from "assets/img/attention-icon.png";
import { useWeb3 } from "utils/web3Utils";
import TREASURY from "abis/Treasury.json";
import ORACLE from "abis/Oracle.json";
import ERC20_ABI from "abis/ERC20.json";
import { TULIP_ADDRESS } from "config/constants";
import { ApproveBtn, BondTitle, LineDiv } from "SideBar.style";
const TREASURY_ADDRESS = "0x";
const ORACLE_ADDRESS = "0x";
const BUD_ADDRESS = "0x0";

export function Bonds() {
  const [isOverPeg, setIsOverPeg] = useState(true);
  const [budBalance, setBudBalance] = useState(0);
  const [rosePrice, setRosePrice] = useState(0);
  const [treasury, setTreasury] = useState(null);
  const [burnable, setBurnable] = useState(0);
  const web3 = useWeb3();
  const [amount, setAmount] = useState("0");
  const [redeemAmount, setRedeemAmount] = useState("0");
  const [premium, setPremium] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [, setSupply] = useState(0);
  const [tulipAllowance, setTulipAllowance] = useState(0);
  const [budAllowance, setBudAllowance] = useState(0);
  const [treasuryBalance, setTreasuryBalance] = useState(0);
  const [tulipBalance, setTulipBalance] = useState(0);

  const getPrice = async () => {
    const c = new web3.eth.Contract(ORACLE.abi, ORACLE_ADDRESS);
    const expectedPrice = await c.methods
      .twap(TULIP_ADDRESS, web3.utils.toWei("1", "ether"))
      .call();
    setIsOverPeg(expectedPrice / 10 ** 18 > 1);
  };

  const getBudBalance = async () => {
    const c = new web3.eth.Contract(ERC20_ABI, BUD_ADDRESS);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];

    const balance = await c.methods.balanceOf(address).call();
    setBudBalance(balance);
  };

  useEffect(async () => {
    if (web3 !== null) {
      await getTreasury();
      await getPrice();
      await getBudBalance();
      await isBudApproved();
      await isTulipApproved();
    }
  }, [web3]);

  useEffect(async () => {
    if (treasury !== null) {
      await bondPremium();
    }
  }, [treasury]);

  const getTreasury = async () => {
    const c = new web3.eth.Contract(TREASURY.abi, TREASURY_ADDRESS);
    setTreasury(c);
  };

  useEffect(async () => {
    if (treasury !== null && treasury !== undefined) {
      const x = await treasury.methods.getTulipUpdatedPrice().call();
      setRosePrice(x / 10 ** 18);
      const burnable = await treasury.methods.getBurnableTulipLeft().call();
      setBurnable(burnable);
      await bondDiscount();
      await epochSupply();

      const tulip = new web3.eth.Contract(ERC20_ABI, TULIP_ADDRESS);
      const treasuryBalance = await tulip.methods
        .balanceOf(TREASURY_ADDRESS)
        .call();
      const accounts = await web3.eth.getAccounts();
      const address = accounts[0];
      const tulipB = (await tulip.methods.balanceOf(address).call()) / 10 ** 18;
      setTulipBalance(
        Math.min(tulipB.toFixed(4), (burnable / 10 ** 18).toFixed(4))
      );
      setTreasuryBalance(treasuryBalance);
    }
  }, [treasury]);

  const isBudApproved = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const c = new web3.eth.Contract(ERC20_ABI, BUD_ADDRESS);
    c.methods
      .allowance(address, TREASURY_ADDRESS)
      .call()
      .then(async (allowance) => {
        setBudAllowance(allowance);
      });
  };

  const isTulipApproved = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const c = new web3.eth.Contract(ERC20_ABI, TULIP_ADDRESS);
    c.methods
      .allowance(address, TREASURY_ADDRESS)
      .call()
      .then(async (allowance) => {
        setTulipAllowance(allowance);
      });
  };

  const approveTulip = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const c = new web3.eth.Contract(ERC20_ABI, TULIP_ADDRESS);
    c.methods
      .approve(TREASURY_ADDRESS, web3.utils.toWei("100", "tether"))
      .send({
        from: address,
        gas: 1000000,
        gasPrice: 10 ** 11,
      })
      .then(async (allowance) => {
        setTulipAllowance(allowance);
      });
  };

  const approveBud = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const c = new web3.eth.Contract(ERC20_ABI, BUD_ADDRESS);
    c.methods
      .approve(TREASURY_ADDRESS, web3.utils.toWei("100", "tether"))
      .send({
        from: address,
        gas: 1000000,
        gasPrice: 10 ** 11,
      })
      .then(async (allowance) => {
        await isBudApproved();
        setBudAllowance(allowance);
      });
  };

  const redeemBonds = async () => {
    const treasury = new web3.eth.Contract(TREASURY.abi, TREASURY_ADDRESS);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const treasuryTulipPrice = await treasury.methods.getTulipPrice().call();
    await treasury.methods
      .redeemBonds(web3.utils.toWei(redeemAmount, "ether"), treasuryTulipPrice)
      .send({
        from: address,
        gas: 1000000,
        gasPrice: 10 ** 11,
      });
  };

  const bondPremium = async () => {
    const premium = await treasury.methods.getBondPremiumRate().call();
    setPremium(premium);
  };

  const bondDiscount = async () => {
    const discount = await treasury.methods.getBondDiscountRate().call();
    setDiscount(discount);
  };

  const epochSupply = async () => {
    const supply = await treasury.methods.epochSupplyContractionLeft().call();
    setSupply(supply);
  };

  const buyBonds = async () => {
    web3.eth.handleRevert = true;
    const treasuryTulipPrice = await treasury.methods.getTulipPrice().call();
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    return await treasury.methods
      .buyBonds(
        web3.utils.toWei(amount, "ether"),
        new web3.utils.BN(treasuryTulipPrice)
      )
      .send({
        from: address,
        gas: 1000000,
        gasPrice: 10 ** 11,
      });
  };

  return (
    <Stack gap={3}>
      <Row>
        <Col className="h2 text-gradient text-end">
          <span style={{ fontWeight: "bold" }}>BUD</span> (aka Bonds)
        </Col>
      </Row>
      <Row className="fade-in-bottom">
        <Stack gap={3}>
          <Row className="justify-content-center pt-3 gap-2 custom-grid">
            {[
              { title: "Last-Hour TWAP Price", text: rosePrice.toFixed(4) },
              {
                title: "BUD Price",
                text: isOverPeg
                  ? `Premium: ${(premium / 10 ** 18).toFixed(4)}`
                  : `Discount ${(discount / 10 ** 18).toFixed(4)}`,
              },
            ].map((data) => (
              <Col
                key={data.title}
                xs={{ span: 12 }}
                sm={{ span: 4 }}
                md={{ span: 4 }}
                lg={{ span: 3 }}
              >
                <Card
                  bg="dark"
                  text="light"
                  className="text-center border-gradient"
                >
                  <Card.Body>
                    <Card.Title className="h6">{data.title}</Card.Title>
                    <div className="h4 text-gradient pb-2 fw-bold">
                      {data.text}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="justify-content-center pt-3 d-flex">
            <div
              className="text-attention text-center px-3"
              style={{
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
                padding: "6px",
              }}
            >
              <img
                className="inline-image-logo pe-2"
                src={AttentionIcon}
                alt="Attention"
              />
              BUD REWARD BEGINS ONCE TULIP IS OVER 1.10 ROSE
            </div>
          </div>
          <Row className="justify-content-md-center pt-3 custom-grid">
            <Col
              className="mb-3"
              xs={{ span: 12 }}
              sm={{ span: 6 }}
              md={{ span: 5 }}
              lg={{ span: 4 }}
            >
              <Card
                bg="dark"
                text="light"
                className="text-center border-gradient"
              >
                <Card.Body>
                  <BondTitle>PURCHASE BUD</BondTitle>
                  <div className="pb-2">
                    <Stack className="ps-4 pe-4" gap={3}>
                      {[
                        {
                          title: "Epoch Supply",
                          text: (burnable / 10 ** 18).toFixed(4),
                        },
                        { title: "Purchase Amount", text: tulipBalance },
                      ].map((data) => (
                        <Row key={data.title}>
                          <Col className="text-start">
                            <span>{data.title}</span>
                          </Col>
                          <Col className="text-end">
                            <span>{data.text}</span>
                          </Col>
                        </Row>
                      ))}
                      <LineDiv />
                      <Row>
                        <Col>
                          <p style={{ margin: "10px 0" }}>TULIP is</p>
                          {/* eslint-disable-next-line no-constant-condition */}
                          {isOverPeg ? (
                            <p
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                marginBottom: "10px",
                              }}
                            >
                              <span
                                className="text-muted underText"
                                style={{ marginRight: "8px" }}
                              >
                                UNDER |{" "}
                              </span>{" "}
                              <span className="text-gradient ml-2 fw-bold overText">
                                OVER
                              </span>
                            </p>
                          ) : (
                            <p style={{ display: "flex" }}>
                              <span
                                className="text-gradient fw-bold underText"
                                style={{ marginRight: "8px" }}
                              >
                                UNDER
                              </span>{" "}
                              <span className="text-muted overText">
                                | OVER{" "}
                              </span>
                            </p>
                          )}
                          <p>PEG</p>
                          <p className="small">
                            This is determined by the price oracle.
                          </p>
                        </Col>
                      </Row>
                      {/* {
                      isOverPeg
                        ? <></>
                        : (tulipAllowance < 10 ** 19)
                            ? <Row className="justify-content-md-center">
                            <Col className="text-center">
                              <Button variant="primary" className="btn-gradient" onClick={approveTulip}>APPROVE</Button>
                            </Col>
                          </Row>
                            : <Row>
                            <Col>
                              <FormGroup>
                                <FormLabel htmlFor="bondStakeInput">Amount:</FormLabel>
                                <FormControl id="bondStakeInput" className="text-white text-end" type="text" value={amount}
                                  onChange={e => setAmount(e.target.value)} />
                              </FormGroup>
                            </Col>
                            <Col>
                              <FormLabel htmlFor="bondStakeInput">&nbsp;</FormLabel>
                              <Button variant="primary" className="btn-gradient" disabled={isOverPeg}
                                onClick={buyBonds}>PURCHASE</Button>
                            </Col>
                          </Row>
                    } */}
                    </Stack>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col
              className="mb-3"
              xs={{ span: 12 }}
              sm={{ span: 6 }}
              md={{ span: 5 }}
              lg={{ span: 4 }}
            >
              <Card
                bg="dark"
                text="light"
                className="text-center h-100 border-gradient"
              >
                <Card.Body>
                  <BondTitle>REDEEM BUD FOR TULIP</BondTitle>
                  <div className="pb-2">
                    <Stack className="ps-4 pe-4" gap={3}>
                      {[
                        { title: "Bud Balance", text: budBalance / 10 ** 18 },
                        {
                          title: "Treasury Balance",
                          text: (treasuryBalance / 10 ** 18).toFixed(2),
                        },
                      ].map((data) => (
                        <Row key={data.title}>
                          <Col className="text-start">
                            <span>{data.title}</span>
                          </Col>
                          <Col className="text-end">
                            <span>{data.text}</span>
                          </Col>
                        </Row>
                      ))}
                      <LineDiv />
                    </Stack>
                  </div>
                  <div className="pb-2 mt-5">
                    <Stack className="ps-4 pe-4" gap={3}>
                      {budAllowance > 10 ** 19 ? (
                        <Row>
                          <Col xs={{ span: 6 }}>
                            <FormGroup>
                              <FormLabel htmlFor="bondRedeemInput">
                                Amount:
                              </FormLabel>
                              <FormControl
                                id="bondRedeemInput"
                                className="text-white text-end"
                                type="text"
                                value={redeemAmount}
                                onChange={(e) =>
                                  setRedeemAmount(e.target.value)
                                }
                              />
                            </FormGroup>
                          </Col>
                          <Col xs={{ span: 6 }}>
                            <FormLabel>&nbsp;</FormLabel>
                            <Button
                              variant="primary"
                              className="btn-gradient"
                              disabled={!isOverPeg}
                              onClick={redeemBonds}
                            >
                              SELL
                            </Button>
                          </Col>
                        </Row>
                      ) : (
                        <Row className="justify-content-md-center">
                          <Col>
                            <ApproveBtn onClick={approveBud}>
                              APPROVE
                            </ApproveBtn>
                          </Col>
                        </Row>
                      )}
                    </Stack>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Stack>
      </Row>
    </Stack>
  );
}
