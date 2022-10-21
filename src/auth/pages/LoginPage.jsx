import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { startGoogleSignIn, startLoginWithUser } from "../../redux/auth/thunks";
import { useForm } from "../../hooks/useForm";
import AuthLayout from "../layout/AuthLayout";

const formData = {
	email: "",
	password: ""
}

const LoginPage = () => {
    const { email, password, onInputChange} = useForm(formData);

    const { status, errorMessage } = useSelector(state => state.auth);

    const isAuthenticating = useMemo(() => status === "checking", [status]);

    const dispatch = useDispatch();

    const onSubmit = e => {
        e.preventDefault();
        dispatch(startLoginWithUser({email, password}));
    }

    const onGoogleSignIn = () => {
        dispatch(startGoogleSignIn());
    }

    return (
        <AuthLayout title="Sign in">
            <form
				onSubmit={onSubmit}
			>
                <Stack
                    mb={2}
                    direction="column"
                    spacing={2}
                >
                    <TextField
                        label="Email"
                        name="email"
                        onChange={onInputChange}
                        type="email"
                        value={email}
                        variant="filled"
                    />
                    <TextField
                        label="Password"
                        name="password"
                        onChange={onInputChange}
                        type="password"
                        value={password}
                        variant="filled"
                    />
                </Stack>
                <Stack
                    display={!!errorMessage ? "" : "none"}
                    my={2}
                >
                    <Alert severity="error">{errorMessage}</Alert>
                </Stack>
                <Stack
                    justifyContent="space-around"
                    spacing={2}
                    direction="row"
                >
                    <Button
                        disabled={isAuthenticating}
                        fullWidth
                        type="submit"
                        variant="contained"
                    >Login</Button>
                    <Button
                        disabled={isAuthenticating}
                        fullWidth
                        onClick={onGoogleSignIn}
                        variant="contained"
                    >Google</Button>
                </Stack>
                <Stack
                    direction="row"
                    justifyContent="flex-end"
                    mt={2}
                >
                    <Link to="/auth/register">Create account</Link>
                </Stack>
            </form>
        </AuthLayout>
    );
}

export default LoginPage