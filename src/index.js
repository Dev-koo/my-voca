import React, { createContext, useContext } from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Globalstyle from "./common/css/globalStyle.js";
import { ThemeProvider } from "styled-components";
import { AudioProvider } from "./contexts/AudioContext";
import theme from "./common/theme.js";
import AuthContext from "./contexts/AuthContext.jsx";
import AuthService from "./service/authService.js";
import TokenStorage from "./common/js/tokenStorage.js";
import HttpClient from "./common/js/http.js";
import CardsService from "./service/cardService.js";
import { CardContext } from "./contexts/CardContext.js";
import { GroupProvider } from "./contexts/GroupContext.js";
import GroupService from "./service/groupService.js";
import CsvService from "./service/csvService.js";

const httpClient = new HttpClient(process.env.REACT_APP_BASE_URL);
const tokenStorage = new TokenStorage();
const authService = new AuthService(httpClient, tokenStorage);
const cardService = new CardsService(httpClient, tokenStorage);
const groupService = new GroupService(httpClient, tokenStorage);
const csvService = new CsvService(httpClient, tokenStorage);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Globalstyle />
        <AuthContext authService={authService} tokenStorage={tokenStorage}>
          <CardContext.Provider value={cardService}>
            <GroupProvider groupService={groupService}>
              <AudioProvider>
                <App csvService={csvService} />
              </AudioProvider>
            </GroupProvider>
          </CardContext.Provider>
        </AuthContext>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
