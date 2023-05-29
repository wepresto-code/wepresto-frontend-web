// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

import environment from "@wepresto/environment";

const firebaseConfig = {
    apiKey: environment.FIREBASE_API_KEY,
    authDomain: environment.FIREBASE_AUTH_DOMAIN,
    projectId: environment.FIREBASE_PROJECT_ID,
    storageBucket: environment.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: environment.FIREBASE_MESSAGING_SENDER_ID,
    appId: environment.FIREBASE_APP_ID,
    measurementId: environment.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebaseApp;
