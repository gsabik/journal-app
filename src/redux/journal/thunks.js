import { collection, doc, setDoc } from "firebase/firestore";
import { firebaseDB } from "../../firebase/config";

import { loadNotes } from "../../helpers/loadNotes";
import { addNote, readNote, savingNote, setNotes, updateNote } from "../journal/journalSlice";

export const startCreateNote = () => {
	return async(dispatch, getState) => {
		dispatch(savingNote());

		// getState return the current state tree of your application
		const { uid } = getState().auth;

		const newNote = {
			date: new Date().getTime(),
			title: "",
			body: "",
		}

		// Create a collection. For each user, I create a new collection
		const newDoc = doc(collection(firebaseDB, `${uid}/journal/notes`));

		// Create or replace a single document
		// setDoc receives the reference to the document, and the information I want to save
		await setDoc(newDoc, newNote);

		// Create propierty ID
		newNote.id = newDoc.id;

		// Add newNote to notes array
		dispatch(addNote(newNote));
		// Visualize newNote
		dispatch(readNote(newNote));
	}
}

export const startLoadingNotes = () => {
	return async(dispatch, getState) => {
		// getState return the current state tree of your application
		const { uid } = getState().auth;
		const notes = await loadNotes(uid);

		//
		dispatch(setNotes(notes));
	}
}

export const startOnSaveNote = () => {
	return async(dispatch, getState) => {
		dispatch(savingNote());

		// getState return the current state tree of your application
		const { uid } = getState().auth;
		const { active: activeNote } = getState().journal;

		// Access and delete the id of the note to update 
		const noteToFirestore = {...activeNote};
		// Using the delete operator
		delete noteToFirestore.id;  

		// Get the reference to my notes path, and update the note selected
		const referenceCollection = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
		await setDoc(referenceCollection, noteToFirestore);

		// Update my local notes, not my firebase notes
		dispatch(updateNote(activeNote));
	}
}