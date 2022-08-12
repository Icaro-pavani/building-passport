import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { BuildingContext } from "../contexts/BuildingContext";

export default function PrivateBuildingRoute({ children }) {
  const { building } = useContext(BuildingContext);
  return building?.token ? children : <Navigate to="/building" />;
}
