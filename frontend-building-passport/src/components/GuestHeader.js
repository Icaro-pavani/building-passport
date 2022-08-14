import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import LogoImage from "../assets/Logo.png";

export default function GuestHeader() {
  const navigate = useNavigate();

  return (
    <GuestHeaderContainer>
      <Logo onClick={() => navigate("/main")}>
        <img src={LogoImage} alt="logo" />
      </Logo>
    </GuestHeaderContainer>
  );
}

const GuestHeaderContainer = styled.div`
  width: 100%;
  height: 87px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 8px;
  background-color: #fff;
  z-index: 3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

const Logo = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    height: 120px;
  }
`;
