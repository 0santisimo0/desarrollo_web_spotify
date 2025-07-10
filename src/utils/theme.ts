import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1DB954",
    },
    secondary: {
      main: "#191414",
    },
    background: {
      default: "#121212",
      paper: "#191414",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#B3B3B3",
    },
  },
  components: {
    MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "white",
              },
              "&:hover fieldset": {
                borderColor: "#72f7f7",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#72f7f7",
              },
              "& .MuiInputBase-input": {
                color: "white",
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            boxShadow: "0 0 6px rgba(202, 202, 202, 0.15)",
            background: "#1a064f",
          },
        },
      },
  },
});
