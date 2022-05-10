import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useWallet } from "use-wallet";
import WalletConnectModal from "./WalletProviderModal";
import MetamaskIcon from "assets/img/metamask-fox.svg";

export default function WalletConnect() {
  const [connected, setConnected] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { account, connect } = useWallet();
  // useEffect(() => {
  //   connect()
  // }, [])

  useEffect(() => {
    setConnected(!(account === null));
  }, [connect]);

  return (
    <>
      {account ? (
        <Button variant="outline-primary" className="btn-gradient">
          {account.substring(0, 6)}...{account.substring(account.length - 4)}
        </Button>
      ) : (
        <Button
          className="btn-gradient"
          onClick={() => setShowModal(!showModal)}
        >
          <img src={MetamaskIcon} className="pr-2" />
          CONNECT
        </Button>
      )}
      <WalletConnectModal
        open={showModal}
        handleClose={() => setShowModal(false)}
      />
    </>
  );
}
