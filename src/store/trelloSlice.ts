import { createSlice } from '@reduxjs/toolkit';
import * as Types from '../types/types';

interface CardsSliceState {
  columns: Types.Column[];
  cards: Types.Card[];
  comments: Types.Comment[];
}

const initialState: CardsSliceState = {
  columns: [
    { id: 0, title: 'TO DO', newTextCard: '' },
    { id: 1, title: 'In Progress', newTextCard: '' },
    { id: 2, title: 'Testing', newTextCard: '' },
    { id: 3, title: 'Done', newTextCard: '' },
  ],
  cards: [],
  comments: [],
};

export const trelloSlice = createSlice({
  name: 'trello',
  initialState,
  reducers: {
    setColumnTitle(state, { payload }) {
      const newTitle = state.columns.map((column) => {
        if (column.id === payload.id)
          return { ...column, title: payload.event };
        return column;
      });
      state.columns = newTitle;
    },
    addCard(state, { payload }) {
      const newCard = {
        id: Math.random().toString(36).substring(2, 9),
        title: payload.newTextCard,
        description: '',
        columnId: payload.columnId,
        newTextComment: '',
      };
      state.cards.push(newCard);
      state.columns[payload.columnId].newTextCard = '';
    },
    updateNewCard(state, { payload }) {
      state.columns[payload.id].newTextCard = payload.event;
    },
    removeCard(state, { payload }) {
      state.cards = [
        ...state.cards.filter((card: Types.Card) => card.id !== payload),
      ];
    },
    onChangeCard(state, { payload }) {
      const changedCard = state.cards.map((card) => {
        if (card.id === payload.id)
          return { ...card, [payload.filedName]: payload.event };
        return card;
      });
      state.cards = changedCard;
    },
    addComment(state, { payload }) {
      const newComment = {
        id: Math.random().toString(36).substring(2, 9),
        text: payload.newTextComment,
        cardId: payload.cardId,
      };
      state.comments.push(newComment);
      state.cards.map((card) => {
        if (card.id === payload.cardId) {
          card.newTextComment = '';
        }
      });
    },
    updateNewComment(state, { payload }) {
      state.cards.map((card) => {
        if (card.id === payload.cardId) {
          card.newTextComment = payload.newTextComment;
        }
      });
    },
    removeComment(state, { payload }) {
      state.comments = [
        ...state.comments.filter(
          (comment: Types.Comment) => comment.id !== payload
        ),
      ];
    },
    onChangeComment(state, { payload }) {
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
  setColumnTitle,
  addCard,
  updateNewCard,
  removeCard,
  onChangeCard,
  addComment,
  updateNewComment,
  removeComment,
  onChangeComment,
} = trelloSlice.actions;

export default trelloSlice.reducer;
