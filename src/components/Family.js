/* eslint-disable no-unused-vars */
import React from "react";
import Flower from "./Flower";
import { Row, Col } from "react-bootstrap";
import { useQuery } from "react-query";

import { getRosePrice, getTulipPrice, getPetalPrice } from "utils/priceFeed";

import { PETAL_ADDRESS, TULIP_ADDRESS, WROSE_ADDRESS } from "config/constants";

import TulipPetalLP from "assets/img/tulip-petal-lp.png";
import TulipRoseLP from "assets/img/tulip-rose.png";
import PetalRoseLP from "assets/img/petal-rose.png";
import AttentionIcon from "assets/img/attention-icon.svg";

const PID_1_WANT = "0x219083f53b3C28e679Aa9F233920c536C01c6ed9";
const PID_2_WANT = "0x48b819c83bC0cBa256d92488b9400199Bc4E5842";
const PID_3_WANT = "0x18d21a2FeCb34b04e1c088Ef842c6dea06F76ac5";
const PID_4_WANT = "0x1786a82aB9927004134C76AE37eeEc9C7B0a90CB";

const VAULT_ADDRESS = "0x961Ac3283CFAD4eAd0eCEAFe24A401e661c18d30";
const STRATEGY_ADDRESS = "0x6E98309E266B063e862D738478CA419084E17682";

const PETAL_REWARD_POOL_ADDRESS = "0xA6dC92CE76A370854Ed2F76aD753211497B4ba0C";

const PID_3_VAULT_ = "0x0aDfab73aDcaDf636452527510Cae3C93B196657";
const PID_3_STRATEGY_ = "0x7273a252D02fA1F60d5637584410Bb8a6042c063";
const PID_2_STRATEGY_ = "0xf4338CE8E6e30b44F3A6C1B09AC853b346C4Fd52";
const PID_2_VAULT_ = "0xd0110A15Ac2E4C8F5DB2570C914F4831A16A835E";
const PID_1_STRATEGY_ = "0xb3Dd18b84921AF428DBfab7E2Bcef40F46A34736";
const PID_1_VAULT_ = "0xCC26CD3381972eea8f431029Ef9e860f8353104a";

const PID5_STRAT_ADDRESS = "0xE23b4F71F9D39efCC629Ae06AfbB245A9549b620";
const PID5_VAULT_ADDRESS = "0xC7DF9229661eebbd93326a62DEeb0eA987fe1311";

const PID6_STRAT_ADDRESS = "0x9198486B55dF522b306635F8A4a26636e34221Ae";
const PID6_VAULT_ADDRESS = "0xbC8f748Ef2d0c332F877B1EF6D22EEfbe92b23e5";

