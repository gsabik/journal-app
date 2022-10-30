import { useSelector } from "react-redux";
import { Box, Divider, Stack, Typography} from "@mui/material";
import NoteItem from "./NoteItem";

const NotesList = () => {
	const { notes } = useSelector(state => state.journal);

	return (
		<Box>
			<Typography 
				variant="h5"
			>Recent notes</Typography>
			<Stack
				direction="row"
				height="2rem"
				mt={1}
				spacing={2}
				width="full"
			>
				{
					notes.map(note => (
						<NoteItem
							{...note}
							key={note.id}
						/>
					))
				}
			</Stack>
			<Divider 
				component="div"
				role="presentation"
				sx={{
					py: 2
				}}
			/>
		</Box>
	);
}

export default NotesList