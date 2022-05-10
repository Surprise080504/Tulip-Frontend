import { useEffect, useState } from "react";

import ERC20ABI from "abis/ERC20.json";

import { Button, Row, Col, Modal, Card } from "react-bootstrap";
import ZAPPER from "abis/Zap";
import { doApprove, getIsApproved } from "utils/transactions";
import { TULIP_ADDRESS, PETAL_ADDRESS, WROSE_ADDRESS } from "config/constants";
import { ZAPButton } from "SideBar.style";

const ROUTER_ADDRESS = "0x";
const ZAP_ADDRESS = "0x";

export default function Zap({
  offset,
  web3,
  logo,
  tokenName,
  want,
  token0,
  token0Name,
  rosePrice,
  logoWidth,
}) {
  const [showModal, setShowModal] = useState(false);
  const [depositInputValue, setDepositInputValue] = useState("0");
  const [selectedToken, setSelectedToken] = useState("");
  const [balance, setBalance] = useState("0");
  const [isApproved, setIsApproved] = useState(false);
  const [token0Amount, setToken0Amount] = useState(0);
  const [token1Amount, setToken1Amount] = useState(0);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleApprove = async () => {
    if (selectedToken === "") {
      return;
    }
    const tokenAddress =
      selectedToken === "TULIP"
        ? TULIP_ADDRESS
        : selectedToken === "PETAL"
        ? PETAL_ADDRESS
        : WROSE_ADDRESS;
    await doApprove(web3, tokenAddress, ZAP_ADDRESS);
  };
  useEffect(async () => {
    if (web3 === null) {
      return;
    }
    const tokenContract = new web3.eth.Contract(ERC20ABI, WROSE_ADDRESS);
    // const tokenContract = new web3.eth.Contract(ERC20ABI, token0);
    const balance = await tokenContract.methods.balanceOf(want).call();

    const wroseContract = new web3.eth.Contract(ERC20ABI, WROSE_ADDRESS);
    const wroseBalance = await wroseContract.methods.balanceOf(want).call();

    const wantContract = new web3.eth.Contract(ERC20ABI, want);
    const wantSupply = await wantContract.methods.totalSupply().call();
    setToken0Amount(balance / wantSupply);
    setToken1Amount(wroseBalance / wantSupply);
  }, [web3]);

  useEffect(async () => {
    if (web3 === null) {
      return;
    }
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const tokenAddress =
      selectedToken === "TULIP"
        ? TULIP_ADDRESS
        : selectedToken === "PETAL"
        ? PETAL_ADDRESS
        : WROSE_ADDRESS;
    await setIsApproved(
      await getIsApproved(web3, tokenAddress, address, ZAP_ADDRESS)
    );
  }, [selectedToken]);

  useEffect(async () => {
    if (web3 === null) {
      return;
    }
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const tokenAddress =
      selectedToken === "TULIP"
        ? TULIP_ADDRESS
        : selectedToken === "PETAL"
        ? PETAL_ADDRESS
        : WROSE_ADDRESS;
    const tokenContract = new web3.eth.Contract(ERC20ABI, tokenAddress);
    const balance = await tokenContract.methods.balanceOf(address).call();
    setBalance(balance);
  }, [selectedToken]);

  const doZap = async () => {
    const accounts = await web3.eth.getAccounts();
    const address = accounts[0];
    const tokenAddress =
      selectedToken === "TULIP"
        ? TULIP_ADDRESS
        : selectedToken === "PETAL"
        ? PETAL_ADDRESS
        : WROSE_ADDRESS;
    const zapper = new web3.eth.Contract(ZAPPER.abi, ZAP_ADDRESS);
    const wei = new web3.utils.BN(web3.utils.toWei(depositInputValue, "ether"));
    // const withdrawalAmount = web3.utils.BN.min(wei, new web3.utils.BN(balance))
    await zapper.methods
      .zapInToken(tokenAddress, wei, want, ROUTER_ADDRESS, address)
      .send({
        from: address,
        gas: 1000000,
      });
  };

  return (
    <>
      <Card
        bg="dark"
        text="light"
        className="text-center p-3 h-100 border-gradient"
      >
        <Card.Body>
          <div className="h2 text-gradient pb-2" style={{ fontWeight: "bold" }}>
            ZAP IN
          </div>
          <div className="pb-2">
            <div className="h4 mt-4">TOKEN - TOKEN LP</div>
            <div className="mt-2">
              {token0Amount.toFixed(4)}
              <span className="text-gradient" style={{ fontWeight: "bold" }}>
                &nbsp;{token0Name}
              </span>
              &nbsp;/&nbsp;
              {token1Amount.toFixed(4)}
              <span className="text-gradient" style={{ fontWeight: "bold" }}>
                &nbsp;WROSE
              </span>
            </div>
            <div
              className="h2 text-gradient mt-3"
              style={{ fontWeight: "bold" }}
            >
              ${(token1Amount * rosePrice * 2).toFixed(2)}
            </div>
          </div>
          <div className="mt-4 pb-2">
            <ZAPButton
              className="zap-button"
              onClick={() => setShowModal(true)}
            >
              ZAP
            </ZAPButton>
          </div>
        </Card.Body>
      </Card>

      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        contentClassName="bg-dark"
      >
        <Modal.Header className="text-white" closeButton>
          <Modal.Title>ZAPPER</Modal.Title>
        </Modal.Header>
        <Modal.Body className="gap-2 d-flex flex-column">
          <Row>
            <Col className="text-white">
              Select Token:{" "}
              <select onChange={(e) => setSelectedToken(e.target.value)}>
                <option value="">SELECT TOKEN</option>
                <option value="TULIP">TULIP</option>
                <option value="PETAL">PETAL</option>
                <option value="wROSE">wROSE</option>
              </select>
            </Col>
          </Row>
          <Row>
            <Col className="text-white">
              Amount to ZAP into {tokenName} LP Pair
            </Col>
          </Row>
          <Row>
            <Col className="text-white">
              Balance: {Math.floor(balance * 10 ** 4) / 10 ** 22}
            </Col>
          </Row>
          <Row className="text-white">
            <Col md="9">
              <input
                style={{ width: "100%", textAlign: "right" }}
                value={depositInputValue}
                onChange={(e) => setDepositInputValue(e.target.value)}
              />
            </Col>
          </Row>
          <Row className="mt-4">
            <Col className="text-white text-center">
              {!isApproved ? (
                <Button
                  variant="outline-primary"
                  className="text-white"
                  onClick={handleApprove}
                >
                  Approve
                </Button>
              ) : (
                <Button
                  variant="outline-primary"
                  className="text-white"
                  onClick={doZap}
                >
                  Zap
                </Button>
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
