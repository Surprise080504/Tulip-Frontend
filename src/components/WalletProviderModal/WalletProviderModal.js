import React, { useEffect } from "react";
import { useWallet } from "use-wallet";
import WalletCard from "./WalletCard";
import { Container, Row, Modal } from "react-bootstrap";
import metamaskLogo from "assets/img/metamask-fox.svg";
import walletConnectLogo from "assets/img/wallet-connect.svg";
import coingBaseLogo from "assets/img/coinbase_logo.jpeg";
import { useWeb3 } from "utils/web3Utils";

const WalletProviderModal = ({ open, handleClose }) => {
  const { account, connect } = useWallet();
  const wallet = useWallet();
  let web3 = useWeb3();
  if (!web3) {
    web3 = window.web3;
  }

  useEffect(async () => {
    if (account) {
      handleClose();
    }
  });

  return (
    <Modal
      aria-labelledby="connect a wallet"
      aria-describedby="connect your crypto wallet"
      show={open}
      keyboard={true}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onHide={() => handleClose()}
      centered
    >
      <div className="modal-wrapper">
        <Modal.Header>
          <h2 className="modal-header-text center-text">Connect Wallet</h2>
        </Modal.Header>
        <Container style={{ marginBottom: "6px" }}>
          <Row component="nav" aria-label="main mailbox folders">
            <WalletCard
              icon={
                <img
                  src={metamaskLogo}
                  alt="Metamask logo"
                  style={{ width: 32 }}
                />
              }
              // onConnect={async () => {
              //   if (web3) {
              //     try {
              //       await web3.currentProvider.request({
              //         method: "wallet_switchEthereumChain",
              //         params: [{ chainId: "0x01" }],
              //       });
              //     } catch (error) {
              //       console.log(error);
              //     }
              //     connect("injected");
              //   }
              // }}
              onConnect={async () => {
                wallet.connect();
              }}
              title="Metamask"
            />
            <WalletCard
              icon={
                <img
                  src={walletConnectLogo}
                  alt="Wallet Connect logo"
                  style={{ width: 32 }}
                />
              }
              onConnect={() => {
                connect("walletconnect");
              }}
              title="WalletConnect"
            />
            <WalletCard
              icon={
                <img
                  src={coingBaseLogo}
                  alt="Coinbase wallet logo"
                  style={{ width: 32 }}
                />
              }
              onConnect={() => {
                connect("walletlink");
              }}
              title="Coinbase Wallet"
            />
          </Row>
        </Container>
      </div>
    </Modal>
  );
};

export default WalletProviderModal;
