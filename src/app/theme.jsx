import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  shadows: {
    outline: "0 0 0 3px rgba(66, 153, 225, 0.6)",
    base: "0 0 0 3px rgba(0, 0, 0, 0.04)",
    top: "0px 10px 19px 1px rgba(59,59,59,.5)",
  },
  colors: {
    error: {
      100: "#FED1D1",
      200: "#E88787",
      300: "#B95252",
      400: "#8E2727",
    },
    brand: {
      lime: "#CCFC54",
      font: "#09230E",
      background: "#F2F8F8",
    },
    status: {
      reviewing: "#E47C50",
    },
    primary: {
      50: "#ECF7F8",
      100: "#CBE9EB",
      200: "#AADBDF",
      300: "#89CCD2",
      350: "#789DA1",
      400: "#67BEC6",
      500: "#1F4E52",
      600: "#388D94",
      700: "#2A6A6F",
      800: "#1C464A",
      900: "#0E2325",
    },
    gray: {
      50: "#F4F4F4",
      100: "#f7f5f3",
      150: "#F9F9F9",
      200: "#e3dcd7",
      250: "#d7d1cd",
      300: "#707070",
      400: "#636363",
      500: "#565656",
      600: "#494949",
      700: "#3d3d3d",
      800: "#303030",
      900: "#1b1b1b",
    },
  },
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  styles: {
    global: {
      body: {
        bg: "gray.50",
        color: "black",
      },
    },
  },
});

export default theme;
