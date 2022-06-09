import React from "react";
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

const httpClient = new HttpClient(process.env.REACT_APP_BASE_URL);
const tokenStorage = new TokenStorage();
const authService = new AuthService(httpClient, tokenStorage);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Globalstyle />
        <AuthContext authService={authService} tokenStorage={tokenStorage}>
          <AudioProvider>
            <App />
          </AudioProvider>
        </AuthContext>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
