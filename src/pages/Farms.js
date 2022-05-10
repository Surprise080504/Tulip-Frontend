import React from "react";
import { Col, Row, Stack, Tabs, Tab } from "react-bootstrap";

import LiquidationPools from "config/config.js";
import PetalPools from "config/petalPools.js";
import FarmLPCard from "components/FarmLPCard";

import OapeLogo from "assets/img/currency_logos/oape.png";
import PetalRoseLogo from "assets/img/petal-rose.png";
import TulipRoseLogo from "assets/img/tulip-rose.png";
import BudLogo from "assets/img/bud.png";
import TulipLogo from "assets/img/tulip.png";
import PetalLogo from "assets/img/petal.png";
import TulipPetalLogo from "assets/img/tulip-petal-lp.png";
import ArrowRight from "assets/img/ArrowRight.png";

export function Farms() {
  return (
    <Stack gap={3}>
      <Row>
        <Col className="h2 text-gradient fw-bold text-end">LP Farms</Col>
      </Row>
      <>
        <Row>
          <Col className="h1 text-gradient text-start stakeTitle">
            Stake & Earn PETAL or TSWAP
          </Col>
        </Row>
        <Row lg={4} className="fade-in-bottom">
          <>
            {[
              { pool: LiquidationPools.OldBudGenesisPool, inactive: false },
              {
                pool: LiquidationPools.OldTulipGenesisPool,
                inactive: false,
              },
              {
                pool: LiquidationPools.OldPetalGenesisPool,
                inactive: false,
              },
              { pool: LiquidationPools.WroseGenesisPool, inactive: false },
              { pool: LiquidationPools.TswapGenesisPool, inactive: false },
              { pool: LiquidationPools.WroseGenesisPool, inactive: false },
              { pool: LiquidationPools.UsdtGenesisPool, inactive: false },
              { pool: LiquidationPools.TswapGenesisPool, inactive: false },
              { pool: LiquidationPools.WroseGenesisPool, inactive: false },
              {
                pool: LiquidationPools.OldPetalToPetalGenesisPool,
                inactive: false,
              },
              {
                pool: LiquidationPools.OldTulipGenesisPool,
                inactive: false,
              },
            ].map((farm) => {
              return (
                <Col
                  key={farm.pool.pool}
                  xs={{ span: 12 }}
                  sm={{ span: 6 }}
                  md={{ span: 6 }}
                  lg={{ span: 6 }}
                  xl={{ span: 4 }}
                  className="pt-3"
                >
                  <FarmLPCard
                    pool={farm.pool}
                    img={farm.pool.logo}
                    inactive={farm.inactive}
                  />
                </Col>
              );
            })}
          </>
        </Row>
        <div
          className="go-interactive-farms text-gradient inactiveText"
          // onClick={() => {
          //   setShowInteractiveFarm(true);
          // }}
        >
          See interactve farms
          <img src={ArrowRight} style={{ marginLeft: "10px" }} />
        </div>
      </>
    </Stack>
  );
}
