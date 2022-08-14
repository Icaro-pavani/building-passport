import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import styled from "styled-components";
import GuestHeader from "../components/GuestHeader";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Modal from "react-modal";
import Masks from "../utils/masks";

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

export default function GuestInfoPage() {
  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    cpf: "",
  });
  const [guestToken, setGuestToken] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function triggerModal() {
    setModalIsOpen(!modalIsOpen);
  }

  function updateState(event) {
    const { name, value } = event.target;
    setGuestInfo((prevState) => ({ ...prevState, [name]: value }));
  }

  function sendConfirmation(event) {
    event.preventDefault();
    api
      .confirmGuest(guestToken, guestInfo)
      .then(({ data }) => {
        navigate(`/qrcode?src=${data.qrcode}`);
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        triggerModal();
      });
  }

  useEffect(() => {
    const url = window.location.href;
    const token = url.split("?code=")[1];
    setGuestToken(token);
    api
      .getGuestInfo(token)
      .then(({ data }) => {
        delete data.guestListInfo.guest.id;
        delete data.guestListInfo.guest.cel;
        setGuestInfo((prevState) => ({
          ...prevState,
          ...data.guestListInfo.guest,
        }));
      })
      .catch((error) => console.log(error.response.data));
  }, []);

  return (
    <GuestInfoContainer>
      <GuestHeader />
      <h2>Confirme seus dados:</h2>
      <StyledForm onSubmit={sendConfirmation}>
        <TextField
          name="name"
          className="input"
          sx={{ marginTop: "15px" }}
          label="Nome completo"
          type="text"
          variant="outlined"
          onChange={updateState}
          value={guestInfo.name}
          required
        />
        <TextField
          name="email"
          className="input"
          sx={{ marginTop: "15px" }}
          label="E-mail"
          type="email"
          variant="outlined"
          onChange={updateState}
          value={guestInfo.email}
          required
        />
        <TextField
          name="cpf"
          className="input"
          sx={{ marginTop: "15px" }}
          label="CPF"
          type="text"
          variant="outlined"
          onChange={(event) => {
            const { name, value } = event.target;
            setGuestInfo((prevState) => ({
              ...prevState,
              [name]: Masks.cpfMask(value),
            }));
          }}
          value={guestInfo.cpf}
          required
        />
        <Button
          variant="contained"
          className="button"
          sx={{ marginTop: "10px" }}
          type="submit"
        >
          Confirmar Presença
        </Button>
      </StyledForm>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={triggerModal}
        contentLabel="Error Message"
        style={modalStyles}
      >
        <h2 style={h2ModalStyle}>Confirmação Inválida!</h2>
        <h3 style={h3ModalStyle}>{errorMessage}</h3>
        <button style={buttonModalStyle} onClick={triggerModal}>
          Ok
        </button>
      </Modal>
    </GuestInfoContainer>
  );
}

const GuestInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 15%;

  h2 {
    width: 100%;
    margin-top: 100px;
    font-weight: bold;
    font-size: 24px;
    line-height: 30px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  .input {
    width: 100%;
  }

  .button {
    width: 70%;
    background-color: var(--button-color);
  }
`;
