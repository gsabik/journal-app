import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
	Alert,
	Grid, 
    IconButton, 
    Snackbar, 
    Stack, 
    TextField, 
    Typography, 
} from "@mui/material";
import { Delete, Save, Upload } from "@mui/icons-material";
import { useForm } from "../../hooks/useForm";
import { readNote } from "../../redux/journal/journalSlice";
import { startOnSaveNote, startUploadingFiles, startDeleteNote } from "../../redux/journal/thunks";
import ImageGallery from "../components/ImageGallery";

const NoteView = () => {
	const [savedMessageAlert, setSavedMessageAlert] = useState(null);

	const { active: activeNote, savedMessage, isSaving } = useSelector(state => state.journal);

	const dispatch = useDispatch();

	const { title, body, date, onInputChange, formState } = useForm(activeNote);

	const onSaveNote = () => {
		dispatch(startOnSaveNote());
	}

	const onFileInputChange = ({ target }) => {
		if (target.files === 0) return;

		dispatch(startUploadingFiles(target.files));
	}

	const onDeleteNote = () => {
		dispatch(startDeleteNote());
	}

	// Ref to my input type file
	const fileInputRef = useRef();

	// If modify a note, render my component
	useEffect(() => {
		dispatch(readNote(formState));
	}, [formState]); 

	// If modify a note, setSavedMessageAlert on true
	useEffect(() => {
		if (savedMessage.length > 0) {
			setSavedMessageAlert(true);
		}
	}, [savedMessage]);

    return (
		<Grid
			container
			direction="column"
			mt={4}
		>
			<Stack
				direction="row"
				justifyContent="space-between"
			>
				<Typography variant="h6">{date}</Typography>
				<Stack
					direction="row"
				>
					<input
						multiple
						onChange={onFileInputChange}
						type="file"
						ref={fileInputRef}
						style={{
							display: "none"
						}}
					/>
					<IconButton
						onClick={() => fileInputRef.current.click()}
					>
						<Upload/>
					</IconButton>
					<IconButton
						onClick={onDeleteNote}
					>
						<Delete/>
					</IconButton>
					<IconButton
						disabled={isSaving}
						onClick={onSaveNote}
					>
						<Save/>
					</IconButton>
				</Stack>
			</Stack>
			<Stack
				spacing={2}
			>
				<TextField
					fullWidth
					label="Title"
					name="title"
					onChange={onInputChange}
					value={title}
				/>
				<TextField
					fullWidth
					label="What happened today?"
					multiline
					minRows={10}
					name="body"
					onChange={onInputChange}
					value={body}
				/>
			</Stack>
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
		</Grid>
    );
}

export default NoteView