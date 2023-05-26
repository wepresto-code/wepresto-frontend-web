import { getAuth } from "firebase/auth";
import firebaseApp from "@wepresto/firebase/config";


export default async function getIdTokenFromCurrentUser() {
    const auth = getAuth(firebaseApp);

    const { currentUser } = auth;

    if (!currentUser) {
        return undefined;
    }

    const token = await currentUser.getIdToken();

    return token;
}