export default function Bouque() {
  const petalPrice = useQuery("petalPrice", getPetalPrice).data;
  const tulipPrice = useQuery("tulipPrice", getTulipPrice).data;
  const rosePrice = useQuery("rosePrice", getRosePrice).data;

  const flowers = [
    {
      name: "wROSE/TULIP LP",
      description: "Uses FAMILY DEX to BUY $wROSE/TULIP",
      chef: "Family Pool",
      inputToken: "wROSE/TULIP LP",
      vaultAddress: PID5_VAULT_ADDRESS,
      wantAddress: "0x08B3BdE2e398B0840c76C78D42bd26B3412706B9",
      depositToken: "wROSE/TULIP",
      strategyAddress: PID5_STRAT_ADDRESS,
      farmAddress: PETAL_REWARD_POOL_ADDRESS,
      RATIO: 1 / 2,
      token0Price: rosePrice,
      token1Price: tulipPrice,
      token0Address: WROSE_ADDRESS,
      token1Address: TULIP_ADDRESS,
      pid: 5,
      tokenLink: "https://tulip.money/swap",
      icon: TulipRoseLP,
    },
    {
      name: "wROSE/PETAL LP",
      description: "Uses FAMILY DEX to BUY $wROSE/PETAL",
      chef: "Family Pool",
      inputToken: "wROSE/PETAL LP",
      vaultAddress: PID6_VAULT_ADDRESS,
      wantAddress: "0x8cA580272A36135FF27C2db928da24A4dC3c9b6E",
      depositToken: "wROSE/PETAL",
      strategyAddress: PID6_STRAT_ADDRESS,
      farmAddress: PETAL_REWARD_POOL_ADDRESS,
      RATIO: 1 / 2,
      token0Price: rosePrice,
      token1Price: petalPrice,
      token0Address: WROSE_ADDRESS,
      token1Address: PETAL_ADDRESS,
      pid: 6,
      tokenLink: "https://tulip.money/swap",
      icon: PetalRoseLP,
    },
  ];

  const endedFlowers = [
    {
      name: "wROSE/TULIP LP",
      description: "Uses YUZU to BUY $PETAL",
      chef: "YUZU",
      inputToken: "wROSE/TULIP LP",
      vaultAddress: PID_1_VAULT_,
      wantAddress: PID_1_WANT,
      depositToken: "wROSE/TULIP",
      strategyAddress: PID_1_STRATEGY_,
      farmAddress: PETAL_REWARD_POOL_ADDRESS,
      RATIO: 0 / 4600,
      token0Price: rosePrice,
      token1Price: tulipPrice,
      token0Address: WROSE_ADDRESS,
      token1Address: TULIP_ADDRESS,
      pid: 1,
      tokenLink: `https://app.yuzu-swap.com/#/add/$WROSE_ADDRESS/${TULIP_ADDRESS}`,
      icon: TulipRoseLP,
    },
    {
      name: "wROSE/PETAL LP",
      description: "Uses YUZU to BUY $PETAL",
      chef: "YUZU",
      inputToken: "wROSE/PETAL LP",
      vaultAddress: PID_2_VAULT_,
      wantAddress: PID_2_WANT,
      depositToken: "wROSE/PETAL",
      strategyAddress: PID_2_STRATEGY_,
      farmAddress: PETAL_REWARD_POOL_ADDRESS,
      RATIO: 0 / 4600,
      token0Price: rosePrice,
      token1Price: petalPrice,
      token0Address: WROSE_ADDRESS,
      token1Address: PETAL_ADDRESS,
      pid: 2,
      tokenLink: `https://app.yuzu-swap.com/#/add/$WROSE_ADDRESS/${PETAL_ADDRESS}`,
      icon: PetalRoseLP,
    },
    {
      name: "TULIP-PETAL LP",
      description: "Uses YUZU to BUY $PETAL",
      chef: "YUZU",
      inputToken: "TULIP/PETAL LP",
      vaultAddress: PID_3_VAULT_,
      wantAddress: PID_3_WANT,
      depositToken: "TULIP/PETAL",
      strategyAddress: PID_3_STRATEGY_,
      farmAddress: PETAL_REWARD_POOL_ADDRESS,
      RATIO: 0 / 4600,
      token0Price: tulipPrice,
      token1Price: petalPrice,
      token0Address: TULIP_ADDRESS,
      token1Address: PETAL_ADDRESS,
      tokenLink: `https://app.yuzu-swap.com/#/add/$PETAL_ADDRESS/${TULIP_ADDRESS}`,
      pid: 3,
      icon: TulipPetalLP,
    },
    {
      name: "TULIP-PETAL LP",
      description: "Uses Family Pool to BUY $PETAL",
      chef: "Family Pool",
      inputToken: "TULIP/PETAL LP",
      vaultAddress: VAULT_ADDRESS,
      wantAddress: PID_4_WANT,
      depositToken: "TULIP/PETAL",
      strategyAddress: STRATEGY_ADDRESS,
      farmAddress: PETAL_REWARD_POOL_ADDRESS,
      RATIO: 0 / 4600,
      token0Price: tulipPrice,
      token1Price: petalPrice,
      token0Address: TULIP_ADDRESS,
      token1Address: PETAL_ADDRESS,
      tokenLink: "https://tulip.money/swap",
      pid: 4,
      icon: TulipPetalLP,
    },
  ];

  return (
    <div className="fade-in-bottom">
      {flowers.map((flower, i) => {
        return (
          <Row key={i} className="mt-4">
            <Col>
              <Flower {...flower} />
            </Col>
          </Row>
        );
      })}

      <Row className="justify-content-md-center pt-3 my-3">
        <Col md="8">
          <div className="text-attention text-center">
            <img
              className="inline-image-logo pe-2"
              src={AttentionIcon}
              alt="Attention"
            />
            These Pools have ended as of January 27th
          </div>
        </Col>
      </Row>

      {endedFlowers.map((flower, i) => {
        return (
          <Row key={i} className="mt-4">
            <Col>
              <Flower {...flower} />
            </Col>
          </Row>
        );
      })}
    </div>
  );
}
