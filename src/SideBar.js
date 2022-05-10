import React, { useEffect, useState } from "react";
import WalletConnect from "components/WalletConnect";
import { useWallet } from "use-wallet";
import { Link, useLocation } from "react-router-dom";
import { Nav, Navbar, Stack } from "react-bootstrap";

import { SidebarItem } from "./SideBar.style";

import HomeIcon from "./assets/img/home.svg";
import SwapIcon from "./assets/img/tulipswap.svg";
import FarmIcon from "./assets/img/farm.svg";
import GardenIcon from "./assets/img/garden.svg";
import BouquetIcon from "./assets/img/bouquet.svg";
import BondsIcon from "./assets/img/bonds.svg";
import SproutIcon from "./assets/img/sprout.svg";
import GovernanceIcon from "./assets/img/governance.svg";
import DocsIcon from "./assets/img/docs.svg";
import TulipLogo from "./assets/img/tulip-logo.svg";

import IgIcon from "./assets/img/ig.svg";
import GithubIcon from "./assets/img/github.svg";
import MediumIcon from "./assets/img/medium.svg";
import TwitterIcon from "./assets/img/twitter.svg";
import DiscordIcon from "./assets/img/discord.svg";
import TgIcon from "./assets/img/tg.svg";
import LinkTreeIcon from "./assets/img/linktree.svg";

