export type Column = {
  id: number;
  title: string;
  newTextCard: string;
};
export type Card = {
  id: string;
  title: string;
  description: string;
  columnId: number;
  newTextComment: string;
};
export type Comment = {
  id: string;
  text: string;
  cardId: string;
};
