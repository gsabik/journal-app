import { signInWithGoogle, registerUser, loginWithUser, logoutFirebase } from "../../firebase/providers";
import { checkingCredentials, logout, login } from "./authSlice";
import { clearNotesOnLogout } from "../journal/journalSlice";

export const checkingAuthentication = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
    };
}

export const startGoogleSignIn = () => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));
        dispatch(login(result));
    };
}

export const startRegisterUser = ({ displayName, email, password }) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        // Register user with email and password
        const result = await registerUser({displayName, email, password});
        if (!result.ok) return dispatch(logout(result.errorMessage));
        dispatch(login(result));
    };
}

export const startLoginWithUser = ({ email, password }) => {
    return async(dispatch) => {
        dispatch(checkingCredentials());
        // Login with user registered
        const result = await loginWithUser({email, password});
        if (!result.ok) return dispatch(logout(result))
        dispatch(login(result));
    };
}

export const startLogout = () => {
    return async(dispatch) => {
        await logoutFirebase();
		dispatch(clearNotesOnLogout());
        dispatch(logout({}));
    };
}