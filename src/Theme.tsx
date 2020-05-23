import React from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colour: {
    tileUnturnt: "#19647E",
    tileTurnt: "#28AFB0",
    darkHover: "#145064",
    background: "#37392E",
    mainFont: "#DDCECD",
    secondaryFont: "#EEE5E5",
  },
  font: {
    small: "16px",
    medium: "24px",
    large: "32px",
    family: "HandWritten",
    bold: "ClearBold",
  },
};

const Theme = ({ children }: { children: React.ReactNode }): JSX.Element => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
