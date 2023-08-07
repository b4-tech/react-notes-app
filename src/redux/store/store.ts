import { configureStore } from "@reduxjs/toolkit";
import notesReducer from '../slices/notesSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./types";
import viewModeReducer from '../slices/viewModeSlice';

const store = configureStore({
	reducer: {
		notes: notesReducer,
		viewMode: viewModeReducer
	},
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;