import { Button, Checkbox, TextField, MenuItem } from "@mui/material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import { ResidentContext } from "../contexts/ResidentContext";
import api from "../services/api";
import Masks from "../utils/masks";
import Modal from "react-modal";

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

export default function AddListPage() {
  const { resident } = useContext(ResidentContext);
  const [listInfo, setListInfo] = useState({
    title: "",
    date: "",
    hour: "",
  });
  const [guests, setGuests] = useState([]);
  const [checked, setChecked] = useState(false);
  const [previousLists, setPreviousList] = useState([]);
  const [selectedList, setSelectedList] = useState(-1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    api
      .getEvents(resident.token)
      .then(({ data }) => {
        setPreviousList([...data.lists]);
      })
      .catch((error) => console.log(error.response.data));
  }, [resident]);

  function sendList(event) {
    event.preventDefault();
    const listData = { ...listInfo, numberGuests: guests.length, guests };
    api
      .addNewList(resident.token, listData)
      .then(() => {
        navigate("/main");
      })
      .catch((error) => {
        triggerModal();
        setErrorMessage(error.response.data);
      });
  }

  function addGuestField() {
    guests.push({ name: "", email: "" });
    setGuests([...guests]);
  }

  function handleCheck(event) {
    setChecked(event.target.checked);
  }

  function getGuestsFromList(event) {
    setSelectedList(event.target.value);
    previousLists[event.target.value].listGuest.forEach((guest) => {
      guests.push({ name: guest.guest.name, email: guest.guest.email });
    });
    setGuests([...guests]);
  }

  function handleGuestChange(event, index) {
    const { name, value } = event.target;
    guests[index][name] = value;
    setGuests([...guests]);
  }

  function triggerModal() {
    setModalIsOpen(!modalIsOpen);
  }

  return (
    <>
      <Header />
      <AddListContainer>
        <h2>Criando novo evento</h2>
        <StyledForm onSubmit={sendList}>
          <h3>Detalhes do evento</h3>
          <TextField
            name="title"
            sx={{ marginTop: "10px" }}
            label="Nome do Evento/Festa"
            type="text"
            variant="outlined"
            onChange={(event) => {
              const { name, value } = event.target;
              setListInfo((prevState) => ({
                ...prevState,
                [name]: value,
              }));
            }}
            value={listInfo.title}
            required
          />
          <TextField
            name="date"
            sx={{ marginTop: "10px" }}
            label="Data"
            type="text"
            variant="outlined"
            onChange={(event) => {
              const { name, value } = event.target;
              setListInfo((prevState) => ({
                ...prevState,
                [name]: Masks.dateMask(value),
              }));
            }}
            value={listInfo.date}
            required
          />
          <TextField
            name="hour"
            sx={{ marginTop: "10px" }}
            label="Horário"
            type="text"
            variant="outlined"
            onChange={(event) => {
              const { name, value } = event.target;
              setListInfo((prevState) => ({
                ...prevState,
                [name]: Masks.hourMask(value),
              }));
            }}
            value={listInfo.hour}
            required
          />
          <h3>Convidados</h3>
          <CheckContainer>
            <p>Utilizar lista de outro evento?</p>
            <Checkbox checked={checked} onChange={handleCheck} />
          </CheckContainer>
          <TextField
            name="listId"
            sx={{ marginTop: "10px" }}
            label="Lista antinga"
            select
            variant="outlined"
            disabled={!checked}
            value={selectedList}
            onChange={getGuestsFromList}
            required
          >
            {previousLists.map((list, index) => (
              <MenuItem key={index} value={index}>
                {list.title}
              </MenuItem>
            ))}
          </TextField>
          {guests.map((guest, index) => {
            return (
              <GuestContainer key={index}>
                <TextField
                  name="name"
                  sx={{ marginTop: "10px" }}
                  label={`Nome Convidado ${index + 1}`}
                  type="text"
                  variant="outlined"
                  value={guest.name}
                  onChange={(event) => handleGuestChange(event, index)}
                  required
                />
                <TextField
                  name="email"
                  sx={{ marginTop: "10px" }}
                  label="E-mail"
                  type="email"
                  variant="outlined"
                  value={guest.email}
                  onChange={(event) => handleGuestChange(event, index)}
                  required
                />
              </GuestContainer>
            );
          })}
          <Button
            variant="contained"
            sx={{ marginTop: "10px" }}
            type="button"
            endIcon={<AddBoxIcon />}
            onClick={addGuestField}
          >
            Adicionar Convidado
          </Button>
          <Button variant="contained" sx={{ marginTop: "10px" }} type="submit">
            Finalizar Lista
          </Button>
        </StyledForm>
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
      </AddListContainer>
    </>
  );
}

const AddListContainer = styled.div`
  h2 {
    margin-top: 100px;
  }
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const CheckContainer = styled.div`
  display: flex;
  align-items: center;
`;

const GuestContainer = styled.div``;
