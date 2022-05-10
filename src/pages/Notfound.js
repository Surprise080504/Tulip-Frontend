import React from "react";
import { FoundContainer, LogoImg, Title } from "SideBar.style";

export function NotFound() {
  return (
    <FoundContainer>
      <Title>Sorry, this page cannot be found.</Title>
      <LogoImg src="assets/img/tulip-logo.85804d9a.svg" />
    </FoundContainer>
  );
}
