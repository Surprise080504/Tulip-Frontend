import React, { useEffect, useState } from "react";
// import { useQuery } from 'react-query'
import { Button, Card, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useWallet } from "use-wallet";
// import { getPetalPrice, getRosePrice, getTulipPrice, getOapePrice, getUSDCPrice, getUSDTPrice } from 'utils/priceFeed'
import { useWeb3 } from "utils/web3Utils";
// import { GARDEN_ADDRESS, BUD_ADDRESS, TULIP_ADDRESS, PETAL_ADDRESS, WROSE_ADDRESS, FACTORY_ADDRESS } from 'config/constants'
import TokenData from "components/TokenData";
import {
  StakeBtn,
  BuyBtn,
  TotalValueTitle,
  TotalValueBody,
  MillionText,
  ZAPCardTitle,
  TulipText,
} from "SideBar.style";
import Zap from "components/Zap";
import Pools from "config/config";

import ERC20ABI from "abis/ERC20.json";
// import GARDEN_ABI from 'abis/Garden.json'
// import UNISWAP_FACTORY from 'abis/UniswapV2Factory'
// import UNISWAP_PAIR from 'abis/UniswapV2Pair'

import TulipLogo from "assets/img/currency_logos/tulip.png";
import PetalLogo from "assets/img/currency_logos/petal.png";
import BudLogo from "assets/img/currency_logos/bud.png";
import TSwapImg from "assets/img/buynowMark.png";
import AttentionIcon from "assets/img/attention-icon.png";
import TokenImage0 from "assets/img/token-new.svg";
import TokenImage1 from "assets/img/token-new-1.svg";
import TokenImage2 from "assets/img/token-new-2.svg";
import TokenImage3 from "assets/img/token-new-3.svg";
import TokenImage4 from "assets/img/token-new-4.svg";
import TokenImage5 from "assets/img/token-new-5.svg";
import TokenImage6 from "assets/img/token-new-6.svg";
import TokenImage7 from "assets/img/token-new-7.svg";

