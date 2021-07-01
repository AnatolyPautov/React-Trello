import React from 'react';
import styled from 'styled-components';
import CardItem from '../card/CardItem';
import * as Types from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCard,
  updateNewCard,
  setColumnTitle,
  selectCards,
} from '../../store/store';

interface ColumnProps {
  column: Types.Column;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const cards = useSelector(selectCards);
  const dispatch = useDispatch();

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && column.newTextCard) {
      dispatch(
        addCard({
          newTextCard: column.newTextCard,
          columnId: column.id,
        })
      );
    }
  };

  return (
    <ColumnContainer>
      <TitleInput
        value={column.title}
        type="text"
        onChange={(e) =>
          dispatch(setColumnTitle({ event: e.target.value, id: column.id }))
        }
      />
      <CardsWrapper>
        {cards.map(
          (card: Types.Card) =>
            card.columnId === column.id && (
              <CardItem column={column} card={card} key={card.id} />
            )
        )}
      </CardsWrapper>
      <AreaInput
        value={column.newTextCard}
        type="text"
        placeholder="Введите текст"
        onChange={(e) =>
          dispatch(updateNewCard({ event: e.target.value, id: column.id }))
        }
        onKeyPress={keyPressHandler}
      />
      <button
        onClick={
          column.newTextCard
            ? () =>
                dispatch(
                  addCard({
                    newTextCard: column.newTextCard,
                    columnId: column.id,
                  })
                )
            : undefined
        }
      >
        Добавить карточку
      </button>
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
