import { createSelector } from 'reselect';
import { RootState } from './types';

export const selectNotes = (state: RootState) => state.notes.notes;
export const selectViewMode = (state: RootState) => state.viewMode;
export const selectCategories = (state: RootState) => state.notes.categories;

export const selectNotesToDisplay = createSelector(
	[selectNotes, selectViewMode],
	(allNotes, viewMode) => {
		return viewMode === 'active'
			? allNotes.filter(note => note.active)
			: allNotes.filter(note => !note.active);
	}
);

export const selectSummary = createSelector(
	[selectNotes, selectCategories],
	(notes, categories) => {
		return categories.map(category => {
			const activeCount = notes.filter(note => note.category === category.id && note.active).length;
			const archivedCount = notes.filter(note => note.category === category.id && !note.active).length;
			return { ...category, active: activeCount, archived: archivedCount };
		});
	}
);