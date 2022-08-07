import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ResidentContext } from "../contexts/ResidentContext";

export default function PrivateResidentRoute({ children }) {
  const { user } = useContext(ResidentContext);
  return user?.token ? children : <Navigate to="/" />;
}
