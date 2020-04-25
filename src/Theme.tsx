import React, { FunctionComponent } from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colour: {
    tileUnturnt: "#19647E",
    tileTurnt: "#28AFB0",
    background: "#37392E",
    mainFont: "#DDCECD",
    secondaryFont: "#EEE5E5",
  },
  font: {
    small: "16px",
    medium: "24px",
    large: "32px",
    family: "HandWritten",
  },
};

const Theme: FunctionComponent = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
