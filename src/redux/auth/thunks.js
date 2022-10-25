import { signInWithGoogle, registerUser, loginWithUser, logoutFirebase } from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./authSlice";
import { clearNotesOnLogout } from "../journal/journalSlice";

export const checkingAuthentication = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        // Checking credentials
        dispatch(checkingCredentials());
        // Sign in with Google
        const result = await signInWithGoogle();
        // Sign in with Google error
        if (!result.ok) return dispatch(logout(result.errorMessage));
        // Sign in with Google ok
        dispatch(login(result));
    }
}

export const startRegisterUser = ({ displayName, email, password }) => {
    return async(dispatch) => {
        // Checking credentials
        dispatch(checkingCredentials());
        // Register user with email and password
        const result = await registerUser({displayName, email, password});
        // Register error
        if (!result.ok) return dispatch(logout(result.errorMessage));
        // Register user ok
        dispatch(login(result));
    }
}

export const startLoginWithUser = ({ email, password }) => {
    return async(dispatch) => {
        //Checking credentials
        dispatch(checkingCredentials());
        // Login with user registeres
        const result = await loginWithUser({email, password});
        // Login succes error
        if (!result.ok) return dispatch(logout(result))
        //
        dispatch(login(result));
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
		dispatch(clearNotesOnLogout());
        dispatch(logout({}));
    }
}