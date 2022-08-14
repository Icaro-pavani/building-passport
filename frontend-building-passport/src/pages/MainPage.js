import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import Header from "../components/Header";
import api from "../services/api";
import { ResidentContext } from "../contexts/ResidentContext";
import { Button } from "@mui/material";
import FormatListNumberedTwoToneIcon from "@mui/icons-material/FormatListNumberedTwoTone";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const [news, setNews] = useState([]);
  const [events, setEvents] = useState([]);
  const [newsContent, setNewsContent] = useState({});
  const [openNews, setOpenNews] = useState(false);
  const { resident } = useContext(ResidentContext);

  const navigate = useNavigate();

  useEffect(() => {
    api
      .getNews(resident.token)
      .then(({ data }) => {
        setNews(data.news);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    api
      .getEvents(resident.token)
      .then(({ data }) => {
        setEvents([...data.lists]);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [resident]);

  return (
    <>
      <Header />
      <MainPageContainer>
        <h2>Notícias</h2>
        {news.length === 0 ? (
          <NewsContainer>
            <p>Não há notícias</p>
          </NewsContainer>
        ) : (
          <NewsContainer>
            {news.map((news) => (
              <li
                key={news.id}
                onClick={() => {
                  setNewsContent({ ...news });
                  setOpenNews(true);
                }}
              >
                <p>{`${dayjs(news.createAt).format("DD/MM")} - ${
                  news.title
                }`}</p>
              </li>
            ))}
          </NewsContainer>
        )}
        <NewsOpenContainer open={openNews}>
          <h3>{newsContent.title}</h3>
          <p>{newsContent.description}</p>
        </NewsOpenContainer>
        <h2>Seus Eventos</h2>
        {events.length === 0 ? (
          <EventsContainer>
            <p>Você não possui eventos cadastrados ainda</p>
          </EventsContainer>
        ) : (
          <EventsContainer>
            {events.map((event) => (
              <li key={event.id} onClick={() => navigate(`/list/${event.id}`)}>
                <p>{`Evento: ${event.title}`}</p>
                <p> {`Data: ${event.date}-${event.hour}`}</p>
              </li>
            ))}
          </EventsContainer>
        )}
        <Button
          variant="contained"
          className="button"
          endIcon={<FormatListNumberedTwoToneIcon />}
          onClick={() => navigate("/create-list")}
        >
          Cadastrar Evento
        </Button>
      </MainPageContainer>
    </>
  );
}

const MainPageContainer = styled.div`
  padding: 0 15%;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    width: 100%;
    margin-top: 100px;
    font-weight: bold;
    font-size: 34px;
    line-height: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid var(--primary-color);
  }

  .button {
    background-color: var(--button-color);
    margin: 30px 0;
    width: 70%;
  }
`;

const NewsContainer = styled.ul`
  width: 100%;

  li {
    display: flex;
    width: 100%;
    cursor: pointer;

    p {
      width: 100%;
      border-bottom: 1px solid var(--primary-color);
      text-align: center;
      font-size: 18px;
      line-height: 24px;
    }
  }
`;

const NewsOpenContainer = styled.div`
  padding: 10px;
  margin-top: 20px;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  display: ${(props) => (props.open ? "block" : "none")};

  h3 {
    width: 100%;
    font-size: 20px;
    line-height: 28px;
    font-weight: bold;
    border-bottom: 1px dotted var(--primary-color);
  }

  p {
    margin-top: 10px;
    width: 100%;
    font-size: 18px;
    line-height: 24px;
  }
`;

const EventsContainer = styled.ul`
  width: 100%;

  li {
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-bottom: 1px solid var(--primary-color);
    cursor: pointer;
  }

  p {
    display: flex;
    align-items: center;
    width: 80%;

    font-size: 18px;
    line-height: 24px;
    padding-left: 15px;
    height: 50px;
    text-align: center;
  }
`;
