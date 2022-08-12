import { Button, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { BuildingContext } from "../contexts/BuildingContext";
import api from "../services/api";
import Modal from "react-modal";
import BuildingHeader from "../components/BuildingHeader";
import { useNavigate } from "react-router-dom";
import NewsInfo from "../components/NewsInfo";

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

export default function BuildingNewsPage() {
  const { building } = useContext(BuildingContext);
  const [news, setNews] = useState([]);
  const [newsInfo, setNewsInfo] = useState({
    title: "",
    description: "",
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
      .getNewsFromBuilding(building.token)
      .then(({ data }) => {
        setNews([...data.news]);
      })
      .catch((error) => console.log(error.response.data));
  }, [building, loading]);

  function updateState(event) {
    const { name, value } = event.target;
    setNewsInfo((prevState) => ({ ...prevState, [name]: value }));
  }

  function addNews(event) {
    event.preventDefault();
    api
      .addBuildingNews(building.token, newsInfo)
      .then(() => {
        setLoading(!loading);
        setNewsInfo({
          title: "",
          description: "",
        });
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        triggerModal();
      });
  }

  return (
    <BuildingNewsContainer>
      <NewsContainer>
        <BuildingHeader />
        <Button
          variant="contained"
          type="button"
          onClick={() => navigate("/building/residents")}
        >
          Ir para residentes
        </Button>
        <StyledForm onSubmit={addNews}>
          <TextField
            name="title"
            sx={{ marginTop: "10px" }}
            label="Título"
            type="text"
            variant="outlined"
            onChange={updateState}
            value={newsInfo.title}
            required
          />
          <TextField
            name="description"
            sx={{ marginTop: "10px" }}
            label="Corpo da notícia"
            type="text"
            variant="outlined"
            onChange={updateState}
            value={newsInfo.description}
            required
          />
          <Button variant="contained" sx={{ marginTop: "10px" }} type="submit">
            Adicionar
          </Button>
        </StyledForm>
        {news.length === 0 ? (
          <h3>Não há residentes!</h3>
        ) : (
          <>
            {news.map(({ id, title, createAt }) => (
              <NewsInfo
                key={id}
                id={id}
                title={title}
                createAt={createAt}
                setLoading={setLoading}
                loading={loading}
              />
            ))}
          </>
        )}
      </NewsContainer>
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
    </BuildingNewsContainer>
  );
}

const BuildingNewsContainer = styled.div`
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

const NewsContainer = styled.ul``;
