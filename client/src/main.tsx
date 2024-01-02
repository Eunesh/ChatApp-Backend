import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import actionCable from "actioncable";

const CableApp: { cable: ReturnType<typeof actionCable.createConsumer> } = {
  cable: actionCable.createConsumer("ws://localhost:3001/chats"),
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App cable={CableApp.cable} />
    </BrowserRouter>
  </React.StrictMode>
);
