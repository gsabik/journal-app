import { useDispatch } from "react-redux";
import { readNote } from "../../redux/journal/journalSlice";
import { Button } from "@mui/material";

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
				borderColor: "primary.main"
			}}
		>
			{title.length === 0 ? "Untitled note" : title}
		</Button>
	);
}

export default NoteItem