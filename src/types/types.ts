export type Column = {
  id: number;
  title: string;
};
export type Card = {
  id: string;
  title: string;
  description: string;
  columnId: number;
  author: string;
};
export type Comment = {
  id: string;
  text: string;
  cardId: string;
  author: string;
};
export type UserName = {
  firstName: string;
};
export type NewCard = {
  newTextCard: string;
  columnId: number;
  author: string;
};
export type ChangedCard = {
  id: string;
  filedName: string;
  event: string;
};
export type NewComment = {
  newComment: string;
  cardId: string;
  author: string;
};
export type ChangedComments = {
  id: string;
  text: string;
};
