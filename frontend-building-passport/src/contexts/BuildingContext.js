import { createContext, useState } from "react";

const BuildingContext = createContext();

function BuildingProvider({ children }) {
  const [building, setBuilding] = useState({ token: "" });

  return (
    <BuildingContext.Provider value={{ building, setBuilding }}>
      {children}
    </BuildingContext.Provider>
  );
}

export { BuildingContext, BuildingProvider };
