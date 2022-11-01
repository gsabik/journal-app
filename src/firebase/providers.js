import { firebaseAuth } from "./config";
import { 
    createUserWithEmailAndPassword,
    GoogleAuthProvider, 
    signInWithPopup, 
    signInWithEmailAndPassword,
    updateProfile
} from "firebase/auth";

// Create an instance of the Google provider object
const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        // Sign in with their Google Accounts either by opening a pop-up window
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName, 
            email, 
            photoURL, 
            uid
        };
        
    } catch (error) {
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        };

    }

}

export const registerUser = async({ displayName, email, password }) => {
    try {
        const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, photoURL } = result.user;
        // Update displayName
        await updateProfile(firebaseAuth.currentUser, {displayName});

        return {
            ok: true, 
            uid,
            photoURL, 
            email, 
            displayName
        };

    } catch (error) {
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        };
    }
}

export const loginWithUser = async({ email, password }) => {
    try {
        const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const { uid, photoURL, displayName } = result.user;

        return {
            ok: true, 
            uid,
            photoURL, 
            displayName
        };

    } catch (error) {
        const errorMessage = error.message;
        
        return {
            ok: false,
            errorMessage
        };
    }
}

export const logoutFirebase = async() => {
    return firebaseAuth.signOut();
}