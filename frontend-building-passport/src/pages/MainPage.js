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
          <NewsContainer>Não há notícias</NewsContainer>
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
                <p>{dayjs(news.createAt).format("DD/MM")}</p>
                <p>{news.title}</p>
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
            Você não possui eventos cadastrados ainda
          </EventsContainer>
        ) : (
          <EventsContainer>
            {events.map((event) => (
              <li key={event.id} onClick={() => navigate(`/list/${event.id}`)}>
                <p>{event.title}</p>
                <p>{`${event.date}-${event.hour}`}</p>
              </li>
            ))}
          </EventsContainer>
        )}
        <Button
          variant="contained"
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
  h2 {
    margin-top: 100px;
  }
`;

const NewsContainer = styled.ul`
  li {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
`;

const NewsOpenContainer = styled.div`
  border: 1px solid #000;
  display: ${(props) => (props.open ? "block" : "none")};
`;

const EventsContainer = styled.ul`
  li {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
`;
