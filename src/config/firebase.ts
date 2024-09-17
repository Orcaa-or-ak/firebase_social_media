// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyB-si5WnRQdC0ASDPjr7x0ZM_FNSYKMEDQ",
	authDomain: "fir-social-media-f68d6.firebaseapp.com",
	projectId: "fir-social-media-f68d6",
	storageBucket: "fir-social-media-f68d6.appspot.com",
	messagingSenderId: "692930972793",
	appId: "1:692930972793:web:7800c1c42ad535b6ae18a8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth and provider
export const auth = getAuth(app); // Contains the information of current user
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app); // Contains the information of the database