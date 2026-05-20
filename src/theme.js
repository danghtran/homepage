import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0d9488",
      light: "#2dd4bf",
      dark: "#0f766e",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0284c7",
      light: "#38bdf8",
      dark: "#0369a1",
    },
    background: {
      default: "#f0f9ff",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
    divider: "rgba(2, 132, 199, 0.12)",
  },
  typography: {
    fontFamily: '"DM Sans", "Segoe UI", Roboto, sans-serif',
    h3: { fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.2 },
    h5: { fontWeight: 700, letterSpacing: "-0.01em" },
    h6: { fontWeight: 600 },
    body1: { lineHeight: 1.7 },
    body2: { lineHeight: 1.65 },
  },
  shape: {
    borderRadius: 14,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#f0f9ff",
        },
        a: {
          color: "#0284c7",
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 20px rgba(2, 132, 199, 0.08)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 10,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
  },
});

export const pageGradient = "linear-gradient(165deg, #f0f9ff 0%, #e0f2fe 45%, #fef9c3 100%)";

export const heroGradient =
  "linear-gradient(135deg, #ffffff 0%, #ecfeff 50%, #e0f2fe 100%)";

export const cardSx = {
  bgcolor: "background.paper",
  height: "100%",
  border: "1px solid",
  borderColor: "divider",
  transition: "transform 0.22s ease, box-shadow 0.22s ease",
  "&:hover": {
    transform: "translateY(-3px)",
    boxShadow: "0 14px 36px rgba(13, 148, 136, 0.14)",
  },
};

export const accentBorders = ["primary.main", "secondary.main", "#f59e0b"];
