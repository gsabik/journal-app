import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { firebaseAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../redux/auth/authSlice";
import { startLoadingNotes } from "../redux/journal/thunks";

export const useCheckAuth = () => {
    const { status } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, async(user) => {
            if (!user) return dispatch(logout());
            
            const { uid, displayName, email, photoURL } = user;
            dispatch(login({uid, displayName, email, photoURL}));
            dispatch(startLoadingNotes());
        });
    }, []);

    return status;
}