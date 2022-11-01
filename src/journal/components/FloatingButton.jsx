import { useDispatch, useSelector } from "react-redux";
import { startCreateNote } from "../../redux/journal/thunks";
import { IconButton } from "@mui/material";
import { AddOutlined } from "@mui/icons-material";

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
            sx={{
                bottom: 50,
                backgroundColor: "primary.main",
                color: "white",
                ":hover": {backgroundColor: "secondary.main" , opacity: 0.9},
                position: "fixed",
                right: 75
            }}
        >
            <AddOutlined/>
        </IconButton>
    );
}

export default FloatingButton