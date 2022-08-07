import { createContext, useState } from "react";

const ResidentContext = createContext();

function ResidentProvider({ children }) {
  const [resident, setResident] = useState(
    localStorage.getItem("resident")
      ? JSON.parse(localStorage.getItem("resident"))
      : { token: "" }
  );

  return (
    <ResidentContext.Provider value={{ resident, setResident }}>
      {children}
    </ResidentContext.Provider>
  );
}

export { ResidentContext, ResidentProvider };
