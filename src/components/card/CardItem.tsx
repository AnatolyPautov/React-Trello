import React from 'react';
import styled from 'styled-components';
import CardModal from '../modal/CardModal';
import { ReactSVG } from 'react-svg';
import closeCross from './../../assets/icons/closeCross.svg';
import * as Types from '../../types/types';

const Card = styled.div`
  background-color: white;
  margin-bottom: 5px;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  display: flex;
  justify-content: space-between;
  &: hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
const CardDesc = styled.div`
  overflow: hidden;
  width: 100%;
  padding: 5px 10px;
  cursor: pointer;
`;
const CloseСross = styled.div`
  cursor: pointer;
  padding: 5px 10px;
`;

interface CardItemProps {
  card: Types.Card;
  removeCard(id: string | number): void;
  onChangeCardTitle(e: React.ChangeEvent<HTMLInputElement>, id: string): void;
  onChangeCardDesc(e: React.ChangeEvent<HTMLTextAreaElement>, id: string): void;
}
const CardItem: React.FC<CardItemProps> = ({
  card,
  removeCard,
  onChangeCardTitle,
  onChangeCardDesc,
}) => {
  const [modalActive, setModalActive] = React.useState(false);
  const [comments, setComments] = React.useState<Types.Comment[]>([]);

  const onChangeComment = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newComment = comments.map((comment) => {
      if (comment.id === id) {
        comment.text = e.target.value;
      }
      return comment;
    });
    setComments(newComment);
  };
  const addComment = (commentInput: string) => {
    if (commentInput) {
      const newComment = {
        id: Math.random().toString(36).substring(2, 9),
        text: commentInput,
      };
      setComments([...comments, newComment]);
    }
  };
  const removeComment = (id: string) => {
    setComments(comments.filter((comment: Types.Comment) => comment.id !== id));
  };
  return (
    <Card>
      <CardDesc onClick={() => setModalActive(true)}>{card.title}</CardDesc>
      <CloseСross onClick={() => removeCard(card.id)}>
        <span>
          <ReactSVG src={closeCross} />
        </span>
      </CloseСross>
      {modalActive && (
        <CardModal
          setModalActive={setModalActive}
          card={card}
          onChangeCardTitle={onChangeCardTitle}
          onChangeCardDesc={onChangeCardDesc}
          addComment={addComment}
          comments={comments}
          onChangeComment={onChangeComment}
          removeComment={removeComment}
        />
      )}
    </Card>
  );
};

export default CardItem;
