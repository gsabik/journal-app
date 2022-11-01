import { useSelector } from "react-redux";
import { 
    Box,
	Toolbar 
} from "@mui/material";
import NavBar from "../components/NavBar";
import NotesList from "../components/NotesList";

const JournalLayout = ({ children }) => {
	const { notes } = useSelector(state => state.journal);

    return (
        <Box
			className="animate__animated animate__fadeIn animate__faster" 
			sx={{
            	display: "flex",
				flexDirection:"column"
        	}}
		>
            <NavBar/>
            <Box 
                component="main" 
                sx={{
					flexGrow: 1,
                    margin: 4,
                }}
			>
                <Toolbar/>
				{
					notes.length >= 1
					&&
					<NotesList/>
				}
                {children}
            </Box>
        </Box>
    );
}

export default JournalLayout