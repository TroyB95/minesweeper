import React, { FunctionComponent } from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  mainColour: "red",
  secondaryColour: "pink",
};

const Theme: FunctionComponent = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
