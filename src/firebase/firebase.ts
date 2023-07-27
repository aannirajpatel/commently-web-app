// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import {
  GoogleAuthProvider,
  getAuth,
  signOut,
  connectAuthEmulator,
} from "firebase/auth";
import {
  getFunctions,
  connectFunctionsEmulator,
  httpsCallable,
  HttpsCallable,
} from "firebase/functions";
import { ILinkPreviewInput } from "../DTO/FirebaseCloudFunctionInputs/ILinkPreviewInput";
import { IPage } from "../DTO/Page/IPage";
import { DEV, RECAPTCHA_PROVIDER } from "../shared/Constants";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByGD4UkdONVpl2Be8l5EdIz1RvUwBxxrQ",
  authDomain: "commently-web-app.firebaseapp.com",
  projectId: "commently-web-app",
  storageBucket: "commently-web-app.appspot.com",
  messagingSenderId: "73614406166",
  appId: "1:73614406166:web:d2b2d99e0c753557c07b37",
  measurementId: "G-WP7K8XNBMY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const functions = getFunctions();
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const rdb = getDatabase(app);
export const auth = getAuth();

if (DEV) {
  //The Firebase AppCheck debug token is specified in the .env.local file and is not tracked by git
  console.log(
    "Running in dev env with debug token: " +
      process.env.REACT_APP_FIREBASE_APPCHECK_DEBUG_TOKEN
  );
  (window as any).self.FIREBASE_APPCHECK_DEBUG_TOKEN =
    process.env.REACT_APP_FIREBASE_APPCHECK_DEBUG_TOKEN;
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
}

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(RECAPTCHA_PROVIDER),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

export const gProvider = new GoogleAuthProvider();
export const getSite: HttpsCallable<ILinkPreviewInput, IPage> = httpsCallable(
  functions,
  "getSite"
);

export const logout = () => {
  signOut(auth);
};
