import React from 'react';
import styled from 'styled-components';
import CardModal from '../modal/CardModal';
import { ReactSVG } from 'react-svg';
import closeCross from './../../assets/icons/closeCross.svg';
import commentIcon from './../../assets/icons/comment.svg';
import * as Types from '../../types/types';

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

interface CardItemProps {
  textRef: any;
  column: Types.Column;
  card: Types.Card;
  removeCard(id: string | number): void;
  onChangeCardTitle(e: React.ChangeEvent<HTMLInputElement>, id: string): void;
  onChangeCardDesc(e: React.ChangeEvent<HTMLTextAreaElement>, id: string): void;
}
const CardItem: React.FC<CardItemProps> = ({
  textRef,
  column,
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
    const changedComments = comments.map((comment) => {
      if (comment.id === id) return { ...comment, text: e.target.value };
      return comment;
    });
    setComments(changedComments);
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
    <>
      <Card onClick={() => setModalActive(true)}>
        <CardDesc>{card.title}</CardDesc>
        {comments.length > 0 && (
          <IconContainer title="Коментарии">
            <ReactSVG src={commentIcon} />
            <span>{comments.length}</span>
          </IconContainer>
        )}
        <CloseСross onClick={() => removeCard(card.id)}>
          <span>
            <ReactSVG src={closeCross} />
          </span>
        </CloseСross>
      </Card>
      {modalActive && (
        <CardModal
          textRef={textRef}
          column={column}
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
    </>
  );
};

export default CardItem;
