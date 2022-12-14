import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startGoogleSignIn, startLoginWithUser } from "../../redux/auth/thunks";
import { 
	Alert, 
	Button, 
	Stack, 
	TextField, 
	Typography 
} from "@mui/material";
import { Google } from "@mui/icons-material";
import { useForm } from "../../hooks/useForm";
import AuthLayout from "../layout/AuthLayout";

const formData = {
	email: "",
	password: ""
}

const LoginPage = () => {
    const { email, password, onInputChange} = useForm(formData);

    const { status, errorMessage } = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const isAuthenticating = useMemo(() => status === "checking", [status]);

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
                    direction="column"
                    mb={2}
                    spacing={2}
                >
                    <TextField
                        label="Email"
                        name="email"
                        onChange={onInputChange}
                        type="email"
                        value={email}
                    />
                    <TextField
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
                <Stack
                    spacing={2}
                >
                    <Button
                        disabled={isAuthenticating}
                        fullWidth
                        type="submit"
                        variant="contained"
                    >Login</Button>
                    <Button
						startIcon={<Google/>}
                        disabled={isAuthenticating}
                        fullWidth
                        onClick={onGoogleSignIn}
                        variant="contained"
                    >Continue with Google</Button>
                </Stack>
            </form>
			<Stack
				direction="row"
				justifyContent="space-around"
				mt={2}
			>
				<Typography color="gray">Do you not have account?</Typography>
				<Link to="/auth/register">Create account</Link>
			</Stack>
        </AuthLayout>
    );
}

export default LoginPage