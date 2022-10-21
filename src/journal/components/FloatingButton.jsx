import { 
    IconButton 
} from "@mui/material";
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startCreateNote } from "../../redux/journal/thunks";

const FloatingButton = () => {
	const { isSaving } = useSelector(state => state.journal);

	const dispatch = useDispatch();
	 
	const createNote = () => {
		dispatch(startCreateNote());
	}

    return (
        <IconButton
			disabled={isSaving}
			onClick={createNote}
            size="large"
            sx={{
                color: "white",
                backgroundColor: "primary.main",
                ":hover": {backgroundColor: "secondary.main" , opacity: 0.9},
                position: "fixed",
                bottom: 50,
                right: 50
            }}
        >
            <AddOutlined/>
        </IconButton>
    );
}

export default FloatingButton