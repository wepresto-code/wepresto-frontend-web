import firebaseApp from "./config";
import { getAuth, signOut as firebaseSignOut  } from "firebase/auth";

const auth = getAuth(firebaseApp);

export default async function signOut() {
  await firebaseSignOut(auth);

  if (auth.currentUser) await auth.signOut();
}
