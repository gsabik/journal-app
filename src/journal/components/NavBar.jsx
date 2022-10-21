import { 
    AppBar, 
    Button, 
    IconButton, 
    Stack, 
    Toolbar, 
    Typography 
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from "react-redux";
import { startLogout } from "../../redux/auth/thunks";

const NavBar = ({ drawerWidth }) => {

    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startLogout());
    }

    return (
        <AppBar
            position="fixed"
            sx={{
                width: {sm: `calc(100% - ${drawerWidth}px)`},
                ml: {sm: `${drawerWidth}px)`}
            }}
        >
            <Toolbar
                sx={{
                    justifyContent: "space-between"
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    spacing={2}
                >
                    <IconButton
                        color="inherit"
                        sx={{
                            display: {sm: "none"}
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6">Journal App</Typography>
                </Stack>
                <Stack>
                    <Button
                        color="error"
                        onClick={onLogout}
                        variant="outlined"
                    >Logout</Button>
                </Stack>
            </Toolbar>
        </AppBar>
    )
}

export default NavBar