export function SideBar(props) {
  const NavigationLinks = [
    { name: "Home", icon: HomeIcon, route: "/" },
    // { name: 'TulipSwap', icon: SwapIcon, route: '/swap' },
    { name: "Farms", icon: FarmIcon, route: "/farms" },
    // { name: 'Garden', icon: GardenIcon, route: '/garden' },
    // { name: 'Bouquet', icon: BouquetIcon, route: '/bouquet' },
    // { name: 'Bonds', icon: BondsIcon, route: '/bonds' },
    { name: "Sprout", icon: SproutIcon, route: "/sprout" },
    // { name: 'Governance', icon: GovernanceIcon },
    { name: "Docs", icon: DocsIcon, route: "/docs" },
    { name: "UpgradeTswap", icon: GovernanceIcon, route: "/upgrader" },
  ];
  const SocialLinks = [
    { name: "IG", icon: IgIcon, route: "https://instagram.com/tulip.money" },
    {
      name: "Github",
      icon: GithubIcon,
      route: "https://github.com/moneytulip",
    },
    {
      name: "Medium",
      icon: MediumIcon,
      route: "https://medium.com/@moneytulip",
    },
    {
      name: "Twitter",
      icon: TwitterIcon,
      route: "https://twitter.com/MoneyTulip",
    },
    {
      name: "Discord",
      icon: DiscordIcon,
      route: "https://discord.gg/moneytulip",
    },
    { name: "TG", icon: TgIcon, route: "https://t.me/moneytulip" },
    {
      name: "LinkTree",
      icon: LinkTreeIcon,
      route: "https://linktr.ee/moneytulip",
    },
  ];

  const [shortAddress, setShortAddress] = useState(null);
  const { account, status } = useWallet();
  const [selectKey, setSelectKey] = useState(0);
  const location = useLocation();
  useEffect(() => {
    if (account) {
      setShortAddress(
        `${account.substring(0, 5)}..${account.substring(account.length - 3)}`
      );
    }
  }, [account, status]);
  const ChangeActiveKey = (e) => {
    setSelectKey(e);
  };
  return (
    <div>
      <Navbar className="flex-lg-column" expand="lg">
        <Navbar.Brand href="#" className="text-center">
          <img src={TulipLogo} alt="Tulip Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="sidebar-nav" />
        <Navbar.Collapse id="sidebar-nav" className="w-100">
          <Nav className="me-auto flex-column w-100" defaultActiveKey="/">
            {location.pathname}
            <Stack gap={3} className="align-content-start me-auto w-100">
              {status !== "connected" ? (
                <Nav.Item className="mt-3">
                  <WalletConnect />
                </Nav.Item>
              ) : (
                <>
                  <Nav.Item className="mt-3">
                    <div className="account-address text-center border-gradient bg-dark">
                      <div>{shortAddress}</div>
                    </div>
                  </Nav.Item>
                </>
              )}

              {status === "connected" && (
                <>
                  <Nav.Item key="Home">
                    <Link to="/">
                      <SidebarItem
                        active={selectKey === 0 && true}
                        onClick={() => ChangeActiveKey(0)}
                      >
                        <img src={HomeIcon} alt="" className="sidebarIcon" />{" "}
                        <span>Home</span>
                      </SidebarItem>
                    </Link>
                  </Nav.Item>
                  <Nav.Item key="TulipSwap">
                    <Link to="/swap">
                      <SidebarItem
                        active={selectKey === 1 && true}
                        onClick={() => ChangeActiveKey(1)}
                      >
                        <img src={SwapIcon} alt="" className="sidebarIcon" />{" "}
                        <span>TulipSwap</span>
                      </SidebarItem>
                    </Link>
                  </Nav.Item>
                  <Nav.Item key="Farms">
                    <Link to="/farms">
                      <SidebarItem
                        active={selectKey === 2 && true}
                        onClick={() => ChangeActiveKey(2)}
                      >
                        <img src={FarmIcon} alt="" className="sidebarIcon" />{" "}
                        <span>Farms</span>
                      </SidebarItem>
                    </Link>
                  </Nav.Item>
                  <Nav.Item key="Garden">
                    <Link to="/garden">
                      <SidebarItem
                        active={selectKey === 3 && true}
                        onClick={() => ChangeActiveKey(3)}
                      >
                        <img src={GardenIcon} alt="" className="sidebarIcon" />{" "}
                        <span>Garden</span>
                      </SidebarItem>
                    </Link>
                  </Nav.Item>
                  <Nav.Item key="Bouquet">
                    <Link to="/bouquet">
                      <SidebarItem
                        active={selectKey === 4 && true}
                        onClick={() => ChangeActiveKey(4)}
                      >
                        <img src={BouquetIcon} alt="" className="sidebarIcon" />{" "}
                        <span>Bouquet</span>
                      </SidebarItem>
                    </Link>
                  </Nav.Item>
                  <Nav.Item key="Bonds">
                    <Link to="/bonds">
                      <SidebarItem
                        active={selectKey === 5 && true}
                        onClick={() => ChangeActiveKey(5)}
                      >
                        <img src={BondsIcon} alt="" className="sidebarIcon" />{" "}
                        <span>Bonds</span>
                      </SidebarItem>
                    </Link>
                  </Nav.Item>
                  <Nav.Item key="Sprout">
                    <Link to="/sprout">
                      <SidebarItem
                        active={selectKey === 6 && true}
                        onClick={() => ChangeActiveKey(6)}
                      >
                        <img src={SproutIcon} alt="" className="sidebarIcon" />{" "}
                        <span>Sprout</span>
                      </SidebarItem>
                    </Link>
                  </Nav.Item>
                  <Nav.Item key="Governance">
                    <Link to="/legacy">
                      <SidebarItem
                        active={selectKey === 7 && true}
                        onClick={() => ChangeActiveKey(7)}
                      >
                        <img
                          src={GovernanceIcon}
                          alt=""
                          className="sidebarIcon"
                        />{" "}
                        <span>Governance</span>
                      </SidebarItem>
                    </Link>
                  </Nav.Item>
                  <Nav.Item key="FAQ">
                    <Link to="/docs">
                      <SidebarItem
                        active={selectKey === 8 && true}
                        onClick={() => ChangeActiveKey(8)}
                      >
                        <img src={DocsIcon} alt="" className="sidebarIcon" />{" "}
                        <span>FAQ & Docs</span>
                      </SidebarItem>
                    </Link>
                  </Nav.Item>
                </>
              )}
            </Stack>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div className="social-links d-none d-lg-block">
        {SocialLinks.map((socialLink) => (
          <a
            href={socialLink.route}
            key={socialLink.name}
            rel="noreferrer"
            target="_blank"
          >
            <img src={socialLink.icon} />
          </a>
        ))}
      </div>
    </div>
  );
}
