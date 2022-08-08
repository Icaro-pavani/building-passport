import styled from "styled-components";
import { IoLockClosed } from "react-icons/io5";
import { IoExit } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ResidentContext } from "../contexts/ResidentContext";

export default function Header() {
  const navigate = useNavigate();
  const { setResident } = useContext(ResidentContext);

  function logout() {
    localStorage.clear();
    setResident({ token: "" });
    navigate("/");
  }

  return (
    <HeaderContainer>
      <Logo onClick={() => navigate("/main")}>
        <IoLockClosed className="lock" />
        <h1>Building Passport</h1>
      </Logo>
      <IoExit className="exit" onClick={logout} />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
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

  .exit {
    font-size: 54px;
    color: #005985;
    cursor: pointer;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  h1 {
    /* font-family: "Righteous", cursive; */
    font-size: 36px;
    line-height: 45px;
    letter-spacing: -0.012em;
    color: #005985;
  }

  .lock {
    font-size: 64px;
    color: #005985;
  }
`;
