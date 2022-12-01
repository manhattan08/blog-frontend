import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: ["none"],
  palette: {
    primary: {
      main: "#9961ee",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
