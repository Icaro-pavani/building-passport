import styled from "styled-components";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ResidentContext } from "../contexts/ResidentContext";
import LogoImage from "../assets/Logo.png";

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
        <img src={LogoImage} alt="logo" />
      </Logo>
      <ExitToAppIcon className="exit" onClick={logout} />
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
    color: var(--primary-color);
    cursor: pointer;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    height: 120px;
  }
`;
