import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      pugTan: string;
      pugMediumDark: string;
      pugNearlyDark: string;
      pugDark: string;
      pugTongue: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      pugTan?: string;
      pugMediumDark?: string;
      pugNearlyDark?: string;
      pugDark?: string;
      pugTongue?: string;
    };
  }
}

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#594840", // pug-tan
    },
    secondary: {
      main: "#856d60", // pug-medium-dark
    },
    background: {
      default: "#f0f2f0", // cream
    },
    error: {
      main: "#e60000",
    },
    custom: {
      pugTan: "#eeddcd",
      pugMediumDark: "#856d60",
      pugNearlyDark: "#594840",
      pugDark: "#2d231f",
      pugTongue: "#df9aa4",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          padding: "16px",
          maxWidth: "80%",
        },
      },
    },
  },
});

export default customTheme;
