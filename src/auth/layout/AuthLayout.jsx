import { 
	Grid, 
	Stack,
	Typography 
} from "@mui/material";

const AuthLayout = ({ children, title }) => {
    return (
        <Grid 
            alignItems="center"
            container
            direction="column"
            justifyContent="center"
            height="100vh"
        >
            <Stack
				boxShadow="0px 10px 30px 0px rgba(0,0,0,0.1)"
				className="animate__animated animate__fadeIn animate__faster"
				p={4}
				width="25rem"
            >
				<Typography 
					align="center"
					pb={2}
					variant="h6"
				>{title}</Typography>
				<Stack>
                	{ children }
				</Stack>
            </Stack>
        </Grid>
    );
}

export default AuthLayout