import { 
    Grid, 
    Typography 
} from "@mui/material";

const NothingSelectedView = () => {
    return (
        <Grid
            alignItems="center"
            container
            direction="column"
            justifyContent="center"
            height="calc(100vh - 100px)"
        >
			<Typography 
				pt="2px"
				variant="h5" 
			>Select or create a note</Typography>
        </Grid>
    );
}

export default NothingSelectedView