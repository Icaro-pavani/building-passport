import dayjs from "dayjs";
import styled from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useContext } from "react";
import { BuildingContext } from "../contexts/BuildingContext";
import api from "../services/api";

export default function NewsInfo({ id, title, createAt, setLoading, loading }) {
  const { building } = useContext(BuildingContext);

  function deleteNews() {
    api
      .deleteNews(building.token, id)
      .then(() => {
        setLoading(!loading);
      })
      .catch((error) => alert(error.response.data));
  }

  return (
    <ResidentContainer>
      <p>{title}</p>
      <p>{dayjs(createAt).format("DD/MM")}</p>
      <DeleteForeverIcon onClick={deleteNews} />
    </ResidentContainer>
  );
}

const ResidentContainer = styled.li`
  display: flex;
  justify-content: space-between;
`;
