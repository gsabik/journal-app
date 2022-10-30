import { collection, deleteDoc, doc, setDoc } from "firebase/firestore";
import { firebaseDB } from "../../firebase/config";
import { addNote, deleteNote, readNote, savingNote, setImagesToActiveNote, setNotes, updateNote } from "../journal/journalSlice";
import { loadNotes } from "../../helpers/loadNotes";
import { fileUpload } from "../../helpers/fileUpload";

export const startCreateNote = () => {
	return async(dispatch, getState) => {

		dispatch(savingNote());

		// getState return the current state tree of your application
		const { uid } = getState().auth;

		const newNote = {
			date: new Date().toLocaleString(),
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

		dispatch(addNote(newNote));

		dispatch(readNote(newNote));
	}
}

export const startLoadingNotes = () => {
	return async(dispatch, getState) => {

		// getState return the current state tree of your application
		const { uid } = getState().auth;
		const notes = await loadNotes(uid);

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

export const startUploadingFiles = (files = []) => {
	return async(dispatch) => {

		dispatch(savingNote());

		const fileUploadPromises = [];

		// For each file I will execute a promise
		for (const file of files) {
			fileUploadPromises.push(fileUpload(file));
		}

		// Return a single promise with the Promise.all method
		const imagesUrls = await Promise.all(fileUploadPromises);

		dispatch(setImagesToActiveNote(imagesUrls));
	}
}

export const startDeleteNote = () => {
	return async(dispatch, getState) => {

		const { uid } = getState().auth;
		const { active: activeNote } = getState().journal;
		
		// Get the reference to my note path and delete from firebase
		const referenceCollection = doc(firebaseDB, `${uid}/journal/notes/${activeNote.id}`);
		await deleteDoc(referenceCollection);

		dispatch(deleteNote(activeNote.id));
	}
}