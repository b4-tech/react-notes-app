import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note, NotesState } from '../../models/models';
import Notes from '../../data/Notes';
import Categories from '../../data/Categories';

const initialState: NotesState = {
	notes: Notes,
	categories: Categories,
};

const notesSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		addNote: (state, action: PayloadAction<Note>) => {
			state.notes.push(action.payload);
		},
		editNote: (state, action: PayloadAction<Note>) => {
			const idx = state.notes.findIndex((note) => note.id === action.payload.id);
			if (idx !== -1) {
				state.notes[idx] = action.payload;
			}
		},
		removeNote: (state, action: PayloadAction<number>) => {
			state.notes = state.notes.filter((note) => note.id !== action.payload);
		},
		archiveNote: (state, action: PayloadAction<number>) => {
			const noteToArchive = state.notes.find((note) => note.id === action.payload);
			if (noteToArchive) noteToArchive.active = false;
		},
		unarchiveNote: (state, action: PayloadAction<number>) => {
			const noteToUnarchive = state.notes.find((note) => note.id === action.payload);
			if (noteToUnarchive) noteToUnarchive.active = true;
		},
	},
});

export const { addNote, editNote, removeNote, archiveNote, unarchiveNote } = notesSlice.actions;

export default notesSlice.reducer

