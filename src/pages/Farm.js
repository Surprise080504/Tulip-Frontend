import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { useParams, Link } from "react-router-dom";
import { Button, Card, Col, Row, Stack, Modal } from "react-bootstrap";
import LiquidationPools from "config/config.js";
import TswapFarmPools from "config/farm-config.js";
import ERC20ABI from "abis/ERC20.json";

import { getTulipPrice, getPetalPrice, getRosePrice } from "utils/priceFeed";
import { makeFixed } from "utils/numUtils";
import { useWeb3 } from "utils/web3Utils";
import {
  PETAL_REWARD_POOL_ADDRESS,
  TULIP_ADDRESS,
  PETAL_ADDRESS,
  USD_COIN_CELER_ADDRESS,
  WROSE_ADDRESS,
  TSWAP_ADDRESS,
} from "config/constants";
import CountUp from "react-countup";

import PetalLogo from "assets/img/petal.png";
import TSwapImg from "assets/img/tswap.svg";

const TULIP_PER_SECOND = 0.00765;
const CHEF_ADDRESS = "0x624FDD79e30cb04924c68dcC7fc4EC4e85FbDe70";

export function Farm() {
  const { poolId } = useParams();
  const [allowance, setAllowance] = useState(0);
  const [stakedBalance, setStakedBalance] = useState(0);
  const [balance, setBalance] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [tvl, setTvl] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(defaultTokenPrice);
  const [earnedTokens, setEarnedTokens] = useState(0);
  // const [, setLPPrice] = useState(0)
  const [depositInputValue, setDepositInputValue] = useState("");
  const [showModal, setShowModal] = useState(false);
  console.log("tvl", tvl);

  // loading effects
  useEffect(async () => {
    if (web3 === null || web3 === undefined) {
      return;
    }
    isApproved();
    getStaked();
    getBalance();
    getStakedBalance();
    getPending();
    web3.eth.handleRevert = true;
  }, [web3]);

  useEffect(async () => {
    if (web3 === null || petalPrice === null) {
      return;
    }
    getTotalSupply();
  }, [web3, petalPrice, rosePrice, tulipPrice]);
  const petalPrice = useQuery("petalPrice", getPetalPrice, {
    staleTime: cacheStalenessExpiry,
  }).data;
  const tulipPrice = useQuery("tulipPrice", getTulipPrice, {
    staleTime: cacheStalenessExpiry,
  }).data;
  const rosePrice = useQuery("rosePrice", getRosePrice, {
    staleTime: cacheStalenessExpiry,
  }).data;
  const web3 = useWeb3();
  if (!poolId) {
    return <></>;
  }

  let pool = Object.values(TswapFarmPools).find((pool) => pool.pool === poolId);
  if (!pool) {
    pool = Object.values(LiquidationPools).find((pool) => pool.pool === poolId);
  }
  if (!pool) {
    return <></>;
  }

  const { logo } = pool;
  const rewardPoolAddress = pool.address;
  console.log("rewardPoolAddress", rewardPoolAddress);
  const { abi } = pool;

  const cacheStalenessExpiry = 30000;
  const {
    singleStakedTulip,
    singleStaked,
    usesTswap,
    usesUSDC,
    usesRose,
    usesBoth,
    usesPetal,
    _pid,
    tokenAddress,
    RATIO,
    defaultTokenPrice,
    decimals,
  } = pool;

  // TODO: Modals
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const doClaimRewards = async () => {
    const c = new web3.eth.Contract(abi, rewardPoolAddress);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    return await c.methods.withdraw(_pid, 0).send({
      from: address,
      gas: 1000000,
      gasPrice: 10 ** 11,
    });
  };

  const doWithdrawAll = async () => {
    const c = new web3.eth.Contract(abi, rewardPoolAddress);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const userInfo = await c.methods.userInfo(_pid, address).call();
    return await c.methods.withdraw(_pid, userInfo.amount).send({
      from: address,
      gas: 1000000,
      gasPrice: 10 ** 11,
    });
  };

  const getTotalSupply = async () => {
    // const c = new web3.eth.Contract(abi, rewardPoolAddress)
    const contract = new web3.eth.Contract(ERC20ABI, pool.depositTokenAddress);
    const locked = await contract.methods.balanceOf(pool.address).call();
    console.log("locked", locked);
    setTvl((locked * tokenPrice) / 10 ** 18);
  };

  const getPending = async () => {
    const c = new web3.eth.Contract(abi, rewardPoolAddress);
    const accounts = await web3.eth.getAccounts();

    const address = accounts[0];
    try {
      c.methods
        .pendingTULIP(_pid, address)
        .call()
        .then((pending) => {
          setEarnedTokens(pending);
        });
    } catch (err) {
      c.methods
        .pendingShare(_pid, address)
        .call()
        .then((pending) => {
          setEarnedTokens(pending);
        });
    }
  };

  const stake = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const c = new web3.eth.Contract(abi, rewardPoolAddress);

    c.methods
      .deposit(_pid, web3.utils.toWei(depositInputValue.toString(), "ether"))
      .send({
        from: address,
        gas: 1000000,
        gasPrice: 10 ** 11,
      })
      .then(() => {
        const c = new web3.eth.Contract(abi, rewardPoolAddress);
        c.methods
          .userInfo(_pid, address)
          .call()
          .then(async (balance) => {
            setBalance(balance);
            await getStakedBalance();
          });
      });
  };

  const getStakedBalance = async () => {
    const c = new web3.eth.Contract(abi, rewardPoolAddress);
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    c.methods
      .userInfo(_pid, address)
      .call()
      .then((info) => {
        setStakedBalance(info.amount);
      });
  };

  const getBalance = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const erc20 = new web3.eth.Contract(ERC20ABI, pool.depositTokenAddress);
    erc20.methods
      .balanceOf(address)
      .call()
      .then((balance) => {
        console.log("balance", balance);
        setBalance(balance);
      });
  };

  const doApprove = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const c = new web3.eth.Contract(ERC20ABI, pool.depositTokenAddress);
    c.methods
      .approve(rewardPoolAddress, web3.utils.toWei("100", "tether"))
      .send({
        from: address,
        gas: 1000000,
        gasPrice: 10 ** 11,
      })
      .then((allowance) => {
        isApproved(web3);
      });
  };

  const getStaked = async () => {
    const erc20 = new web3.eth.Contract(ERC20ABI, tokenAddress);
    // erc20.methods.balanceOf(pool.address).call().then((totalUSDTstaked) => {
    //   setTotalStaked(totalUSDTstaked)
    // })
  };

  const isApproved = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const c = new web3.eth.Contract(ERC20ABI, pool.depositTokenAddress);
    await c.methods
      .allowance(address, rewardPoolAddress)
      .call()
      .then(async (allowance) => {
        setAllowance(allowance);
        if (allowance > 10 ** decimals) {
          await getStaked();
        }
      });
  };

  const tokensPerSecond =
    pool.address === CHEF_ADDRESS ? 0.1929 * RATIO : TULIP_PER_SECOND * RATIO;
  const rewardTokenPrice = pool.address === CHEF_ADDRESS ? 0.008 : petalPrice;

  const tokenPerHour = tokensPerSecond * 60 * 60;
  const totalRewardPricePerDay = tokenPerHour * 24 * rewardTokenPrice;

  const stakedValue = (totalStaked / 10 ** decimals) * tokenPrice;
  const dailyPR = (totalRewardPricePerDay / stakedValue) * 100;
  const yearlyPR = dailyPR * 365;

  if (web3 === null || web3 === undefined) {
    return <Row className="align-items-center" />;
  }

  const DECIMALS = decimals;

  return (
    <Stack gap={3}>
      <Row>
        <Col
          className="h2 text-gradient fw-bold text-end farm-title"
          style={{ position: "relative" }}
        >
          <div>Farms</div>
          <img
            src={pool.logo}
            style={{ position: "absolute", right: 0, maxWidth: 120, top: 40 }}
          />
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <div className="h2 text-center text-gradient fw-bold m-3">
            {pool.tokenName} Farm
          </div>
          {/* <Link to='https://tswa'>
          <Button className="buy-button m-3">BUY NOW on <img src={TSwapImg} /></Button>
        </Link> */}
        </Col>
      </Row>
      <Row className="justify-content-center fade-in-bottom">
        {[
          {
            title: "APR",
            data: makeFixed(yearlyPR, "%", 2),
            rawdata: yearlyPR,
          },
          {
            title: "Daily APR",
            data: makeFixed(dailyPR, "%", 2),
            rawdata: dailyPR,
          },
          { title: "TVL", data: makeFixed(tvl, "", 2, "$"), rawdata: tvl },
        ].map((tokenStat) => (
          <Col
            key={tokenStat.title}
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
                <Card.Title className="h6">{tokenStat.title}</Card.Title>
                <Card.Text className="h4 text-gradient">
                  <CountUp
                    end={
                      tokenStat.rawdata === 1 / 0 ? "..." : tokenStat.rawdata
                    }
                    decimals={2}
                    duration={1}
                    separator={","}
                    prefix={tokenStat.title === "TVL" ? "$" : ""}
                    suffix={tokenStat.title !== "TVL" ? "%" : ""}
                  />
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Row
        className="justify-content-center fade-in-bottom custom-grid"
        xs={1}
        sm={1}
        lg={2}
      >
        <Col md={6} lg={5} xl={5} className="pt-3">
          <Card className="p-2 bg-dark border-gradient text-center">
            <Card.Body>
              <Row>
                <Col xs="12">
                  <span className="text-gradient h2">
                    {pool.earnToken.toUpperCase()}
                  </span>
                </Col>
              </Row>
              <Row className="my-4">
                <Col sm="12">
                  <img
                    className="d-block mx-auto img-fluid w-25"
                    style={{ minWidth: "100px" }}
                    src={PetalLogo}
                    alt=""
                  />
                </Col>
              </Row>
              <Row>
                <Col xs="12">
                  <div>
                    <span className="text-gradient h3">
                      {(earnedTokens / 10 ** 18).toFixed(4)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gradient h3">&nbsp;</span>
                  </div>
                  <div>
                    <span className="text-white h5">
                      {pool.earnToken.toUpperCase()} EARNED
                    </span>
                  </div>
                </Col>
              </Row>
              <Row className="justify-content-center my-4">
                <Col md={{ span: 8 }}>
                  <Button
                    variant="outline-primary"
                    className="text-white"
                    disabled={earnedTokens === 0}
                    onClick={doClaimRewards}
                  >
                    CLAIM
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} lg={5} xl={5} className="pt-3">
          <Card className="p-2 bg-dark border-gradient text-center full-height">
            <Card.Body>
              <Row>
                <Col>
                  <span className="text-gradient h2">{pool.tokenName}</span>
                </Col>
              </Row>
              <Row className="my-4">
                <Col sm="12">
                  <img
                    className="d-block mx-auto img-fluid w-25"
                    style={{ minHeight: "97.8px", minWidth: "100px" }}
                    src={logo}
                    alt=""
                  />
                </Col>
              </Row>

              <Row>
                <Col>
                  <div>
                    <span className="text-gradient h3">
                      $
                      {((tokenPrice * stakedBalance) / 10 ** DECIMALS).toFixed(
                        4
                      )}
                    </span>
                  </div>
                  <div>
                    <span className="text-gradient h3">
                      {parseFloat((stakedBalance / 10 ** 18).toFixed(18))}
                    </span>
                  </div>
                  <span className="text-white h5">
                    {pool.token0 === pool.token1
                      ? pool.token0
                      : `${pool.token0.toUpperCase()}-${pool.token1.toUpperCase()} LP Staked`}
                  </span>
                </Col>
              </Row>
              <Row className="justify-content-center my-4">
                <Col md={{ span: 8 }}>
                  {allowance < 10 ** 18 * 1000 ? (
                    <span>
                      <Button
                        onClick={doApprove}
                        variant="outline-primary"
                        className="text-white"
                      >
                        Approve
                      </Button>
                    </span>
                  ) : (
                    <>
                      <Button
                        variant="outline-primary"
                        className="text-white"
                        onClick={handleShowModal}
                        disabled={pool.tokenName === "OAPE/TULIP LP"}
                      >
                        STAKE
                      </Button>

                      <Modal
                        show={showModal}
                        onHide={handleCloseModal}
                        centered
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>
                            {pool.token0 !== pool.token1
                              ? `${pool.token0.toUpperCase()}-${pool.token1.toUpperCase()} LP`
                              : `${pool.token0} SINGLE STAKING`}
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Row>
                            BALANCE:{" "}
                            {parseFloat((balance / 10 ** 18).toFixed(18))}
                          </Row>
                          <Row>
                            <Col md="9">
                              <input
                                style={{ width: "100%", textAlign: "right" }}
                                value={depositInputValue}
                                onChange={(e) =>
                                  setDepositInputValue(e.target.value)
                                }
                              />
                            </Col>
                            <Col md="3">
                              <Button
                                variant="outline-primary"
                                className="text-white"
                                onClick={() =>
                                  setDepositInputValue(
                                    web3.utils.fromWei(balance, "ether")
                                  )
                                }
                              >
                                MAX
                              </Button>
                            </Col>
                          </Row>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button
                            variant="outline-primary"
                            className="text-white"
                            onClick={stake}
                          >
                            Stake
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="justify-content-center fade-in-bottom mt-4">
        <Col md="4" sm="12" className="text-center">
          <Button
            className="text-white ps-5 pe-5"
            variant="outline-primary"
            onClick={doWithdrawAll}
          >
            {" "}
            CLAIM &amp; WITHDRAW{" "}
          </Button>
        </Col>
      </Row>
    </Stack>
  );
}
