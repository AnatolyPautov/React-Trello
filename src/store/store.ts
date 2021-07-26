import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import trelloSlice from './trelloSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, trelloSlice);

const store = configureStore({
  reducer: persistedReducer,
});

type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const getColumns = (state: RootState) => state.columns;
export const getCards = (state: RootState) => state.cards;
export const getComments = (state: RootState) => state.comments;

export default store;
