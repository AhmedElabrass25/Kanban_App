import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header";
import TheDrawar from "./components/TheDrawar";
import WorkSpace from "./components/WorkSpace";
import { DataContext } from "./context/DataContext";
const App = () => {
  const { dataState, selected } = useContext(DataContext);
  return (
    <>
      <BrowserRouter>
        <Header />
        <TheDrawar />
        <WorkSpace columns={dataState[selected]?.columns} />
      </BrowserRouter>
    </>
  );
};

export default App;
