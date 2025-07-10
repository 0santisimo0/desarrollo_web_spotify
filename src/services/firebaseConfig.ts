import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDTpk2xYjR3pMx5_UERgFaW73iE_zNywmA",
  authDomain: "dashboardsdb-e6bf1.firebaseapp.com",
  projectId: "dashboardsdb-e6bf1",
  storageBucket: "dashboardsdb-e6bf1.firebasestorage.app",
  messagingSenderId: "471319806329",
  appId: "1:471319806329:web:5695cebd9aef21d505efa8",
  measurementId: "G-WS7PT21HQY"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const messaging = getMessaging(app);
export const analytics = getAnalytics(app);

export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
facebookProvider.addScope("email");
