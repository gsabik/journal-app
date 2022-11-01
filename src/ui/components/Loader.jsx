import { 
	CircularProgress, 
	Grid, 
	Stack } from "@mui/material";

const Loader = () => {
    return (
        <Grid
            alignItems="center"
            container
            direction="column"
            height="100vh"
            justifyContent="center"
        >
            <Stack
                direction="column"
                justifyContent="center"
            >
                <CircularProgress/>
            </Stack>
        </Grid>
	);
}

export default Loader