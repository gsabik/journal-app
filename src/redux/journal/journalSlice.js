import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isSaving: false,
	savedMessage: "",
	notes: [],
	active: null
}

export const journalSlice = createSlice({
	name: "journal",
	initialState,
	reducers: {
		addNote: (state, action) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},
		clearNotesOnLogout: (state) => {
			state.isSaving = false,
			state.savedMessage = "",
			state.notes = [],
			state.active = null
		},
		deleteNote: (state, action) => {
			state.active = null;
			state.notes = state.notes.filter(note => note.id !== action.payload);
		}, 
		readNote: (state, action) => {
			state.active = action.payload;
			state.savedMessage = "";
		},
		setNotes: (state, action) => {
			state.notes = action.payload;
		},
		setImagesToActiveNote: (state, action) => {
			state.active.imageUrls = [...state.active.imageUrls, ...action.payload];
			state.isSaving = false;
		},
		savingNote: (state) => {
			state.isSaving = true;
			state.savedMessage = "";
		},
		updateNote: (state, action) => {
			state.isSaving = false;
			state.notes = state.notes.map(note => {
				if (note.id === action.payload.id) {
					return action.payload;
				}

				return note;
			});

			state.savedMessage = `${action.payload.title} successfully updated!`

		}
	}
});

export const {
	addNote,
	clearNotesOnLogout,
	deleteNote,
	readNote,
	setNotes,
	setImagesToActiveNote,
	savingNote,
	updateNote,
} = journalSlice.actions;