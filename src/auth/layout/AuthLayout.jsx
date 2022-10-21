import { 
	Box, 
	Grid, 
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
            sx={{
                backgroundColor: "primary.main"
            }}
        >
            <Box
				className="animate__animated animate__fadeIn animate__faster"
                sx={{
                    padding: "1rem",
                    backgroundColor: "white",
                    width: "25rem"
                }}
            >
                <Typography 
                    variant="h5"
                    sx={{
                        pb: "1rem"
                    }}
                >{title}</Typography>
                { children }
            </Box>
        </Grid>
    );
}

export default AuthLayout