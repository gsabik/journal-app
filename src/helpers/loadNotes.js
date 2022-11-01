import { firebaseDB } from "../firebase/config";
import { collection, query, getDocs } from "firebase/firestore";

export const loadNotes = async(uid) => {
	// Get the reference to my notes path
	const docs = await getDocs(query(collection(firebaseDB, `${uid}/journal/notes`)));

	// Create an empty array to push the information obtained from my data() function
	const notes = [];

	docs.forEach(doc => {
		notes.push({id: doc.id, ...doc.data()});
	});

	return notes;
}