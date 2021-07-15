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
