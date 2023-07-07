import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import userService from "@wepresto/services/user.service";

import firebaseApp from "../firebase/config";
import getFcmToken from "@wepresto/utils/get-fcm-token";

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
            setLoading(false);

            const fcmToken = await getFcmToken();

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
