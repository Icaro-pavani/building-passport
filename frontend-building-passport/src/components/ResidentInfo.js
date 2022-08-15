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
          <CheckBoxRounded className="check" onClick={updateLivingStatus} />
        ) : (
          <DisabledByDefault
            className="not-check"
            onClick={updateLivingStatus}
          />
        )}
      </>
      <p>
        {name} - {apartment}
      </p>
      <DeleteForeverIcon className="icon-right" onClick={deleteResindent} />
    </ResidentContainer>
  );
}

const ResidentContainer = styled.li`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-bottom: 1px dotted var(--primary-color);

  p {
    width: 35%;
  }

  .check {
    margin-right: 15px;
    color: green;
  }

  .not-check {
    margin-right: 15px;
    color: red;
  }

  .icon-right {
    color: gray;
  }
`;
