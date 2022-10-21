import {
	ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
    Stack
} from "@mui/material";
import { TurnedInNot } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { readNote } from "../../redux/journal/journalSlice";

const SideBarItem = ({ id, title, body, date, imageUrls = []}) => {
	const dispatch = useDispatch();

	const setActiveNote = () => {
		dispatch(readNote({ id, title, body, date, imageUrls }));
	}

	return (
		<ListItem 
			disablePadding
			key={id}
			onClick={setActiveNote} 
		>
			<ListItemButton>
				<ListItemIcon>
					<TurnedInNot/>
				</ListItemIcon>
				<Stack
					direction="column"
				>
					<ListItemText primary={title}/>
					<ListItemText secondary={body}/>
				</Stack>
			</ListItemButton>
		</ListItem>
	);
}

export default SideBarItem