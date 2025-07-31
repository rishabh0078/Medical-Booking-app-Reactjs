import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDxlgsEDNwgyuZQVHvn6fiu_1XFCynH7_w",
  authDomain: "nirvana360-be044.firebaseapp.com",
  projectId: "nirvana360-be044",
  storageBucket: "nirvana360-be044.appspot.com", // <-- fix: should be .appspot.com
  messagingSenderId: "681511871630",
  appId: "1:681511871630:web:6914ef1b1f531ca92315df",
  measurementId: "G-8C3JMJ54PE"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);