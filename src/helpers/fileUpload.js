export const fileUpload = async(file) => {
	if (!file) throw new Error("We don't have any file to upload");

	// Cloudinary upload URL
	const BASE_URL = "https://api.cloudinary.com/v1_1/projects-react/upload";

	// Body params
	const formData = new FormData();
	formData.append("upload_preset", "journal-app");
	formData.append("file", file);

	try {
		const response = await fetch(BASE_URL, {
			method: "POST",
			body: formData
		});

		const cloudResponse = await response.json();
		return cloudResponse.secure_url;

	} catch (error) {
		throw new Error(error.message);
	}
}