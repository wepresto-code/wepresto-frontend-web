import React from "react";
import {
  onAuthStateChanged,
  getAuth,
} from "firebase/auth";
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
        userService.getOne({ uid: firebaseUser.uid }).then((data) => {
          const mergedUser = { ...firebaseUser, ...data };
          setUser(mergedUser);
          setLoading(false);
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
