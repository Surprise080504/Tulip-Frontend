/* eslint-disable no-unused-vars */

import React, { useEffect, useState } from "react";
import {
  OverlayTrigger,
  Tooltip,
  Button,
  Row,
  Col,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useQuery } from "react-query";

import ERC20ABI from "abis/ERC20.json";
import BEEFY_VAULT_V6 from "abis/BeefyVaultV6.json";
import STRATEGY from "abis/StrategyCommonChefLP.json";
import { getPetalPrice } from "utils/priceFeed";
import { useWeb3 } from "utils/web3Utils";

import { BsFillQuestionCircleFill } from "react-icons/bs";

import { makeFixed } from "utils/numUtils";

const apy = (r, n) => (1 + r / n) ** n - 1;

const addCommas = (numberString) => {
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "%";
};

const TULIP_PER_SECOND = 0.00765;

export default function Flower({
  RATIO,
  name,
  chef,
  depositToken,
  inputToken,
  strategyAddress,
  wantAddress,
  vaultAddress,
  farmAddress,
  token0Price,
  token1Price,
  token0Address,
  token1Address,
  pid,
  tokenLink,
  icon,
}) {
  const petalPrice = useQuery("petalPrice", getPetalPrice, [1]).data;

  const [allowance, setAllowance] = useState(0);
  const SliderInitPercent = 50;

  const [balanceValue, setBalanceValue] = useState(0);
  const [withdrawValue, setWithdrawValue] = useState(0);
  const [tokenPrice, setTokenPrice] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [balanceSliderValue, setBalanceSliderValue] = useState(0);
  const [withdrawSliderValue, setWithdrawSliderValue] = useState(0);

  // Pool - User Balance Fields
  const [walletAmount, setWalletAmount] = useState("...");
  const [walletAmountToken, setWalletAmountToken] = useState("...");
  const [depositedAmountUSD, setDepositedAmountUSD] = useState("...");
  const [depositedAmountToken, setDepositedAmountToken] = useState("...");
  const [totalValue, setTotalValue] = useState("...");
  const [walletValue, setWalletValue] = useState("...");
  const [apyDisplay, setApyDisplay] = useState("...");

  // Pool - Pool Stats Fields
  const [poolAPR, setPoolAPR] = useState("...");
  const [poolDPR, setPoolDPR] = useState("...");
  const [poolTVL, setPoolTVL] = useState("...");

  // Web3
  const web3 = useWeb3();

  useEffect(async () => {
    if (totalValue === "...") {
      return;
    }
    setWalletValue((totalValue / 10 ** 18) * depositedAmountToken);
    await getTokenPrice();
  }, [totalValue, depositedAmountToken, petalPrice, tokenPrice]);

  useEffect(async () => {
    if (poolAPR === "...") {
      return;
    }
    const display = addCommas((apy(poolAPR / 100, 500) * 100).toFixed(0));
    setApyDisplay(display);
  }, [poolAPR]);

  // loading effects
  useEffect(async () => {
    if (web3 === null || web3 === undefined) {
      return;
    }

    isApproved();
    getStaked();
    getTokenPrice();

    await getWalletAmount();
    await getDepositedAmount();
    await getPricePerFullShare();
    web3.eth.handleRevert = true;
  }, [web3]);

  useEffect(async () => {
    if (web3 === null) {
      return;
    }
    await getTotalDeposited();
  }, [web3, tokenPrice]);

  // TOKEN APPROVAL
  // TODO: is PAIR_ADDRESS/VAULT_ADDRESS correct here?
  const doApprove = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const c = new web3.eth.Contract(ERC20ABI, wantAddress);
    c.methods
      .approve(vaultAddress, web3.utils.toWei("100", "tether"))
      .send({
        from: address,
        gas: 1000000,
        gasPrice: 10 ** 11,
      })
      .then((allowance) => {
        isApproved(web3);
      });
  };

  // TODO: is PAIR_ADDRESS/VAULT_ADDRESS correct here?
  const isApproved = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const c = new web3.eth.Contract(ERC20ABI, wantAddress);
    await c.methods
      .allowance(address, vaultAddress)
      .call()
      .then(async (allowance) => {
        setAllowance(allowance);
        if (allowance > 10 ** 18) {
          // TODO: await getStaked()
        }
      });
  };

  const getStaked = async () => {
    const erc20 = new web3.eth.Contract(ERC20ABI, wantAddress);
    erc20.methods
      .balanceOf(farmAddress)
      .call()
      .then((totalUSDTstaked) => {
        setTotalStaked(totalUSDTstaked);
        return totalUSDTstaked;
      });
  };

  const getTokenPrice = async () => {
    const c = new web3.eth.Contract(ERC20ABI, wantAddress);
    await c.methods
      .totalSupply()
      .call()
      .then(async (ts) => {
        const tulip = new web3.eth.Contract(ERC20ABI, token0Address);
        const balance1 = await tulip.methods.balanceOf(wantAddress).call();
        const petal = new web3.eth.Contract(ERC20ABI, token1Address);
        const balance2 = await petal.methods.balanceOf(wantAddress).call();
        const tvl =
          (balance1 * token0Price + balance2 * token1Price) / 10 ** 18;
        setPoolTVL(tvl.toFixed(2));
        const lpPrice = tvl / (ts / 10 ** 18);
        setTokenPrice(lpPrice);

        const erc20 = new web3.eth.Contract(ERC20ABI, wantAddress);
        const totalStaked = await erc20.methods.balanceOf(farmAddress).call();

        const tokensPerSecond = TULIP_PER_SECOND * RATIO;
        const tokenPerHour = tokensPerSecond * 60 * 60;

        const totalRewardPricePerDay = tokenPerHour * 24 * petalPrice;
        const stakedValue = (totalStaked / 10 ** 18) * lpPrice;
        const dailyPR = (totalRewardPricePerDay / stakedValue) * 100;
        const yearlyPR = dailyPR * 365;

        setPoolAPR(yearlyPR);
        setPoolDPR(dailyPR);
      });
  };

  const balanceSlider = `linear-gradient(to right, #7571FF 0%, #7571FF ${balanceSliderValue}%, #34384C ${balanceSliderValue}%, #34384C 100%)`;
  const depositSlider = `linear-gradient(to right, #7571FF 0%, #7571FF ${withdrawSliderValue}%, #34384C ${withdrawSliderValue}%, #34384C 100%)`;

  // TODO: Currently hardcoded to 'TULIP/ROSE'
  // TODO: Convert to USD
  const getWalletAmount = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const erc20 = new web3.eth.Contract(ERC20ABI, wantAddress);
    erc20.methods
      .balanceOf(address)
      .call()
      .then((balance) => {
        const currBalance = balance / 10 ** 18;
        setWalletAmountToken(currBalance.toFixed(4));
        setWalletAmount(balance);
        setBalanceValue(currBalance * (50 / 100));
      });
  };

  const getTotalDeposited = async () => {
    const erc20 = new web3.eth.Contract(BEEFY_VAULT_V6.abi, vaultAddress);
    const strat = new web3.eth.Contract(STRATEGY.abi, strategyAddress);
    erc20.methods
      .balance()
      .call()
      .then(async (balance) => {
        setDepositedAmountUSD((balance * tokenPrice) / 10 ** 18);
      });
  };

  // TODO: Currently hardcoded to 'PETAL/TULIP Pair'
  // TODO: Convert to USD
  const getDepositedAmount = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const erc20 = new web3.eth.Contract(ERC20ABI, vaultAddress);
    erc20.methods
      .balanceOf(address)
      .call()
      .then((balance) => {
        setDepositedAmountToken((balance / 10 ** 18).toFixed(4));
        setWithdrawValue(balance / 10 ** 18 / 2);
      });
  };

  const handleBalanceSlider = async (sliderValue) => {
    setBalanceSliderValue(sliderValue);
    setBalanceValue(walletAmountToken * (sliderValue / 100));
  };

  const handleWithdrawSlider = async (sliderValue) => {
    setWithdrawSliderValue(sliderValue);
    setWithdrawValue(depositedAmountToken * (sliderValue / 100));
  };

  const handleDepositInput = async (numberString) => {
    return setBalanceValue(numberString.replace(/^[-+]?[0-9]+\.[^0-9]+$/, ""));
  };

  const handleWithdrawInput = async (numberString) => {
    return setWithdrawValue(numberString.replace(/^[-+]?[0-9]+\.[^0-9]+$/, ""));
  };

  const doStake = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const vault = new web3.eth.Contract(BEEFY_VAULT_V6.abi, vaultAddress);
    if (balanceSliderValue === "100") {
      const result = await vault.methods.deposit(walletAmount).send({
        from: address,
        gas: 1000000,
        gasPrice: 10 ** 11,
      });
      await getWalletAmount();
    } else {
      const result = await vault.methods
        .deposit(web3.utils.toWei(String(balanceValue), "ether"))
        .send({
          from: address,
          gas: 1000000,
          gasPrice: 10 ** 11,
        });
      await getWalletAmount();
    }
  };

  const doWithdraw = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const vault = new web3.eth.Contract(BEEFY_VAULT_V6.abi, vaultAddress);
    await vault.methods.withdraw(String(withdrawValue * 10 ** 18)).send({
      from: address,
      gas: 1000000,
      gasPrice: 10 ** 11,
    });
  };
  const doHarvest = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const strat = new web3.eth.Contract(STRATEGY.abi, strategyAddress);
    await strat.methods.harvest().send({
      from: address,
      gas: 1000000,
      gasPrice: 10 ** 11,
    });
  };

  const doWithdrawAll = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const vault = new web3.eth.Contract(BEEFY_VAULT_V6.abi, vaultAddress);
    await vault.methods.withdrawAll().send({
      from: address,
      gas: 1000000,
      gasPrice: 10 ** 11,
    });
  };

  const getPricePerFullShare = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const vault = new web3.eth.Contract(BEEFY_VAULT_V6.abi, vaultAddress);
    const pricePerShare = await vault.methods.getPricePerFullShare().call();
    setTotalValue(pricePerShare);
  };

  if (web3 === null || web3 === undefined) {
    return <Row className="align-items-center" />;
  }

  return (
    <div className="bg-dark border-gradient p-3 fw-bold">
      <Row>
        <Col>
          <Row style={{ marginLeft: "10px" }}>
            <Col
              md={{ span: 2 }}
              xs={{ span: 12 }}
              className="d-flex justify-content-center"
            >
              <img
                src={icon}
                style={{ maxWidth: "50px", margin: "auto" }}
                alt=""
              />
            </Col>
            <Col md={{ span: 10 }} xs={{ span: 12 }}>
              <Row>
                <Col className="text-gradient h3 text-center">{name}</Col>
                {/* <Row>
                  Uses: {chef}
                </Row>
                <Row>
                  <a style={{ textAlign: 'left', paddingLeft: 0 }} href={tokenLink}>BUY ${inputToken}</a>
                </Row> */}
              </Row>
            </Col>
          </Row>
        </Col>

        <Col md={{ span: 8 }} className="d-flex">
          <Row
            xs={1}
            xl={5}
            className="w-100 justify-content-center text-center"
          >
            <Col>
              <div className="text-gradient">
                {makeFixed(walletValue, "LP", 2)} ={" "}
                {makeFixed(walletValue * tokenPrice, "", 2, "$")}
              </div>
              <div className="small text-white fw-light">
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip>
                      This shows your current balance in LP tokens if converted
                      back from TULIPbouquet
                    </Tooltip>
                  }
                >
                  <span>
                    Deposited Balance <BsFillQuestionCircleFill />
                  </span>
                </OverlayTrigger>
              </div>
            </Col>
            <Col>
              <div className="text-gradient">{apyDisplay}</div>
              <div className="small text-white fw-light">APY</div>
            </Col>
            <Col>
              <div className="text-gradient">{makeFixed(poolDPR, "%", 2)}</div>
              <div className="small text-white fw-light">DAILY</div>
            </Col>
            <Col>
              <div className="text-gradient">
                {makeFixed(depositedAmountUSD, "", 2, "$")}
              </div>
              <div className="small text-white fw-light">
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip>Total Value Locked in Pool (Overall)</Tooltip>
                  }
                >
                  <span>
                    BOUQUET TVL <BsFillQuestionCircleFill />
                  </span>
                </OverlayTrigger>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="my-4">
        <Col md={{ span: 6 }} className="px-4 py-4">
          <Row>
            <Col>
              <div className="light text-white ms-2 mb-1">
                Balance:{" "}
                <span className="text-gradient">{walletAmountToken}</span>{" "}
                {depositToken}
              </div>
              <InputGroup className="d-flex flex-column">
                <div>
                  <FormControl
                    className="text-white"
                    placeholder="0.000"
                    value={balanceValue}
                    onChange={(e) => handleDepositInput(e.target.value)}
                  />
                </div>
                <div>
                  <FormControl
                    style={{
                      height: 6,
                      padding: 0,
                      marginTop: 10,
                      marginBottom: 10,
                      background: balanceSlider,
                    }}
                    onChange={(e) => handleBalanceSlider(e.target.value)}
                    type="range"
                    min="0"
                    max="100"
                  />
                  <div className="d-flex justify-content-between text-gray small fw-light">
                    <span>&nbsp;0&nbsp;</span>
                    <span>&nbsp;25</span>
                    <span>&nbsp;50</span>
                    <span>&nbsp;75</span>
                    <span>100</span>
                  </div>
                </div>
              </InputGroup>
            </Col>
          </Row>
          <Row className="mt-4 justify-content-center text-center">
            <Col xl={{ span: 4 }}>
              {allowance < 10 ** 18 * 1000 ? (
                <span>
                  <Button
                    onClick={doApprove}
                    variant="outline-secondary"
                    className="text-white"
                  >
                    APPROVE
                  </Button>
                </span>
              ) : (
                <Button
                  variant="outline-secondary"
                  className="text-white"
                  onClick={doStake}
                >
                  STAKE
                </Button>
              )}
            </Col>
          </Row>
          <Row className="mt-4 fw-light small text-center text-gray">
            <Col>
              <span>
                You will receive TULIPbouquet token as a receipt for your
                deposited TULIP assets. The token is needed to withdraw your
                TULIP. Do not trade or transfer your TULIPbouquet to strangers!
              </span>
            </Col>
          </Row>
        </Col>

        <Col md={{ span: 6 }} className="px-4 py-4">
          <Row>
            <Col>
              <div className="light text-white ms-2 mb-1">
                <OverlayTrigger
                  placement="right"
                  overlay={
                    <Tooltip>
                      This represents your shares of the Autocompounder Vault
                    </Tooltip>
                  }
                >
                  <div className="light text-white ms-2 mb-1">
                    Deposited:{" "}
                    <span className="text-gradient">
                      {depositedAmountToken}
                    </span>{" "}
                    TULIPbouquet <BsFillQuestionCircleFill />
                  </div>
                </OverlayTrigger>
              </div>
              <InputGroup className="d-flex flex-column">
                <div>
                  <FormControl
                    className="text-white"
                    placeholder="0.000"
                    value={withdrawValue}
                    onChange={(e) => handleWithdrawInput(e.target.value)}
                  />
                </div>
                <div>
                  <FormControl
                    style={{
                      height: 6,
                      padding: 0,
                      marginTop: 10,
                      marginBottom: 10,
                      background: depositSlider,
                    }}
                    onChange={(e) => handleWithdrawSlider(e.target.value)}
                    type="range"
                    min="0"
                    max="100"
                  />
                  <div className="d-flex justify-content-between text-gray small fw-light">
                    <span>&nbsp;0&nbsp;</span>
                    <span>&nbsp;25</span>
                    <span>&nbsp;50</span>
                    <span>&nbsp;75</span>
                    <span>100</span>
                  </div>
                </div>
              </InputGroup>
            </Col>
          </Row>
          <Row className="mt-4 justify-content-center text-center">
            <Col xl={{ span: 5 }}>
              <Button
                onClick={doWithdraw}
                variant="outline-primary"
                className="text-white"
              >
                WITHDRAW
              </Button>
            </Col>
            <Col xl={{ span: 5 }} className="pt-3 pt-xl-0">
              <Button
                onClick={doWithdrawAll}
                variant="outline-primary"
                className="text-white"
              >
                WITHDRAW ALL
              </Button>
            </Col>
          </Row>
          <Row className="mt-4 fw-light small text-center text-gray">
            <Col>
              <div>Deposit Fee: 0%, Withdrawal Fee: 0.1%</div>
              <div>Withdrawal will Result in:</div>
              <div>Redeem TULIPbouquet token for {depositToken}</div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center text-center">
        <Col xl={{ span: 4 }} className="pt-3 pt-xl-0">
          <Button
            variant="outline-primary"
            className="text-white"
            onClick={doHarvest}
          >
            MANUAL COMPOUND
          </Button>
        </Col>
      </Row>
    </div>
  );
}
