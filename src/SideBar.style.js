import styled from "styled-components";

export const SidebarItem = styled.div`
  background: ${(props) =>
    props.active
      ? "linear-gradient(135deg, #5354C8 0%, #5D5FEF 100%)"
      : "linear-gradient(180deg, #505358 0%, rgba(25, 27, 31, 0.64) 100%)"};
  border-radius: 8px;
  height: 40px;
  width: 100%;
  display: flex;
  font-weight: 600;
  align-items: center;
  padding: 0 10px;
  span {
    color: ${(props) => (props.active ? "#fff" : "#7F8A94")};
  }
`;
export const StakeBtn = styled.div`
  height: 44px;
  border: 2px solid #5d5fef;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px 2px #5d5fef;
  border-radius: 7px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  transition: all 0.3s ease-in-out;
  :hover {
    background: #5d5fef;
    box-shadow: none;
  }
`;
export const BuyBtn = styled.div`
  height: 44px;
  background: linear-gradient(135deg, #4dcab9 0%, #4a3d74 81.77%);
  box-shadow: inset 0px -4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 9px;
  color: #fff;
  transition: all 0.3s ease-in-out;
  display: flex;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  :hover {
    background: linear-gradient(135deg, #4a3d74 0%, #4dcab9 81.77%);
  }
`;
export const TotalValueTitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #ffffff;
`;
export const TotalValueBody = styled.div`
  border: 3px solid rgba(47, 50, 65, 0.5);
  border-radius: 20px;
  height: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
export const MillionText = styled.div`
  font-weight: 700;
  font-size: 26px;
  display: flex;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #b3b1ff 0%, #b4f6ed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
export const TokenDataSmallText = styled.div`
  font-size: 17px;
  line-height: 20px;
