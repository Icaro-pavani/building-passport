import { Button, TextField } from "@mui/material";
import { useContext, useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { BuildingContext } from "../contexts/BuildingContext";
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

export default function BuildingLoginPage() {
  const [apiKey, setApiKey] = useState({
    key: "",
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setBuilding } = useContext(BuildingContext);

  const navigate = useNavigate();

  function triggerModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function updateState(event) {
    const { name, value } = event.target;
    setApiKey((prevState) => ({ ...prevState, [name]: value }));
  }

  function login(event) {
    event.preventDefault();
    api
      .loginBuilding(apiKey)
      .then(({ data }) => {
        setBuilding({ token: data.buildingToken });
        navigate("/building/residents");
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        triggerModal();
      });
  }

  return (
    <BuildingLogingContainer>
      <img src={Logo} alt="logo" />
      <StyledForm onSubmit={login}>
        <TextField
          name="key"
          className="input"
          sx={{ marginTop: "10px" }}
          label="Chave da API"
          type="text"
          variant="outlined"
          onChange={updateState}
          value={apiKey.key}
          required
        />
        <Button
          variant="contained"
          className="button"
          sx={{ marginTop: "30px", backgroundColor: "var(--button-color)" }}
          type="submit"
        >
          Entrar
        </Button>
      </StyledForm>
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
    </BuildingLogingContainer>
  );
}

const BuildingLogingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 200px;

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
