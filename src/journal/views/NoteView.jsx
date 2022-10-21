import { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { 
	Alert,
	Grid, 
    IconButton, 
    Snackbar, 
    TextField, 
    Typography, 
} from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";

import { useForm } from "../../hooks/useForm";
import { readNote } from "../../redux/journal/journalSlice";
import { startOnSaveNote } from "../../redux/journal/thunks";
import ImageGallery from "../components/ImageGallery";

const NoteView = () => {
	const [savedMessageAlert, setSavedMessageAlert] = useState(null);

	const { active: activeNote, savedMessage, isSaving } = useSelector(state => state.journal);

	const dispatch = useDispatch();

	const { title, body, date, onInputChange, formState } = useForm(activeNote);

	const onSaveNote = () => {
		dispatch(startOnSaveNote());
	}

	const dateString = useMemo(() => {
		const newDate = new Date(date);
		return newDate.toUTCString();
	}, [date]);

	// If modify the fields of my note, i render my component
	useEffect(() => {
		dispatch(readNote(formState))
	}, [formState]); 

	// If modify a note, setSavedMessageAlert on true
	useEffect(() => {
		if (savedMessage.length > 0) {
			setSavedMessageAlert(true);
		}
	}, [savedMessage]);

    return (
        <>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
            >
                <Typography variant="h4">{dateString}</Typography>
                <IconButton
					disabled={isSaving}
					onClick={onSaveNote}
				>
                    <SaveOutlined fontSize="large"/>
                </IconButton>
                <TextField
                    fullWidth
                    label="Title"
					name="title"
					onChange={onInputChange}
                    sx={{
						mb: 2
                    }}
					value={title}
					variant="filled"
                />
                <TextField
                    fullWidth
                    label="What happened today?"
                    multiline
                    minRows={10}
					name="body"
					onChange={onInputChange}
					value={body}
                    variant="filled"
                />
            </Grid>
            <ImageGallery/>
			{
				savedMessageAlert 
				&& 
				<Snackbar
					autoHideDuration={3000}
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center"
					}}
					open={savedMessageAlert}
					onClose={() => setSavedMessageAlert(false)}
				>
					<Alert
						variant="filled"
					>{savedMessage}</Alert>
				</Snackbar>
			}
        </>
    );
}

export default NoteView