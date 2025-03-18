import { createContext, useEffect, useState } from "react";
export const DataContext = createContext();
const DataContextProvider = ({ children }) => {
  const [dataState, setDataState] = useState(
    JSON.parse(localStorage.getItem("dataState")) || [],
  );
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    localStorage.setItem("dataState", JSON.stringify(dataState));
  }, [dataState]);
  return (
    <DataContext.Provider
      value={{ selected, setSelected, dataState, setDataState }}
    >
      {children}
    </DataContext.Provider>
  );
};
export default DataContextProvider;
