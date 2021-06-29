import React from 'react';
import styled from 'styled-components';
import CardItem from '../card/CardItem';
import * as Types from '../../types/types';

interface ColumnProps {
  column: Types.Column;
  setColumnTitle(e: React.ChangeEvent<HTMLInputElement>, id: number): void;
}

const Column: React.FC<ColumnProps> = ({ column, setColumnTitle }) => {
  const [cards, setCards] = React.useState<Types.Card[]>([]);
  const [columnArea, setColumnArea] = React.useState<string>('');

  const onChangeArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnArea(e.target.value);
  };

  const addCard = () => {
    if (columnArea) {
      const newCard = {
        id: Math.random().toString(36).substring(2, 9),
        title: columnArea,
        description: '',
      };
      setCards([...cards, newCard]);
      setColumnArea('');
    }
  };

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      addCard();
    }
  };

  const removeCard = (id: string) => {
    setCards([...cards.filter((card: Types.Card) => card.id !== id)]);
  };

  const onChangeCard =
    (id: string, filedName: string) =>
    (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      const changedCard = cards.map((card) => {
        if (card.id === id) return { ...card, [filedName]: e.target.value };
        return card;
      });
      setCards(changedCard);
    };

  return (
    <ColumnContainer>
      <TitleInput
        value={column.title}
        type="text"
        onChange={(e) => setColumnTitle(e, column.id)}
      />
      <CardsWrapper>
        {cards.map((card: Types.Card) => (
          <CardItem
            removeCard={removeCard}
            column={column}
            card={card}
            key={card.id}
            onChangeCard={onChangeCard}
          />
        ))}
      </CardsWrapper>
      <AreaInput
        value={columnArea}
        type="text"
        placeholder="Введите текст"
        onChange={onChangeArea}
        onKeyPress={keyPressHandler}
      />
      <button onClick={addCard}>Добавить карточку</button>
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  background-color: #ebecf0;
  padding: 10px;
  border-radius: 3px;
  max-height: 500px;
  overflow-y: auto;
`;
const TitleInput = styled.input`
  outline: none;
  border: none;
  background: transparent;
  font-size: 18px;
  margin-bottom: 10px;
`;
const CardsWrapper = styled.div`
  overflow-y: auto;
`;
const AreaInput = styled.input`
  box-sizing: border-box;
  padding: 15px 10px;
  margin-bottom: 5px;
  border-radius: 3px;
  outline: none;
  border: none;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
`;

export default Column;
