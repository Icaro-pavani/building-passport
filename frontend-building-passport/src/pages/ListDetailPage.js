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
          <h3>{listInfo.title}</h3>
          <h4>
            Data: {listInfo.date} - Horário: {listInfo.hour}
          </h4>
          <GuestContainer>
            <h4>Convidados</h4>
            {listInfo.listGuest.map((item) => (
              <li>
                <p>{item.guest.name}</p>
                <p>
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
  h2 {
    margin-top: 100px;
  }
`;

const GuestContainer = styled.ul``;
