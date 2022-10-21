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
		// Set active note
		readNote: (state, action) => {
			state.active = action.payload;
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

			// Update message
			state.savedMessage = `${action.payload.title} successfully updated!`

		},
		deleteNote: (state, action) => {

		}, 
		setNotes: (state, action) => {
			state.notes = action.payload;
		},
		savingNote: (state) => {
			state.isSaving = true;
			state.savedMessage = "";
		}
	}
});

export const {
	addNote,
	readNote,
	updateNote,
	deleteNote,
	setNotes,
	savingNote
} = journalSlice.actions;