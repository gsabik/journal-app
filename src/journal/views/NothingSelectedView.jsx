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
			height="85vh"
            justifyContent="center"
        >
			<Typography variant="h6">Select or create a note</Typography>
        </Grid>
    );
}

export default NothingSelectedView