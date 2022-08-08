import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ResidentContext } from "../contexts/ResidentContext";

export default function PrivateResidentRoute({ children }) {
  const { resident } = useContext(ResidentContext);
  return resident?.token ? children : <Navigate to="/" />;
}
