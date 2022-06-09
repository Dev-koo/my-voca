import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Globalstyle from "./common/css/globalStyle.js";
import { ThemeProvider } from "styled-components";
import { AudioProvider } from "./contexts/AudioContext";
import theme from "./common/theme.js";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <AudioProvider>
          <Globalstyle />
          <App />
        </AudioProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
