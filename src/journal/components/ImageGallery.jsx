import { useSelector } from "react-redux";
import {
    Box,
    ImageList, 
    ImageListItem,
} from "@mui/material";

const ImageGallery = () => {
	const { imageUrls } = useSelector(state => state.journal.active);

	return (
			<Box>
				{
					imageUrls?.length >= 1
					&&
					<ImageList 
						cols={4}
						sx={{
							overflowY: "scroll"
						}}
						variant="masonry" 
					>
						{
							imageUrls.map((image) => (
								<ImageListItem key={image}>
									<img
										alt={image}
										src={`${image}?w=248&fit=crop&auto=format`}
										srcSet={`${image}?w=248&fit=crop&auto=format&dpr=2 2x`}
										loading="lazy"
									/>
								</ImageListItem>
							))
						}
					</ImageList>
				}
			</Box>
	);
}

export default ImageGallery