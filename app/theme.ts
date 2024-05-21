import { createTheme } from "@mui/material/styles";
import {
  BLACK,
  DARK_GREY,
  GREEN,
  LIGHT_GREY,
  PLUM,
  WHITE,
} from "./utils/constants";
import { Raleway } from "next/font/google";

const raleway = Raleway({ subsets: ["latin"], style: ["normal"] });

declare module "@mui/material/styles" {
  interface Palette {
    mgrey: Palette["primary"];
    black: Palette["primary"];
    white: Palette["primary"];
  }
  interface PaletteOptions {
    mgrey: PaletteOptions["primary"];
    black: PaletteOptions["primary"];
    white: PaletteOptions["primary"];
  }
}

const { palette } = createTheme();
const theme = createTheme({
  palette: {
    background: {
      default: WHITE,
    },
    primary: {
      main: PLUM,
    },
    secondary: {
      main: GREEN,
    },
    mgrey: {
      main: LIGHT_GREY,
      dark: DARK_GREY,
    },
    black: palette.augmentColor({ color: { main: BLACK } }),
    white: palette.augmentColor({ color: { main: WHITE } }),
  },
  typography: {
    fontFamily: raleway.style.fontFamily,
    allVariants: { color: BLACK },
  },
});

export default theme;
