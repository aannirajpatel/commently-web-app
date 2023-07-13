// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth, signOut, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator, httpsCallable, HttpsCallable } from "firebase/functions";
import { ILinkPreviewInput } from "../DTO/FirebaseCloudFunctionInputs/ILinkPreviewInput";
import { ISite } from "../DTO/Site/ISite";
import { DEV, RECAPTCHA_PROVIDER } from "../shared/Constants";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPixBL2R_DBSzI33Ceq1w-sSjQ1Z5EZ9U",
  authDomain: "cybernation-commently.firebaseapp.com",
  projectId: "cybernation-commently",
  storageBucket: "cybernation-commently.appspot.com",
  messagingSenderId: "808302709765",
  appId: "1:808302709765:web:20ff08a37b120c375d606c",
  measurementId: "G-TG60HXFGK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const functions = getFunctions(app);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth();

if (DEV) {
  //The Firebase AppCheck debug token is specified in the .env.local file and is not tracked by git
  (window as any).self.FIREBASE_APPCHECK_DEBUG_TOKEN = process.env.FIREBASE_APPCHECK_DEBUG_TOKEN;
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
}

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(RECAPTCHA_PROVIDER),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true
});

export const gProvider = new GoogleAuthProvider();
export const getSite: HttpsCallable<ILinkPreviewInput, ISite> = httpsCallable(functions, 'getSite');

export const logout = () => {
  signOut(auth);
};