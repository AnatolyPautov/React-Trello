import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
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

export const selectColumns = (state: RootState) => state.columns;
export const selectCards = (state: RootState) => state.cards;
export const selectComments = (state: RootState) => state.comments;

export default store;
