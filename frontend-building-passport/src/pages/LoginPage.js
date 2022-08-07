import styled from "styled-components";
import { Button, TextField, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import api from "../services/api";
import { ResidentContext } from "../contexts/ResidentContext";

Modal.setAppElement(document.querySelector(".root"));

const textFieldStyle = {
  "& label.Mui-focused": {
    color: "green",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "green",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "red",
      backgroundColor: "#00000050",
      color: "#000",
    },
    "&:hover fieldset": {
      borderColor: "yellow",
    },
    "&.Mui-focused fieldset": {
      borderColor: "green",
    },
  },
};

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
  backgroundColor: "#9bfbb0",
  width: "250px",
  height: "40px",
  border: "3px solid #9BFBB0",
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
      <h1>Building Passport</h1>
      <StyledForm onSubmit={loginResident}>
        <TextField
          name="buildingId"
          sx={{ marginTop: "10px" }}
          label="Condomínio"
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
          sx={{ marginTop: "10px" }}
          label="E-mail"
          type="email"
          variant="outlined"
          disabled={disabled}
          onChange={updateState}
          required
        />
        <TextField
          name="password"
          sx={{ marginTop: "10px" }}
          label="Senha"
          type="password"
          variant="outlined"
          disabled={disabled}
          onChange={updateState}
          required
        />
        <Button
          variant="contained"
          sx={{ marginTop: "10px" }}
          type="submit"
          disabled={disabled}
        >
          Entrar
        </Button>
      </StyledForm>
      <StyledLink to="/sign-up">Não possui cadastro?</StyledLink>
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
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const StyledLink = styled(Link)``;
