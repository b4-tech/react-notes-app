import { combineReducers, configureStore } from "@reduxjs/toolkit";
import notesReducer from '../slices/notesSlice'
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./types";
import viewModeReducer from '../slices/viewModeSlice';
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/es/storage';

const reducers = {
	notes: notesReducer,
	viewMode: viewModeReducer
}

const rootReducer = combineReducers(reducers);

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
	reducer: persistedReducer,
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;