import React from 'react';
import styled from 'styled-components';
import CardItem from '../card/CardItem';
import * as Types from '../../types/types';

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
const ItemWrapper = styled.div`
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

interface ColumnProps {
  column: Types.Column;
  setColumnTitle(e: React.ChangeEvent<HTMLInputElement>, id: number): void;
}

const Column: React.FC<ColumnProps> = ({ column, setColumnTitle }) => {
  const [cards, setCards] = React.useState<Types.Card[]>([]);
  const [columnArea, setColumnArea] = React.useState<string>('');
  const textRef = React.useRef<any>();

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
  const onChangeCardTitle = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newCardTitle = cards.map((card) => {
      if (card.id === id) return { ...card, title: e.target.value };
      return card;
    });
    setCards(newCardTitle);
  };
  const onChangeCardDesc = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    id: string
  ) => {
    const newCardDesc = cards.map((card) => {
      if (card.id === id) return { ...card, description: e.target.value };
      return card;
    });
    setCards(newCardDesc);
    console.log(textRef);
    textRef.current.style.height = '0px';
    textRef.current.style.height = `${textRef.current.scrollHeight}px`;
  };

  return (
    <ColumnContainer>
      <TitleInput
        value={column.title}
        type="text"
        onChange={(e) => setColumnTitle(e, column.id)}
      />
      <ItemWrapper>
        {cards.map((card: Types.Card) => (
          <CardItem
            removeCard={removeCard}
            column={column}
            card={card}
            key={card.id}
            onChangeCardTitle={onChangeCardTitle}
            onChangeCardDesc={onChangeCardDesc}
            textRef={textRef}
          />
        ))}
      </ItemWrapper>
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

export default Column;
