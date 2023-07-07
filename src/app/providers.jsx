"use client";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

import React, { useEffect } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import theme from "./theme";

import { AuthContextProvider } from "../context/auth-context";

export function Providers({ children }) {
  useEffect(() => {    
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(async (registration) => {
          // eslint-disable-next-line no-console
          console.log("scope is: ", registration.scope);
        });
    }
  }, []);

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <AuthContextProvider>{children}</AuthContextProvider>
      </ChakraProvider>
    </CacheProvider>
  );
}
