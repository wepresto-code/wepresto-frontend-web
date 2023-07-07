import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { getToken } from "firebase/messaging";

import environment from "@wepresto/environment";

import userService from "@wepresto/services/user.service";

import firebaseApp from "../firebase/config";

const auth = getAuth(firebaseApp);

export const AuthContext = React.createContext({ user: undefined });

const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(undefined);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        userService
          .getOne({ authUid: firebaseUser.uid })
          .then(async (data) => {
            const mergedUser = { ...firebaseUser, ...data };
            setUser(mergedUser);

            const registration = await navigator.serviceWorker.ready;

            registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: environment.FIREBASE_WEB_PUSH_KEY,
            });

            const { default: messaging } = await import("@wepresto/firebase/messaging-sw");

            let fcmToken;

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

              fcmToken = currentToken;
            } catch (error) {
              // eslint-disable-next-line no-console
              console.log("an error occurred while retrieving token. ", error);
            }

            // eslint-disable-next-line no-console
            console.log("fcm token: ", fcmToken);

            // check if the fcm token is set
            if (fcmToken && fcmToken !== mergedUser.fcmToken) {
              // check if the fcm token is the same as the one in the api
              // if not, update the fcm token in the api
              try {
                await userService.changeFcmtoken({
                  authUid: firebaseUser.uid,
                  fcmToken,
                });
              } catch (error) {
                // eslint-disable-next-line no-console
                console.log("error changing fcm token...");
                console.error(error);
              }
            }

            setLoading(false);
          })
          .catch((error) => {
            // eslint-disable-next-line no-console
            console.log("error getting user...");
            console.error(error);
          });
      } else {
        setUser(undefined);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export default useAuthContext;
