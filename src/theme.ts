import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    pugTan: Palette["primary"];
    pugMediumDark: Palette["primary"];
    pugNearlyDark: Palette["primary"];
    pugDark: Palette["primary"];
    pugTongue: Palette["primary"];
    cream: Palette["primary"];
  }
  interface PaletteOptions {
    pugTan?: PaletteOptions["primary"];
    pugMediumDark?: PaletteOptions["primary"];
    pugNearlyDark?: PaletteOptions["primary"];
    pugDark?: PaletteOptions["primary"];
    pugTongue?: PaletteOptions["primary"];
    cream?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Card" {
  interface CardPropsColorOverrides {
    pugTan: true;
    pugMediumDark: true;
    pugNearlyDark: true;
    pugDark: true;
    pugTongue: true;
    cream: true;
  }
}
declare module "@mui/material/CircularProgress" {
  interface CircularProgressPropsColorOverrides {
    pugTan: true;
    pugMediumDark: true;
    pugNearlyDark: true;
    pugDark: true;
    pugTongue: true;
    cream: true;
  }
}

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#594840", // pug-nearly-dark
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
    pugTan: {
      main: "#eeddcd",
    },
    pugMediumDark: {
      main: "#856d60",
    },
    pugNearlyDark: {
      main: "#594840",
    },
    pugDark: {
      main: "#2d231f",
    },
    pugTongue: {
      main: "#df9aa4",
    },
    cream: {
      main: "#f0f2f0",
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
