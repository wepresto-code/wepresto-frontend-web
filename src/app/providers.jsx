"use client";

import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";

import React, { useEffect } from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { getToken } from "firebase/messaging";

import environment from "@wepresto/environment";

import theme from "./theme";

import messaging from "@wepresto/firebase/messaging-sw";

import { AuthContextProvider } from "../context/auth-context";

import setFcmToken from "@wepresto/utils/set-fcm-token";

export function Providers({ children }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(async (registration) => {
          // eslint-disable-next-line no-console
          console.log("scope is: ", registration.scope);

          registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: environment.FIREBASE_WEB_PUSH_KEY,
          });

          try {
            const currentToken = await getToken(messaging, {
              vapidKey: environment.FIREBASE_WEB_PUSH_KEY,
              serviceWorkerRegistration: registration,
            });

            if (!currentToken) {
              // eslint-disable-next-line no-console
              console.log(
                "no registration token available. Request permission to generate one."
              );
              return;
            }

            // set token in local storage
            await setFcmToken(currentToken);
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log("an error occurred while retrieving token. ", error);
          }
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
