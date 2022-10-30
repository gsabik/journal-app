import {
	ListItem, 
    ListItemButton, 
    ListItemIcon, 
    ListItemText, 
} from "@mui/material";
import { useDispatch } from "react-redux";
import { Bookmark } from "@mui/icons-material";
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
			<ListItemButton alignItems="center">
				<ListItemIcon>
					<Bookmark/>
				</ListItemIcon>
				<ListItemText primary={title}/>
			</ListItemButton>
		</ListItem>
	);
}

export default SideBarItem