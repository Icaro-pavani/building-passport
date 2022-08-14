import styled from "styled-components";
import { Button, MenuItem, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../services/api";
import Masks from "../utils/masks";
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

export default function SignUpPage() {
  const [signUpInfo, setSignUpInfo] = useState({
    buildingId: "",
    id: "",
    cpf: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [disabled, setDisabled] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [residents, setResidents] = useState([]);

  const navigate = useNavigate();

  function triggerModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function updateState(event) {
    const { name, value } = event.target;
    setSignUpInfo((prevState) => ({ ...prevState, [name]: value }));
  }

  function getResidents(buildingId) {
    api
      .getResidentsByBuildingId(buildingId)
      .then(({ data }) => {
        setResidents(data.residents);
        setDisabled(!disabled);
      })
      .catch((error) => {
        triggerModal();
        setErrorMessage(error.response.data);
      });
  }

  function signUpResident(event) {
    event.preventDefault();
    const residentData = { ...signUpInfo };
    delete residentData.buildingId;
    api
      .signUpResident(residentData)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        triggerModal();
        setErrorMessage(error.response.data);
      });
  }

  useEffect(() => {
    api
      .getBuildings()
      .then(({ data }) => {
        setBuildings(data.buildings);
      })
      .catch((error) => {
        setModalIsOpen((prevState) => !prevState);
        setErrorMessage(error.response.data);
      });
  }, []);

  return buildings.length !== 0 ? (
    <SignUpContainer>
      <img src={Logo} alt="logo" />
      <StyledForm onSubmit={signUpResident}>
        <TextField
          name="buildingId"
          className="input"
          sx={{ marginTop: "10px" }}
          label="Condomínio"
          select
          variant="outlined"
          onChange={(event) => {
            const { name, value } = event.target;
            setSignUpInfo((prevState) => ({ ...prevState, [name]: value }));
            getResidents(value);
          }}
          value={signUpInfo.buildingId}
          required
        >
          {buildings.map((building) => (
            <MenuItem key={building.id} value={building.id}>
              {building.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="id"
          className="input"
          sx={{ marginTop: "10px" }}
          label="Residente"
          select
          variant="outlined"
          onChange={(event) => {
            const { name, value } = event.target;
            setSignUpInfo((prevState) => ({ ...prevState, [name]: value }));
          }}
          value={signUpInfo.id}
          disabled={disabled}
          required
        >
          {residents.map((resident) => (
            <MenuItem key={resident.id} value={resident.id}>
              {resident.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="cpf"
          className="input"
          sx={{ marginTop: "10px" }}
          label="CPF"
          type="text"
          variant="outlined"
          onChange={(event) => {
            const { name, value } = event.target;
            setSignUpInfo((prevState) => ({
              ...prevState,
              [name]: Masks.cpfMask(value),
            }));
          }}
          value={signUpInfo.cpf}
          required
        />
        <TextField
          name="email"
          className="input"
          sx={{ marginTop: "10px" }}
          label="E-mail"
          type="email"
          variant="outlined"
          onChange={updateState}
          value={signUpInfo.email}
          required
        />
        <TextField
          name="password"
          className="input"
          sx={{ marginTop: "10px" }}
          label="Senha"
          type="password"
          variant="outlined"
          onChange={updateState}
          value={signUpInfo.password}
          required
        />
        <TextField
          name="confirmPassword"
          className="input"
          sx={{ marginTop: "10px" }}
          label="Confirme a Senha"
          type="password"
          variant="outlined"
          onChange={updateState}
          value={signUpInfo.confirmPassword}
          required
        />
        <Button
          variant="contained"
          className="button"
          sx={{ marginTop: "20px", backgroundColor: "var(--button-color)" }}
          type="submit"
        >
          Cadastrar
        </Button>
      </StyledForm>
      <StyledLink to="/">Já possui cadastro?</StyledLink>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={triggerModal}
        contentLabel="Error Message"
        style={modalStyles}
      >
        <h2 style={h2ModalStyle}>Login Inválido!</h2>
        <h3 style={h3ModalStyle}>{errorMessage}</h3>
        <button style={buttonModalStyle} onClick={triggerModal}>
          Ok
        </button>
      </Modal>
    </SignUpContainer>
  ) : (
    <h1>Loading</h1>
  );
}

const SignUpContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 80px;

  img {
    height: 180px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15%;
  width: 100%;

  .input {
    width: 100%;
  }

  .button {
    width: 70%;
  }
`;

const StyledLink = styled(Link)`
  margin-top: 30px;
`;
