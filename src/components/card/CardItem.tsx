import React from 'react';
import styled from 'styled-components';
import CardModal from '../modal/CardModal';
import { ReactSVG } from 'react-svg';
import closeCross from './../../assets/icons/closeCross.svg';
import commentIcon from './../../assets/icons/comment.svg';
import * as Types from '../../types/types';
import { removeCard } from '../../store/trelloSlice';
import { selectComments } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

interface CardItemProps {
  column: Types.Column;
  card: Types.Card;
}
const CardItem: React.FC<CardItemProps> = ({ column, card }) => {
  const [modalActive, setModalActive] = React.useState(false);

  const dispatch = useDispatch();
  const comments = useSelector(selectComments);
  const curComments = comments.filter((comment) => {
    return comment.cardId === card.id;
  });
  return (
    <>
      <Card onClick={() => setModalActive(true)}>
        <CardDesc>{card.title}</CardDesc>
        {curComments.length > 0 && (
          <IconContainer title="Коментарии">
            <ReactSVG src={commentIcon} />
            <span>{curComments.length}</span>
          </IconContainer>
        )}
        <CloseСross onClick={() => dispatch(removeCard(card.id))}>
          <span>
            <ReactSVG src={closeCross} />
          </span>
        </CloseСross>
      </Card>
      {modalActive && (
        <CardModal
          comments={comments}
          column={column}
          setModalActive={setModalActive}
          card={card}
        />
      )}
    </>
  );
};

const Card = styled.div`
  cursor: pointer;
  position: relative;
  background-color: white;
  margin-bottom: 5px;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  &: hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
const CardDesc = styled.div`
  box-sizing: border-box;
  overflow: hidden;
  width: 100%;
  padding: 5px 10px;
`;
const CloseСross = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  cursor: pointer;
  padding: 5px 10px;
`;
const IconContainer = styled.div`
  padding: 0 10px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  line-height: 0px;
  span {
    margin-left: 4px;
    font-size: 14px;
  }
`;

export default CardItem;
