import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";


import Router from "./router/index.jsx"

import store from "./store/store.js";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <Router />
  </Provider>
  // </React.StrictMode>,
);
