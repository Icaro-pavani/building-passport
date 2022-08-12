import styled from "styled-components";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useContext } from "react";
import { BuildingContext } from "../contexts/BuildingContext";
import api from "../services/api";
import { CheckBoxRounded } from "@mui/icons-material";
import DisabledByDefault from "@mui/icons-material/DisabledByDefault";

export default function ResidentInfo({
  id,
  name,
  apartment,
  isLiving,
  setLoading,
  loading,
}) {
  const { building } = useContext(BuildingContext);

  function updateLivingStatus() {
    api
      .updateResidentStatus(building.token, id, { isLiving: !isLiving })
      .then(() => {
        setLoading(!loading);
      })
      .catch((error) => alert(error.response.data));
  }

  function deleteResindent() {
    api
      .deleteResident(building.token, id)
      .then(() => {
        setLoading(!loading);
      })
      .catch((error) => alert(error.response.data));
  }

  return (
    <ResidentContainer>
      <>
        <p>Atualmente morando? </p>
        {isLiving ? (
          <CheckBoxRounded onClick={updateLivingStatus} />
        ) : (
          <DisabledByDefault onClick={updateLivingStatus} />
        )}
      </>
      <p>
        {name} - {apartment}
      </p>
      <DeleteForeverIcon onClick={deleteResindent} />
    </ResidentContainer>
  );
}

const ResidentContainer = styled.li`
  display: flex;
  justify-content: space-between;
`;