`;
export const ZAPCardTitle = styled.div`
  font-weight: 500;
  font-size: 22px;
  line-height: 36px;
  /* or 120% */
  border-bottom: 2px solid #77859a;
  display: flex;
  align-items: center;
  text-align: center;
  text-decoration: underline;

  background: linear-gradient(135deg, #b3b1ff 0%, #b4f6ed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
export const ZAPButton = styled.div`
  width: 80px;
  height: 50px;
  background: linear-gradient(135deg, #b3b1ff 0%, #b4f6ed 100%);
  border-radius: 7px;
  font-weight: 700;
  font-size: 18px;
  margin: auto;
  line-height: 24px;
  text-align: center;
  font-feature-settings: "pnum" on, "lnum" on;
  color: #333333;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TulipText = styled.div`
  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;
export const GardenCardPart = styled.div`
  width: 80%;
  margin: auto;
`;
export const ApproveBtn = styled.div`
  height: 57px;
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #b3b1ff 0%, #b4f6ed 100%);
  box-shadow: 0px 0px 4px 1px rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  font-weight: 900;
  cursor: pointer;
  font-size: 16px;
  line-height: 32px;
  text-align: center;
  color: #333333;
`;
export const LineDiv = styled.div`
  height: 3px;
  width: 100%;
  background: linear-gradient(135deg, #b3b1ff 0%, #b4f6ed 100%);
  margin-top: 20px;
`;
export const BondTitle = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  display: flex;
  align-items: center;
  text-align: center;
  background: linear-gradient(135deg, #b3b1ff 0%, #b4f6ed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin: 20px 0 40px 0;
  justify-content: center;
`;
export const FoundContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const LogoImg = styled.img``;
export const Title = styled.div`
  font-size: 20px;
`;
export const BouquetCardContainer = styled.div`
  height: calc(100vh - 165px);
  overflow-y: scroll;
  padding: 0 20px;
`;
export const TokenCard = styled.div`
  width: 100%;
  border: 2px solid #b4f6ed;
  border-radius: 20px;
  margin-bottom: 30px;
  padding: 30px 50px;
  @media screen and (max-width: 560px) {
    padding: 30px 20px;
  }
`;
export const LeftPart = styled.div`
  width: 50%;
  @media screen and (max-width: 1320px) {
    width: 100%;
  }
`;
export const RightPart = styled.div`
  width: 50%;
  @media screen and (max-width: 1320px) {
    width: 100%;
  }
`;
export const CardTitle = styled.div`
  font-weight: 700;
  font-size: 25px;
  margin-left: 15px;
  line-height: 36px;
  /* or 164% */

  display: flex;
  align-items: center;

  /* grad-active */

  background: linear-gradient(135deg, #b3b1ff 0%, #b4f6ed 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;
export const LTitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  @media screen and (max-width: 1520px) {
    margin: 50px 0 55px 0;
  }
  @media screen and (max-width: 1320px) {
    margin-bottom: 40px;
    margin-top: 0;
  }
`;
export const Cardtop = styled.div`
  display: flex;
  column-gap: 30px;
  @media screen and (max-width: 1320px) {
    flex-direction: column;
    row-gap: 50px;
  }
`;
export const ManualBtn = styled.div`
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  text-align: center;
  margin: 30px auto 0 auto;
  cursor: pointer;
  font-feature-settings: "pnum" on, "lnum" on;
  color: rgba(255, 255, 255, 0.77);
  border: 2px solid #5d5fef;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px 2px #5d5fef;
  border-radius: 7px;
  padding: 8px;
  width: 190px;
  transition: all 0.3s ease-in-out;
  :hover {
    background-color: #5d5fef;
  }
`;
export const InputTitle = styled.div`
  font-weight: 400;
  font-size: 15px;
  line-height: 27px;
  margin-bottom: 5px;
  margin-left: 40px;
  display: flex;
  align-items: center;
  text-align: right;
  width: 80%;
  color: #ffffff;
  span {
    font-weight: 400;
    font-size: 16px;
    line-height: 27px;
    display: flex;
    align-items: center;
    margin: 0 5px 0 15px;
    background: linear-gradient(135deg, #b3b1ff 0%, #b4f6ed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    @media screen and (max-width: 430px) {
      margin: 0 3px 0 5px;
    }
  }
  @media screen and (max-width: 550px) {
    width: 100%;
    margin-left: 0;
    justify-content: center;
  }
`;
export const CusInput = styled.input`
  width: 80%;
  height: 59px;
  border: 1px solid #34384c;
  box-sizing: border-box;
  border-radius: 100px;
  outline: none;
  padding: 20px;
  font-size: 20px;
  color: #fff;
  background: rgba(47, 50, 65, 0.5);
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;
export const CusApproveBtn = styled.div`
  font-weight: 700;
  font-size: 16px;
  margin: 20px 0;
  transition: all 0.3s ease-in-out;
  line-height: 24px;
  width: fit-content;
  text-align: center;
  font-feature-settings: "pnum" on, "lnum" on;
  color: rgba(255, 255, 255, 0.77);
  border: 2px solid #65a6a0;
  box-sizing: border-box;
  border-radius: 7px;
  padding: 8px 12px;
  cursor: pointer;
  :hover {
    background-color: #65a6a0;
  }
`;
export const SmallText = styled.div`
  font-weight: 400;
  font-size: 12px;
  line-height: 30px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.04em;
  width: 70%;
  color: rgba(255, 255, 255, 0.4);
`;
export const CenterPart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
export const RItem = styled.div`
  color: #fff;
  text-align: center;
  line-height: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-weight: 700;
    font-size: 15px;
    display: flex;
    align-items: center;
    text-align: center;
    background: linear-gradient(135deg, #b3b1ff 0%, #b4f6ed 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;
export const RTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  margin-top: 20px;
  @media screen and (max-width: 1520px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    row-gap: 20px;
  }
  @media screen and (max-width: 450px) {
    grid-template-columns: 1fr;
    row-gap: 30px;
  }
`;
export const WithdrawBtn = styled.div`
  cursor: pointer;
  border: 2px solid #5d5fef;
  box-sizing: border-box;
  box-shadow: 0px 0px 5px 2px #5d5fef;
  border-radius: 7px;
  padding: 8px 12px;
  color: #fff;
  transition: all 0.3s ease-in-out;
  font-weight: bold;
  :hover {
    background-color: #5d5fef;
  }
  @media screen and (max-width: 430px) {
    width: 100%;
  }
`;
export const WithdrawGrp = styled.div`
  display: flex;
  column-gap: 20px;
  margin: 20px 0;
  text-align: center;
  @media screen and (max-width: 430px) {
    flex-direction: column;
    row-gap: 20px;
  }
`;
export const QuestionImg = styled.img`
  margin-left: 10px;
  @media screen and (max-width: 430px) {
    display: none;
  }
`;
export const SliderPart = styled.div`
  width: 80%;
  margin-top: 20px;
  @media screen and (max-width: 550px) {
    width: 100%;
  }
`;
