import {
	Button,
	Typography, 
} from "@mui/material";
import { useDispatch } from "react-redux";
import { readNote } from "../../redux/journal/journalSlice";

const NoteItem = ({ id, title, body, date, imageUrls = []}) => {
	const dispatch = useDispatch();

	const setActiveNote = () => {
		dispatch(readNote({ id, title, body, date, imageUrls }));
	}

	return (
		<Button
			key={id}
			onClick={setActiveNote}
			variant="outlined"
			sx={{
				border: 1,
				borderColor: "primary.main"
			}}
		>
			<Typography>{title.length === 0 ? "Untitled note" : title}</Typography>
		</Button>
	);
}

export default NoteItem