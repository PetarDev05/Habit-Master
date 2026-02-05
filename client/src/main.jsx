import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./modules/authentication/context/UserContextProvider.context.jsx";
import DataContextProvider from "./modules/data/context/DataContextProvider.context.jsx";

createRoot(document.getElementById("root")).render(
  <UserContextProvider>
    <DataContextProvider>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </DataContextProvider>
  </UserContextProvider>,
);