export function Home() {
  const { account, connect } = useWallet();
  const web3 = useWeb3();
  const [tvl, setTVL] = useState(null);
  // const [feeds, setFeeds] = useState([])

  // const cacheStalenessExpiry = 60000
  // const rosePrice = useQuery('rosePrice', getRosePrice, { staleTime: cacheStalenessExpiry }).data
  // const petalPrice = useQuery('petalPrice', getPetalPrice, { staleTime: cacheStalenessExpiry }).data
  // const tulipPrice = useQuery('tulipPrice', getTulipPrice, { staleTime: cacheStalenessExpiry }).data
  // const oapePrice = useQuery('oapePrice', getOapePrice, { staleTime: cacheStalenessExpiry }).data
  // const usdcPrice = useQuery('USDCPrice', getUSDCPrice, { staleTime: cacheStalenessExpiry }).data
  // const usdtPrice = useQuery('USDTPrice', getUSDTPrice, { staleTime: cacheStalenessExpiry }).data

  // const getPriceStatus = (oldPrice, newPrice) => {
  //   if (oldPrice) {
  //     if (oldPrice === newPrice) {
  //       return ''
  //     }
  //     if (oldPrice < newPrice) {
  //       return 'up'
  //     }
  //     if (oldPrice > newPrice) {
  //       return 'down'
  //     }
  //   }
  //   return ''
  // }
  const getTotalSupply = async (pool) => {
    const { depositTokenAddress, address, defaultTokenPrice } = pool;
    // const c = new web3.eth.Contract(abi, rewardPoolAddress)
    const contract = new web3.eth.Contract(ERC20ABI, depositTokenAddress);
    const locked = await contract.methods.balanceOf(address).call();
    return locked * defaultTokenPrice;
  };

  useEffect(() => {
    async function getTvl() {
      if (web3 === null) {
        return;
      }
      let total = 0;
      for (const pool in Pools) {
        const val = await getTotalSupply(Pools[pool]);
        total += val;
      }
      setTVL(total);
    }
    getTvl();
  }, [web3]);
  const feeds = [
    {
      logo: TokenImage0,
      name: "TULIP",
      status: "up",
      price: "$69.20",
    },
    {
      logo: TokenImage1,
      name: "PETAL",
      status: "down",
      price: "$69.20",
    },
    {
      logo: TokenImage2,
      name: "BUD",
      status: "down",
      price: "$69.20",
    },
    {
      logo: TokenImage4,
      name: "ROSE",
      status: "up",
      price: "$69.20",
    },
    {
      logo: TokenImage5,
      name: "OAPE",
      status: "up",
      price: "$69.20",
    },
    {
      logo: TokenImage6,
      name: "USDT",
      status: "down",
      price: "$69.20",
    },
    {
      logo: TokenImage7,
      name: "USDC",
      status: "up",
      price: "$69.20",
    },
  ];
  // useEffect(async () => {
  //   t oldRosePrice = parseFloat(localStorage.getItem('rosePrice'))
  //   if (!oldRosePrice) {
  //     localStorage.setItem('rosePrice', rosePrice)
  //   }
  //   const oldPetalPrice = parseFloat(localStorage.getItem('petalPrice'))
  //   if (!oldPetalPrice) {
  //     localStorage.setItem('petalPrice', petalPrice)
  //   }
  //   const oldTulipPrice = parseFloat(localStorage.getItem('tulipPrice'))
  //   if (!oldTulipPrice) {
  //     localStorage.setItem('tulipPrice', tulipPrice)
  //   }
  //   const oldOapePrice = parseFloat(localStorage.getItem('oapePrice'))
  //   if (!oldOapePrice) {
  //     localStorage.setItem('oapePrice', oapePrice)
  //   }
  //   const oldUsdcPrice = parseFloat(localStorage.getItem('usdcPrice'))
  //   if (!oldUsdcPrice) {
  //     localStorage.setItem('usdcPrice', usdcPrice)
  //   }
  //   const oldUsdtPrice = parseFloat(localStorage.getItem('usdtPrice'))
  //   if (!oldUsdtPrice) {
  //     localStorage.setItem('usdtPrice', usdtPrice)
  //   }

  //   const feeds = [
  //     {
  //       logo: TokenImage0,
  //       name: 'TULIP',
  //       status: getPriceStatus(oldTulipPrice, tulipPrice),
  //       price: tulipPrice ? tulipPrice.toFixed(2) : 0
  //     },
  //     {
  //       logo: TokenImage1,
  //       name: 'PETAL',
  //       status: getPriceStatus(oldPetalPrice, petalPrice),
  //       price: petalPrice ? petalPrice.toFixed(2) : 0
  //     },
  //     {
  //       logo: TokenImage2,
  //       name: 'BUD',
  //       status: getPriceStatus(oldTulipPrice, tulipPrice),
  //       price: tulipPrice ? tulipPrice.toFixed(2) : 0
  //     },
  //     {
  //       logo: TokenImage4,
  //       name: 'ROSE',
  //       status: getPriceStatus(oldRosePrice, rosePrice),
  //       price: rosePrice ? rosePrice.toFixed(2) : 0
  //     },
  //     {
  //       logo: TokenImage5,
  //       name: 'OAPE',
  //       status: getPriceStatus(oldOapePrice, oapePrice),
  //       price: oapePrice ? oapePrice.toFixed(2) : 0
  //     },
  //     {
  //       logo: TokenImage6,
  //       name: 'USDT',
  //       status: getPriceStatus(oldUsdtPrice, usdtPrice),
  //       price: usdtPrice ? usdtPrice.toFixed(2) : 0
  //     },
  //     {
  //       logo: TokenImage7,
  //       name: 'USDC',
  //       status: getPriceStatus(oldUsdcPrice, usdcPrice),
  //       price: usdcPrice ? usdcPrice.toFixed(2) : 0
  //     },
  //   ]
  //   setFeeds(feeds)
  // }, [rosePrice, petalPrice, tulipPrice, oapePrice, usdcPrice, usdtPrice])

  useEffect(async () => {
    if (web3 === null) {
      return;
    }
    const chainId = await web3.eth.getChainId();
    if (web3 !== null) {
      if (chainId !== 42262 && chainId !== 42261) {
        await web3.currentProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xa516" }],
        });
      }
    }
  }, [web3]);

  // const getValue = async (factoryAddress, leftToken, rightToken, leftPrice, rightPrice) => {
  //   const yuzuFactory = new web3.eth.Contract(UNISWAP_FACTORY.abi, factoryAddress)
  //   const pairAddress = await yuzuFactory.methods.getPair(leftToken, rightToken).call()
  //   const pairContract = new web3.eth.Contract(UNISWAP_PAIR.abi, pairAddress)
  //   const reserves = await pairContract.methods.getReserves().call()
  //   return reserves._reserve0 / 10 ** 18 * leftPrice + reserves._reserve1 / 10 ** 18 * rightPrice
  // }

  // useEffect(async () => {
  //   if (web3 !== null && tulipPrice && petalPrice) {
  //     const YUZU_FACTORY = '0x5F50fDC22697591c1D7BfBE8021163Fc73513653'
  //     const bud = new web3.eth.Contract(ERC20ABI, BUD_ADDRESS)
  //     const [roseLP, petalLP, tulipPetalLP, yuzu1, yuzu2, yuzu3, totalBud] = await Promise.all([
  //       getValue(FACTORY_ADDRESS, TULIP_ADDRESS, WROSE_ADDRESS, rosePrice, tulipPrice),
  //       getValue(FACTORY_ADDRESS, PETAL_ADDRESS, WROSE_ADDRESS, rosePrice, petalPrice),
  //       getValue(FACTORY_ADDRESS, TULIP_ADDRESS, PETAL_ADDRESS, petalPrice, tulipPrice),
  //       getValue(YUZU_FACTORY, PETAL_ADDRESS, TULIP_ADDRESS, petalPrice, tulipPrice),
  //       getValue(YUZU_FACTORY, WROSE_ADDRESS, TULIP_ADDRESS, rosePrice, tulipPrice),
  //       getValue(YUZU_FACTORY, WROSE_ADDRESS, PETAL_ADDRESS, rosePrice, petalPrice),
  //       await bud.methods.totalSupply().call() / 10 ** 18 * rosePrice
  //     ])

  //     const garden = new web3.eth.Contract(GARDEN_ABI.abi, GARDEN_ADDRESS)
  //     const totalStaked = await garden.methods.totalSupply().call() / 10 ** 18 * petalPrice

  //     setTVL((totalBud + roseLP + petalLP + totalStaked + tulipPetalLP + yuzu1 + yuzu2 + yuzu3).toFixed(4))
  //   }
  // }, [web3, rosePrice, tulipPrice, petalPrice])

  return (
    <Stack gap={3}>
      <Row>
        <Col md={6} className="mb-2 align-self-end">
          {account && (
            <TulipText>
              <span className="text-gradient fw-bold h5">Tulip </span>
              <span className="text-decoration-underline text-white">
                is an algorithmic stablecoin on Emerald Oasis!
              </span>
            </TulipText>
          )}
        </Col>
        <Col md={6} className="d-flex justify-content-end token-images ">
          <img src={TokenImage0} />
          <img src={TokenImage1} />
          <img src={TokenImage2} />
          <img src={TokenImage3} />
          <img src={TokenImage4} />
          <img src={TokenImage5} />
          <img src={TokenImage6} />
          <img src={TokenImage7} />
        </Col>
      </Row>
      <Row className="fade-in-bottom">
        <Col md={3}>
          <Card bg="dark" text="light" className="text-center border-gradient">
            <TotalValueBody>
              <TotalValueTitle>TOTAL VALUE LOCKED</TotalValueTitle>
              <MillionText>${(tvl / 10 ** 24)?.toFixed(2)} Million</MillionText>
            </TotalValueBody>
          </Card>
        </Col>
        <Col className="d-flex flex-column justify-content-between gap-2 yellowText">
          <Row>
            <Col>
              <div className="text-attention text-center pt-1 pb-1">
                <a
                  href="https://docs.tulip.money"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    padding: "3px",
                  }}
                >
                  <img
                    className="inline-image-logo pe-2"
                    src={AttentionIcon}
                    alt="Attention"
                  />
                  PLEASE VISIT OUR DOCUMENTATION BEFORE PURCHASING TULIP OR
                  PETAL.
                </a>
              </div>
            </Col>
          </Row>
          <Row className="threebtn">
            <Col className="d-grid">
              <Link to="/garden">
                <StakeBtn>STAKE NOW</StakeBtn>
              </Link>
            </Col>
            <Col className="d-grid">
              <Link to="/farms">
                <StakeBtn>FARM NOW</StakeBtn>
              </Link>
            </Col>
            <Col className="d-grid">
              <a href="https://tswap.tulip.money">
                <BuyBtn>
                  BUY NOW on{" "}
                  <img src={TSwapImg} style={{ marginLeft: "5px" }} />
                </BuyBtn>
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="fade-in-bottom">
        {[
          {
            tokenName: "TULIP",
            logo: TulipLogo,
            price: 0,
            contractAddress: "0xF44DBB6C1e0C990509F27a8415E6F4a1f091Fe44",
          },
          {
            tokenName: "PETAL",
            logo: PetalLogo,
            price: 0,
            contractAddress: "",
          },
          { tokenName: "BUD", logo: BudLogo, price: 0, contractAddress: "" },
        ].map((tokenData) => {
          return (
            <Col
              lg={4}
              key={tokenData.tokenName}
              className="pb-md-3 pb-3 pb-lg-0"
            >
              <TokenData
                tokenName={tokenData.tokenName}
                logo={tokenData.logo}
                price={tokenData.price || 0}
                web3={web3}
                contract={
                  web3 && tokenData.contractAddress
                    ? new web3.eth.Contract(ERC20ABI, tokenData.contractAddress)
                    : null
                }
                rosePrice={0}
              />
            </Col>
          );
        })}
      </Row>
      <Row className="fade-in-bottom mt-2">
        <Col lg={4} className="pb-md-3 pb-3 pb-lg-0">
          <Zap
            web3={web3}
            tokenName="TULIP/wROSE LP"
            // token0={TULIP_ADDRESS}
            token0Name="TULIP"
            want="0x08B3BdE2e398B0840c76C78D42bd26B3412706B9"
            rosePrice={0}
            offset={1}
          />
        </Col>
        <Col lg={4} className="pb-md-3 pb-3 pb-lg-0">
          <Zap
            web3={web3}
            tokenName="PETAL/wROSE LP"
            // token0={PETAL_ADDRESS}
            token0Name="PETAL"
            want="0x8cA580272A36135FF27C2db928da24A4dC3c9b6E"
            rosePrice={0}
            offset={0}
          />
        </Col>
        <Col lg={4} className="pb-md-3 pb-3 pb-lg-0">
          <Card
            bg="dark"
            text="light"
            className="price-feed h-100 border-gradient"
          >
            <Card.Body>
              <ZAPCardTitle>PRICE FEED</ZAPCardTitle>
              <div className="feeds pe-2">
                {feeds.map((token) => (
                  <Row key={token.name} className="align-center mt-3">
                    <Col>
                      <img src={token.logo} className="mx-auto img-fluid" />
                    </Col>
                    <Col>${token.name}</Col>
                    <Col>
                      <i className={`arrow-${token.status}`}></i>
                    </Col>
                    <Col>${token.price}</Col>
                  </Row>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Stack>
  );
}
