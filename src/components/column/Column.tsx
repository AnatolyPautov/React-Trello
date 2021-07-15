import React from 'react';
import styled from 'styled-components';
import { ReactSVG } from 'react-svg';
import closeCross from './../../assets/icons/closeCross.svg';
import CardItem from '../card';
import * as Types from '../../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { addCard, updateColumnTitle } from '../../store/trelloSlice';
import { getCards } from '../../store/store';
import Context from '../../context';

interface ColumnProps {
  column: Types.Column;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  const [areaInputActive, setAreaInputActive] = React.useState<boolean>(false);
  const [newTextCard, setNewTextCard] = React.useState<string>('');

  const cards = useSelector(getCards);
  const dispatch = useDispatch();

  const { userName } = React.useContext(Context);

  const keyPressHandler = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && newTextCard) {
      dispatch(
        addCard({
          newTextCard: newTextCard,
          columnId: column.id,
          author: userName,
        })
      );
      setNewTextCard('');
    }
  };

  return (
    <ColumnContainer>
      <TitleInput
        value={column.title}
        type="text"
        onChange={(e) =>
          dispatch(updateColumnTitle({ event: e.target.value, id: column.id }))
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
      {!areaInputActive ? (
        <Button onClick={() => setAreaInputActive(true)}>
          Добавить карточку
        </Button>
      ) : (
        <div>
          <AreaInput
            value={newTextCard}
            type="text"
            placeholder="Введите текст"
            onChange={(e) => setNewTextCard(e.target.value)}
            onKeyPress={keyPressHandler}
          />
          <ButtonContainer>
            <ButtonActive
              onClick={
                newTextCard
                  ? () => {
                      dispatch(
                        addCard({
                          newTextCard: newTextCard,
                          columnId: column.id,
                          author: userName,
                        })
                      );
                      setNewTextCard('');
                    }
                  : undefined
              }
            >
              Добавить карточку
            </ButtonActive>
            <CloseAreaInput onClick={() => setAreaInputActive(false)}>
              <ReactSVG src={closeCross} />
            </CloseAreaInput>
          </ButtonContainer>
        </div>
      )}
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
  margin: 0 auto;
`;
const TitleInput = styled.input`
  outline: none;
  border: 2px solid transparent;
  background: transparent;
  font-size: 18px;
  margin-bottom: 10px;
  border-radius: 3px;
  padding: 3px;
  &:focus {
    background: white;
    border: 2px solid #5c3bfe;
  }
`;
const CardsWrapper = styled.div`
  overflow-y: auto;
`;
const AreaInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 15px 10px;
  border-radius: 3px;
  outline: none;
  border: none;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Button = styled.button`
  margin-top: 10px;
  cursor: pointer;
  padding: 5px;
  outline: none;
  border: none;
  opacity: 0.7;
  transition: 0.2s;
  border-radius: 3px;
  &:hover {
    background-color: #c3c4ca63;
    opacity: 1;
  }
`;
const ButtonActive = styled.button`
  margin-top: 10px;
  cursor: pointer;
  padding: 10px;
  outline: none;
  border: none;
  border-radius: 3px;
  color: white;
  background: #5c3bfe;
  &:hover {
    background: #442bc0;
  }
`;
const CloseAreaInput = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  margin: 8px 0 0 10px;
`;

export default Column;
