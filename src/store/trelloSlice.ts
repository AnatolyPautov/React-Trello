import { IdCenerator } from './../utils/IdGenerator';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as Types from '../types/types';

interface CardsSliceState {
  columns: Types.Column[];
  cards: Types.Card[];
  comments: Types.Comment[];
}

const initialState: CardsSliceState = {
  columns: [
    { id: 0, title: 'TO DO' },
    { id: 1, title: 'In Progress' },
    { id: 2, title: 'Testing' },
    { id: 3, title: 'Done' },
  ],
  cards: [],
  comments: [],
};

export const trelloSlice = createSlice({
  name: 'trello',
  initialState,
  reducers: {
    updateColumnTitle(state, { payload }: PayloadAction<Types.Column>) {
      const newTitle = state.columns.map((column) => {
        if (column.id === payload.id)
          return { ...column, title: payload.title };
        return column;
      });
      state.columns = newTitle;
    },
    addCard(state, { payload }: PayloadAction<Types.NewCard>) {
      const newCard = {
        id: IdCenerator(),
        title: payload.newTextCard,
        description: '',
        columnId: payload.columnId,
        author: payload.author,
      };
      state.cards.push(newCard);
    },
    removeCard(state, { payload }: PayloadAction<string>) {
      state.cards = [...state.cards.filter((card) => card.id !== payload)];
    },
    onChangeCard(state, { payload }: PayloadAction<Types.ChangedCard>) {
      const changedCard = state.cards.map((card) => {
        if (card.id === payload.id)
          return { ...card, [payload.filedName]: payload.event };
        return card;
      });
      state.cards = changedCard;
    },
    addComment(state, { payload }: PayloadAction<Types.NewComment>) {
      const newComment = {
        id: IdCenerator(),
        text: payload.newComment,
        cardId: payload.cardId,
        author: payload.author,
      };
      state.comments.push(newComment);
    },
    removeComment(state, { payload }: PayloadAction<string>) {
      state.comments = [
        ...state.comments.filter(
          (comment: Types.Comment) => comment.id !== payload
        ),
      ];
    },
    onChangeComment(state, { payload }: PayloadAction<Types.ChangedComments>) {
      const changedComments = state.comments.map((comment) => {
        if (comment.id === payload.id)
          return { ...comment, text: payload.text };
        return comment;
      });
      state.comments = changedComments;
    },
  },
});

export const {
  updateColumnTitle,
  addCard,
  removeCard,
  onChangeCard,
  addComment,
  removeComment,
  onChangeComment,
} = trelloSlice.actions;

export default trelloSlice.reducer;
