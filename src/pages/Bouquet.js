import React, { useState } from "react";
import FamilyBouquet from "components/Family";
import { Row, Col, Stack, FormControl } from "react-bootstrap";
import {
  BouquetCardContainer,
  CardTitle,
  LeftPart,
  LogoImg,
  SliderPart,
  RightPart,
  LTitle,
  TokenCard,
  SmallText,
  ManualBtn,
  RTitle,
  CusInput,
  CusApproveBtn,
  WithdrawBtn,
  QuestionImg,
  RItem,
  CenterPart,
  InputTitle,
  Cardtop,
  WithdrawGrp,
} from "SideBar.style";
import Doubletulip from "assets/img/doubletulip.png";
import Question from "assets/img/question.png";

export function Bouquet() {
  const [balanceSliderValue, setBalanceSliderValue] = useState(50);
  const [balanceSliderValue1, setBalanceSliderValue1] = useState(50);
  const [balanceSliderValue2, setBalanceSliderValue2] = useState(50);
  const [balanceSliderValue3, setBalanceSliderValue3] = useState(50);
  const [withdrawSliderValue, setWithdrawSliderValue] = useState(0);
  const [balanceValue, setBalanceValue] = useState(0);

  const balanceSlider = `linear-gradient(to right, #7571FF 0%, #7571FF ${balanceSliderValue}%, #34384C ${balanceSliderValue}%, #34384C 100%)`;
  const balanceSlider1 = `linear-gradient(to right, #7571FF 0%, #7571FF ${balanceSliderValue1}%, #34384C ${balanceSliderValue1}%, #34384C 100%)`;
  const balanceSlider2 = `linear-gradient(to right, #7571FF 0%, #7571FF ${balanceSliderValue2}%, #34384C ${balanceSliderValue2}%, #34384C 100%)`;
  const balanceSlider3 = `linear-gradient(to right, #7571FF 0%, #7571FF ${balanceSliderValue3}%, #34384C ${balanceSliderValue3}%, #34384C 100%)`;

  const handleBalanceSlider = async (sliderValue, num) => {
    if (num == 0) setBalanceSliderValue(sliderValue);
    else if (num == 1) setBalanceSliderValue1(sliderValue);
    else if (num == 2) setBalanceSliderValue2(sliderValue);
    else if (num == 3) setBalanceSliderValue3(sliderValue);
    // setBalanceValue(walletAmountToken * (sliderValue / 100));
  };
  return (
    <Stack gap={3}>
      <Row>
        <Col className="h2 text-gradient fw-bold text-end">Bouquet</Col>
      </Row>
      <Row>
        <Col xl={11}>
          <BouquetCardContainer>
            <TokenCard className="border-gradient">
              <Cardtop>
                <LeftPart>
                  <LTitle>
                    <LogoImg src={Doubletulip} alt="" />
                    <CardTitle>TOKEN-TOKEN LP</CardTitle>
                  </LTitle>
                  <CenterPart>
                    <InputTitle>
                      Balance: <span>0.00000</span> TOKEN/TOKEN
                    </InputTitle>
                    <CusInput type="number" placeholder="5000" />
                    <SliderPart>
                      <FormControl
                        style={{
                          height: 6,
                          padding: 0,
                          marginTop: 10,
                          marginBottom: 10,
                          width: "100%",
                          background: balanceSlider,
                        }}
                        onChange={(e) => handleBalanceSlider(e.target.value, 0)}
                        type="range"
                        min="0"
                        max="100"
                      />
                      <div className="d-flex justify-content-between text-gray small fw-light">
                        <span>&nbsp;0&nbsp;</span>
                        <span>&nbsp;25</span>
                        <span>&nbsp;50</span>
                        <span>&nbsp;75</span>
                        <span>100</span>
                      </div>
                    </SliderPart>
                    <CusApproveBtn>APPROVE</CusApproveBtn>
                    <SmallText>
                      You will receive TULIPbouquet token as a receipt for your
                      deposited TULIP assets. The token is needed to withdraw
                      your TULIP. Do not trade or transfer your TULIPbouquet to
                      strangers!
                    </SmallText>
                  </CenterPart>
                </LeftPart>
                <RightPart>
                  <RTitle>
                    <RItem>
                      <span>0.00 LP = $0.00</span>
                      <br />
                      Deposited Balance
                    </RItem>
                    <RItem>
                      <span>000000000</span>
                      <br />
                      APY
                    </RItem>
                    <RItem>
                      <span>000000000</span>
                      <br />
                      DAILY
                    </RItem>
                    <RItem>
                      <span>000000000</span>
                      <br />
                      BOUQUET TVL
                    </RItem>
                  </RTitle>
                  <CenterPart>
                    <InputTitle>
                      Deposited: <span>0.00000</span> TULIPbouquet{" "}
                      <QuestionImg src={Question} alt="" />
                    </InputTitle>
                    <CusInput type="number" placeholder="5000" />
                    <SliderPart>
                      <FormControl
                        style={{
                          height: 6,
                          padding: 0,
                          marginTop: 10,
                          marginBottom: 10,
                          width: "100%",
                          background: balanceSlider1,
                        }}
                        onChange={(e) => handleBalanceSlider(e.target.value, 1)}
                        type="range"
                        min="0"
                        max="100"
                      />
                      <div className="d-flex justify-content-between text-gray small fw-light">
                        <span>&nbsp;0&nbsp;</span>
                        <span>&nbsp;25</span>
                        <span>&nbsp;50</span>
                        <span>&nbsp;75</span>
                        <span>100</span>
                      </div>
                    </SliderPart>
                    <WithdrawGrp>
                      <WithdrawBtn>WITHDRAW</WithdrawBtn>
                      <WithdrawBtn>WITHDRAW ALL</WithdrawBtn>
                    </WithdrawGrp>
                    <SmallText>
                      You will receive TULIPbouquet token as a receipt for your
                      deposited TULIP assets. The token is needed to withdraw
                      your TULIP. Do not trade or transfer your TULIPbouquet to
                      strangers!
                    </SmallText>
                  </CenterPart>
                </RightPart>
              </Cardtop>
              <ManualBtn>MANUAL COMPOUND</ManualBtn>
            </TokenCard>
            <TokenCard className="border-gradient">
              <Cardtop>
                <LeftPart>
                  <LTitle>
                    <LogoImg src={Doubletulip} alt="" />
                    <CardTitle>TOKEN-TOKEN LP</CardTitle>
                  </LTitle>
                  <CenterPart>
                    <InputTitle>
                      Balance: <span>0.00000</span> TOKEN/TOKEN
                    </InputTitle>
                    <CusInput type="number" placeholder="5000" />
                    <SliderPart>
                      <FormControl
                        style={{
                          height: 6,
                          padding: 0,
                          marginTop: 10,
                          marginBottom: 10,
                          width: "100%",
                          background: balanceSlider2,
                        }}
                        onChange={(e) => handleBalanceSlider(e.target.value, 2)}
                        type="range"
                        min="0"
                        max="100"
                      />
                      <div className="d-flex justify-content-between text-gray small fw-light">
                        <span>&nbsp;0&nbsp;</span>
                        <span>&nbsp;25</span>
                        <span>&nbsp;50</span>
                        <span>&nbsp;75</span>
                        <span>100</span>
                      </div>
                    </SliderPart>
                    <CusApproveBtn>APPROVE</CusApproveBtn>
                    <SmallText>
                      You will receive TULIPbouquet token as a receipt for your
                      deposited TULIP assets. The token is needed to withdraw
                      your TULIP. Do not trade or transfer your TULIPbouquet to
                      strangers!
                    </SmallText>
                  </CenterPart>
                </LeftPart>
                <RightPart>
                  <RTitle>
                    <RItem>
                      <span>0.00 LP = $0.00</span>
                      <br />
                      Deposited Balance
                    </RItem>
                    <RItem>
                      <span>000000000</span>
                      <br />
                      APY
                    </RItem>
                    <RItem>
                      <span>000000000</span>
                      <br />
                      DAILY
                    </RItem>
                    <RItem>
                      <span>000000000</span>
                      <br />
                      BOUQUET TVL
                    </RItem>
                  </RTitle>
                  <CenterPart>
                    <InputTitle>
                      Deposited: <span>0.00000</span> TULIPbouquet{" "}
                    </InputTitle>
                    <CusInput type="number" placeholder="5000" />
                    <SliderPart>
                      <FormControl
                        style={{
                          height: 6,
                          padding: 0,
                          marginTop: 10,
                          marginBottom: 10,
                          border: "none",
                          outline: "none",
                          width: "100%",
                          background: balanceSlider3,
                        }}
                        onChange={(e) => handleBalanceSlider(e.target.value, 3)}
                        type="range"
                        min="0"
                        max="100"
                      />
                      <div className="d-flex justify-content-between text-gray small fw-light">
                        <span>&nbsp;0&nbsp;</span>
                        <span>&nbsp;25</span>
                        <span>&nbsp;50</span>
                        <span>&nbsp;75</span>
                        <span>100</span>
                      </div>
                    </SliderPart>
                    <WithdrawGrp>
                      <WithdrawBtn>WITHDRAW</WithdrawBtn>
                      <WithdrawBtn>WITHDRAW ALL</WithdrawBtn>
                    </WithdrawGrp>
                    <SmallText>
                      You will receive TULIPbouquet token as a receipt for your
                      deposited TULIP assets. The token is needed to withdraw
                      your TULIP. Do not trade or transfer your TULIPbouquet to
                      strangers!
                    </SmallText>
                  </CenterPart>
                </RightPart>
              </Cardtop>
              <ManualBtn>MANUAL COMPOUND</ManualBtn>
            </TokenCard>
          </BouquetCardContainer>
        </Col>
      </Row>
    </Stack>
  );
}
