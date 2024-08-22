import { Context } from "./context/Context";
import { Outlet } from "react-router-dom";
import "./index.scss";

const App = () => {
  const value = {};

  return (
    <Context.Provider value={value}>
      <Outlet />
    </Context.Provider>
  );
};

export default App;
