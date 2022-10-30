import { 
    Box, Divider, Toolbar 
} from "@mui/material";
import { useSelector } from "react-redux";
import NotesList from "../components/ListNotes";
import NavBar from "../components/NavBar";

const JournalLayout = ({ children }) => {
	const { notes } = useSelector(state => state.journal);

    return (
        <Box
			className="animate__animated animate__fadeIn animate__faster" 
			sx={{
            	display: "flex"
        	}}
		>
            <NavBar/>
            <Box 
                component="main" 
                sx={{
					flexGrow: 1,
                    margin: 2,
                }}
				>
                <Toolbar/>
				{
					notes.length === 0
					?
					""
					:
					<NotesList/>

				}
                {children}
            </Box>
        </Box>
    );
}

export default JournalLayout