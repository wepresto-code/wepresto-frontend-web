import { getMessaging } from "firebase/messaging/sw";

import firebaseApp from "./config";

const messaging = getMessaging(firebaseApp);

export default messaging;
