import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Alert, 
    Button, 
    Stack, 
    TextField, 
    Typography 
} from "@mui/material";
import { useForm } from "../../hooks/useForm";
import { startRegisterUser } from "../../redux/auth/thunks";
import AuthLayout from "../layout/AuthLayout";

// Defining initialForm
const initialForm = {
    displayName:  "",
    email: "",
    password: ""
}

// Properties with their respective validation and error message
const formValidations = {
    displayName: [value => value.length >= 6, "Must be more than 6 characters."],
    email: [value => value.includes("@") && value.includes(".com"), "Enter a valid email."],
    password: [value => value.length >= 6, "Must be more than 6 characters."],
}

const RegisterPage = () => {
    const [formSubmitted, setFormSubmitted] = useState(false);

    const dispatch = useDispatch();

    const { status, errorMessage } = useSelector(state =>  state.auth);

    const isAuthenticating = useMemo(() => status === "checking", [status]);

    const { 
        displayName, 
        email, 
        password, 
        onInputChange, 
        formState,
        isFormValid, 
        displayNameValid, 
        emailValid,
        passwordValid 
    } = useForm(initialForm, formValidations);

    const onSubmit = e => {
        e.preventDefault();
        setFormSubmitted(true);
        if (!isFormValid) return;
        dispatch(startRegisterUser(formState));
    }

    return (
        <AuthLayout title="Create account">
            <form 
				onSubmit={onSubmit}
			>
                <Stack spacing={2}>
                    <TextField
                        error={!!displayNameValid && formSubmitted}
						helperText={displayNameValid}
                        label="Full Name"
                        name="displayName"
                        onChange={onInputChange}
                        value={displayName}
                    />
                    <TextField
                        error={!!emailValid && formSubmitted}
                        helperText={emailValid}
                        label="Email"
                        name="email"
                        onChange={onInputChange}
                        value={email}
                    />
                    <TextField
                        error={!!passwordValid && formSubmitted}
                        helperText={passwordValid}
                        label="Password"
                        name="password"
                        onChange={onInputChange}
                        type="password"
                        value={password}
                    />
                </Stack>
                <Stack
                    display={!!errorMessage ? "" : "none"}
                    my={2}
                >
                    <Alert severity="error">{errorMessage}</Alert>
                </Stack>
                <Stack mt={2}>
                    <Button
                        disabled={isAuthenticating}
                        type="submit"
                        variant="contained"
                    >Create account</Button>
                </Stack>
            </form>
            <Stack
                mt={2}
                direction="row"
                justifyContent="space-around"
            >
                <Typography color="gray">Do you have account?</Typography>
                <Link to="/auth/login">Sign in</Link>
            </Stack>
        </AuthLayout>
    )
}

export default RegisterPage