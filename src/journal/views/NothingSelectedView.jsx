import { 
    Grid, 
    Stack, 
    Typography 
} from "@mui/material";
import { StarOutline } from "@mui/icons-material";

const NothingSelectedView = () => {
    return (
        <Grid
            alignItems="center"
            container
            direction="column"
            justifyContent="center"
            height="calc(100vh - 100px)"
        >
            <Stack
                direction="row"
                spacing={1}
            >
                <StarOutline fontSize="large"/>
                <Typography variant="h5" pt="2px">Select or create a note</Typography>
            </Stack>
        </Grid>
    )
}

export default NothingSelectedView