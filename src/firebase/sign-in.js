import firebaseApp from "./config";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebaseApp);

/**
 *
 *
 * @export
 * @param {{ email: string, password: string }} { email, password }
 * @return {*} 
 */
export default async function signIn({ email, password }) {
  const result = await signInWithEmailAndPassword(auth, email, password);

  return result;
}
