import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import ResidentInfo from "../components/ResidentInfo";
import { BuildingContext } from "../contexts/BuildingContext";
import api from "../services/api";
import Masks from "../utils/masks";
import Modal from "react-modal";
import BuildingHeader from "../components/BuildingHeader";
import { useNavigate } from "react-router-dom";

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

export default function BuildingResidentsPage() {
  const { building } = useContext(BuildingContext);
  const [residents, setResidents] = useState([]);
  const [residentInfo, setResidentInfo] = useState({
    name: "",
    cpf: "",
    apartment: "",
  });
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  function triggerModal() {
    setModalIsOpen(!modalIsOpen);
  }

  useEffect(() => {
    api
      .getAllBuildingsResidents(building.token)
      .then(({ data }) => {
        setResidents([...data.residents]);
      })
      .catch((error) => console.log(error.response.data));
  }, [building, loading]);

  function updateState(event) {
    const { name, value } = event.target;
    setResidentInfo((prevState) => ({ ...prevState, [name]: value }));
  }

  function registerResident(event) {
    event.preventDefault();
    api
      .addNewResident(building.token, residentInfo)
      .then(() => {
        setLoading(!loading);
        setResidentInfo({
          name: "",
          cpf: "",
          apartment: "",
        });
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        triggerModal();
      });
  }

  return (
    <BuildingResidentContainer>
      <ResidentContainer>
        <BuildingHeader />
        <Button
          variant="contained"
          type="button"
          onClick={() => navigate("/building/news")}
        >
          Ir para notícias
        </Button>
        <StyledForm onSubmit={registerResident}>
          <TextField
            name="name"
            sx={{ marginTop: "10px" }}
            label="Nome completo"
            type="text"
            variant="outlined"
            onChange={updateState}
            value={residentInfo.name}
            required
          />
          <TextField
            name="cpf"
            sx={{ marginTop: "10px" }}
            label="CPF"
            type="text"
            variant="outlined"
            onChange={(event) => {
              const { name, value } = event.target;
              setResidentInfo((prevState) => ({
                ...prevState,
                [name]: Masks.cpfMask(value),
              }));
            }}
            value={residentInfo.cpf}
            required
          />
          <TextField
            name="apartment"
            sx={{ marginTop: "10px" }}
            label="Apartamento"
            type="text"
            variant="outlined"
            onChange={updateState}
            value={residentInfo.email}
            required
          />
          <Button variant="contained" sx={{ marginTop: "10px" }} type="submit">
            Adiconar
          </Button>
        </StyledForm>
        {residents.length === 0 ? (
          <h3>Não há residentes!</h3>
        ) : (
          <>
            {residents.map(({ id, name, apartment, isLiving }) => (
              <ResidentInfo
                key={id}
                id={id}
                name={name}
                apartment={apartment}
                isLiving={isLiving}
                setLoading={setLoading}
                loading={loading}
              />
            ))}
          </>
        )}
      </ResidentContainer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={triggerModal}
        contentLabel="Error Message"
        style={modalStyles}
      >
        <h2 style={h2ModalStyle}>Cadastro Inválido!</h2>
        <h3 style={h3ModalStyle}>{errorMessage}</h3>
        <button style={buttonModalStyle} onClick={triggerModal}>
          Ok
        </button>
      </Modal>
    </BuildingResidentContainer>
  );
}

const BuildingResidentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ResidentContainer = styled.ul``;
