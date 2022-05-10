import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
// import { TULIP_REWARD_POOL } from 'config/constants'
import CountUp from "react-countup";
import { TokenDataSmallText } from "SideBar.style";

const TULIP_REWARD_POOL = "0x";
const PETAL_REWARD_POOL_ADDRESS = "0x";

export default function TokenData({
  rosePrice,
  web3,
  contract,
  price,
  tokenName,
  logo,
}) {
  const [totalSupply, setTotalSupply] = useState(0);
  const [circulatingSupply, setCirculatingSupply] = useState(0);

  useEffect(async () => {
    if (!web3) {
      return;
    }
    const chainId = await web3.eth.getChainId();
    if (contract !== null && chainId === 42262) {
      const supply = await contract.methods.totalSupply().call();
      setTotalSupply(supply);
      // const poolBalance = await contract.methods.balanceOf(PETAL_REWARD_POOL_ADDRESS).call()
      // const poolBalance2 = await contract.methods.balanceOf(TULIP_REWARD_POOL).call()
      // setCirculatingSupply(supply - poolBalance - poolBalance2)
      setCirculatingSupply(supply);
    }
  }, [contract]);

  return (
    <Card
      bg="dark"
      text="light"
      className="text-center h-100 p-3 border-gradient"
    >
      <Card.Body>
        <div className="h1 text-gradient pb-2" style={{ fontWeight: "bold" }}>
          {tokenName}
        </div>
        <Card.Img
          src={logo}
          className="d-block mx-auto img-fluid w-25 mt-4 mb-4"
        />
        <div className="pb-2">
          <div className="h5">Current Price</div>
          <div className="h3 text-gradient" style={{ fontWeight: "bold" }}>
            <CountUp
              end={(price / rosePrice).toFixed(4)}
              decimals={4}
              duration={1}
            />{" "}
            ROSE
          </div>
          <div className="h6">${price.toFixed(4)}</div>
        </div>
        <div className="small mt-4 pb-2">
          <TokenDataSmallText>
            <span className="text-gradient">MARKETCAP:</span> $
            {((price * circulatingSupply) / 10 ** 18).toFixed()}
          </TokenDataSmallText>
          <TokenDataSmallText>
            <span className="text-gradient">CIRCULATING SUPPLY:</span>{" "}
            {(circulatingSupply / 10 ** 18).toFixed()}
          </TokenDataSmallText>
          <TokenDataSmallText>
            <span className="text-gradient">TOTAL SUPPLY:</span>{" "}
            {(totalSupply / 10 ** 18).toFixed()}
          </TokenDataSmallText>
        </div>
      </Card.Body>
    </Card>
  );
}
