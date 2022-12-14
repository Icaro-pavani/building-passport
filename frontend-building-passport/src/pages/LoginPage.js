import styled from "styled-components";
import { Button, TextField, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../services/api";
import { ResidentContext } from "../contexts/ResidentContext";
import Logo from "../assets/Logo.png";

Modal.setAppElement(document.querySelector(".root"));

const modalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "10%",
    bottom: "20%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "1px solid #DBDBDB",
    display: "flex",
    flexDirection: "column",
    alignItens: "center",
    justifyContent: "space-between",
    textAlign: "center",
    padding: "29px",
  },
  overlay: {
    backgroundColor: "rgba(0.5, 0.5,0.5, 0.6)",
    zIndex: 3,
  },
};

const h2ModalStyle = {
  fontSize: "18px",
  fontWeight: "700",
};

const h3ModalStyle = {
  fontSize: "18px",
  padding: "0 30px 0",
};

const buttonModalStyle = {
  fontSize: "18px",
  backgroundColor: "var(--button-color)",
  width: "250px",
  height: "40px",
  border: "3px solid var(--button-color)",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.15)",
  borderRadius: "5px",
  margin: "0 auto",
  fontFamily: `"Recursive", sans-serif`,
};

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({
    buildingId: "",
    email: "",
    password: "",
  });
  const [disabled, setDisabled] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [buildings, setBuildings] = useState([]);

  const { resident, setResident } = useContext(ResidentContext);

  const navigate = useNavigate();

  function triggerModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function updateState(event) {
    const { name, value } = event.target;
    setLoginInfo((prevState) => ({ ...prevState, [name]: value }));
  }

  function loginResident(event) {
    event.preventDefault();
    setDisabled(true);
    api
      .login(loginInfo)
      .then(({ data }) => {
        localStorage.setItem("resident", JSON.stringify(data));
        setResident({ ...data });
        navigate("/main");
      })
      .catch((error) => {
        triggerModal();
        setErrorMessage(error.response.data);
        setDisabled(false);
      });
  }

  useEffect(() => {
    if (!!resident.token) {
      navigate("/main");
    }
    api
      .getBuildings()
      .then(({ data }) => {
        setBuildings(data.buildings);
      })
      .catch((error) => {
        setModalIsOpen((prevState) => !prevState);
        setErrorMessage(error.response.data);
      });
  }, [resident, navigate]);

  return (
    <LoginContainer>
      <img src={Logo} alt="logo" />
      <StyledForm onSubmit={loginResident}>
        <TextField
          className="input"
          name="buildingId"
          sx={{ marginTop: "10px" }}
          label="Condom??nio"
          select
          variant="outlined"
          onChange={updateState}
          value={loginInfo.buildingId}
          required
        >
          {buildings.map((building) => (
            <MenuItem key={building.id} value={building.id}>
              {building.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="email"
          className="input"
          sx={{ marginTop: "10px" }}
          label="E-mail"
          type="email"
          variant="outlined"
          disabled={disabled}
          onChange={updateState}
          value={loginInfo.email}
          required
        />
        <TextField
          name="password"
          className="input"
          sx={{ marginTop: "10px" }}
          label="Senha"
          type="password"
          variant="outlined"
          disabled={disabled}
          onChange={updateState}
          value={loginInfo.password}
          required
        />
        <Button
          variant="contained"
          sx={{ marginTop: "20px", backgroundColor: "var(--button-color)" }}
          className="button"
          type="submit"
          disabled={disabled}
        >
          Entrar
        </Button>
      </StyledForm>
      <StyledLink to="/sign-up">N??o possui cadastro?</StyledLink>
      <StyledLink to="/building">Entrar como administrador do condom??nio</StyledLink>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={triggerModal}
        contentLabel="Error Message"
        style={modalStyles}
      >
        <h2 style={h2ModalStyle}>Login Inv??lido!</h2>
        <h3 style={h3ModalStyle}>{errorMessage}</h3>
        <button style={buttonModalStyle} onClick={triggerModal}>
          Ok
        </button>
      </Modal>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 170px;

  img {
    height: 180px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 15%;

  .input {
    width: 100%;
  }

  .button {
    width: 70%;
  }
`;

const StyledLink = styled(Link)`
  margin-top: 30px;
  color: var(--button-color);
`;
