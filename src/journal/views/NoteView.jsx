import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { readNote } from "../../redux/journal/journalSlice";
import { startOnSaveNote, startUploadingFiles, startDeleteNote } from "../../redux/journal/thunks";
import { 
	Alert,
	Grid, 
    IconButton, 
    Snackbar, 
    Stack, 
    TextField, 
    Typography, 
} from "@mui/material";
import { 
	DeleteOutlined, 
	SaveOutlined, 
	FileUploadOutlined 
} from "@mui/icons-material";
import { useForm } from "../../hooks/useForm";
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
				className="animate__animated animate__fadeIn animate__faster"
				direction="row"
				justifyContent="space-between"
				pb={2}
			>
				<Typography variant="h6">{date}</Typography>
				<Stack direction="row">
					<input
						multiple
						onChange={onFileInputChange}
						ref={fileInputRef}
						style={{
							display: "none"
						}}
						type="file"
					/>
					<IconButton
						disabled={isSaving}
						onClick={() => fileInputRef.current.click()}
					>
						<FileUploadOutlined/>
					</IconButton>
					<IconButton
						disabled={isSaving}
						onClick={onDeleteNote}
					>
						<DeleteOutlined/>
					</IconButton>
					<IconButton
						disabled={isSaving}
						onClick={onSaveNote}
					>
						<SaveOutlined/>
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
			<Stack py={2}>
				<Typography variant="body2" fontWeight={500}>*Before leaving the application or creating, modifying or selecting another note, remember to save it.</Typography>
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
						severity="info"
						variant="filled"
					>{savedMessage}</Alert>
				</Snackbar>
			}
		</Grid>
    );
}

export default NoteView