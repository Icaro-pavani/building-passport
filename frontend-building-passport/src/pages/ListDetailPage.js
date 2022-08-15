import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { ResidentContext } from "../contexts/ResidentContext";
import api from "../services/api";
import Header from "../components/Header";

export default function ListDetailPage() {
  const [listInfo, setListInfo] = useState({});
  const { id } = useParams();
  const { resident } = useContext(ResidentContext);

  useEffect(() => {
    api
      .getOneList(resident.token, id)
      .then(({ data }) => {
        setListInfo({ ...data.list });
      })
      .catch((error) => console.log(error.response.data));
  }, [id, resident]);

  return (
    <ListDetailContainer>
      <Header />
      <h2>Detalhes do evento</h2>
      {listInfo.title ? (
        <>
          <h3>
            Nome do evento: <span>{listInfo.title}</span>
          </h3>
          <h4>
            Data: {listInfo.date} - Horário: {listInfo.hour}
          </h4>
          <GuestContainer>
            <h4>Convidados:</h4>
            {listInfo.listGuest.map((item) => (
              <li>
                <p>{item.guest.name}</p>
                <p>
                  {" "}
                  Confirmado?
                  {item.confirmed ? (
                    <CheckBoxIcon sx={{ color: "green" }} />
                  ) : (
                    <DisabledByDefaultIcon sx={{ color: "red" }} />
                  )}
                </p>
              </li>
            ))}
          </GuestContainer>
        </>
      ) : (
        <>Loading...</>
      )}
    </ListDetailContainer>
  );
}

const ListDetailContainer = styled.div`
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 15%;

  h2 {
    width: 100%;
    font-size: 32px;
    font-weight: bold;
    line-height: 40px;
  }

  h3 {
    margin-top: 15px;
    font-size: 20px;
    line-height: 26px;
    width: 100%;

    span {
      font-weight: bold;
    }
  }

  h4 {
    margin-top: 15px;
    font-size: 20px;
    line-height: 26px;
    width: 100%;
  }
`;

const GuestContainer = styled.ul`
  width: 100%;

  h4 {
    margin-top: 15px;
    font-size: 20px;
    line-height: 26px;
    width: 100%;
    font-weight: bold;
    border-bottom: 1px dotted var(--primary-color);
  }

  li {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px dotted var(--primary-color);

    p {
      display: flex;
      align-items: center;
      font-size: 18px;
      line-height: 24px;
      margin: 10px;
    }
  }
`;
