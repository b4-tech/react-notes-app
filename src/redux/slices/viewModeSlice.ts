import { createSlice } from '@reduxjs/toolkit';

export const viewModeSlice = createSlice({
	name: 'viewMode',
	initialState: 'active',
	reducers: {
		setActive: () => 'active',
		setArchived: () => 'archived'
	}
});

export const { setActive, setArchived } = viewModeSlice.actions;
export default viewModeSlice.reducer;
