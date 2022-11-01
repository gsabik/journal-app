import { useDispatch } from "react-redux";
import { startLogout } from "../../redux/auth/thunks";
import { 
	AppBar, 
    IconButton, 
    Stack, 
    Toolbar, 
    Typography 
} from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";

const NavBar = () => {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startLogout());
    }

    return (
        <AppBar position="fixed">
            <Toolbar
                sx={{
                    justifyContent: "space-between"
                }}
            >
				<Typography variant="h6">Journal App</Typography>
                <Stack>
                    <IconButton
						onClick={onLogout}
					>
						<LogoutOutlined
							sx={{
								color: "white",
							}}
						/>
					</IconButton>
                </Stack>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar