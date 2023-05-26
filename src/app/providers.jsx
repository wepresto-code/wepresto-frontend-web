// app/providers.tsx
"use client";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import { AuthContextProvider } from "../context/auth-context";
import theme from "./theme";

export function Providers({ children }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
