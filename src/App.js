import React from "react";
import { Container } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import TulipLogo from "./assets/img/tulip-logo.svg";

import "./app.scss";
import { UseWeb3Provider } from "utils/web3Utils";
import { UseWalletProvider } from "use-wallet";
import { SideBar } from "./SideBar";
import { TulipSwap } from "./pages/TulipSwap";
import { Home } from "./pages/Home";
import { Farm } from "./pages/Farm";
import { Farms } from "./pages/Farms";
import { Garden } from "./pages/Garden";
import { Bouquet } from "./pages/Bouquet";
import { Bonds } from "./pages/Bonds";
import { Sprout } from "./pages/Sprout";
import { Docs } from "./pages/Docs";
import { Upgrader } from "./pages/Upgrader";
// import { Notfound } from "./pages/Notfound";
// import LandingPage from 'pages/landingpage/LandingPage'

export default function App() {
  return (
    <Container fluid className="p-0 tulipswap-container">
      <UseWalletProvider
        chainId={42262}
        connectors={{
          walletconnect: { rpcUrl: "https://emerald.oasis.dev" },
          walletlink: {
            url: "https://emerald.oasis.dev",
            appName: "Tulip.Money",
            appLogoUrl: TulipLogo,
          },
        }}
        autoConnect={true}
      >
        <UseWeb3Provider>
          <div>
            <div className="bg-dark sidebar">
              <SideBar />
            </div>
            <div className="main-content">
              <Routes>
                <Route index element={<Home />} />
                <Route path="/swap" element={<TulipSwap />} />
                <Route path="/farms" element={<Farms />} />
                <Route path="/farms/farm/:poolId" element={<Farm />} />
                <Route path="/garden" element={<Garden />} />
                <Route path="/bouquet" element={<Bouquet />} />
                <Route path="/bonds" element={<Bonds />} />
                <Route path="/sprout" element={<Sprout />} />
                <Route path="/docs" element={<Docs />} />
                <Route path="/upgrader" element={<Upgrader />} />
                {/* <Route path="/notfound" element={<Notfound />} /> */}
              </Routes>
            </div>
          </div>
        </UseWeb3Provider>
      </UseWalletProvider>
    </Container>
  );
}
