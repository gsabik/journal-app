// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAhHwXYzpkOmVIlb2lTPLxSYMGo7fvG-Ck",
	authDomain: "journal-app-8fdad.firebaseapp.com",
	projectId: "journal-app-8fdad",
	storageBucket: "journal-app-8fdad.appspot.com",
	messagingSenderId: "782324843865",
	appId: "1:782324843865:web:c8563d3db75400a59c3848"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const firebaseAuth = getAuth(firebaseApp);

// Initialize Cloud Firestore and get a reference to the service
export const firebaseDB = getFirestore(firebaseApp);