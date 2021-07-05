import React from 'react';
import styled from 'styled-components';
import Context from '../../context';
import { ReactSVG } from 'react-svg';
import closeCross from './../../assets/icons/closeCross.svg';
import * as Types from '../../types/types';
import Comment from './../comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import {
  addComment,
  updateNewComment,
  onChangeCard,
} from '../../store/trelloSlice';

interface ModalProps {
  comments: Types.Comment[];
  column: Types.Column;
  card: Types.Card;
  setModalActive(active: boolean): void;
}
const CardModal: React.FC<ModalProps> = (props) => {
  const textRef = React.useRef<any>();

  const { userName } = React.useContext(Context);

  const dispatch = useDispatch();

  const onCloseModal = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      props.setModalActive(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', onCloseModal);
  });

  const keyPressHandler = (
    event: React.KeyboardEvent,
    newTextComment: string,
    cardId: string
  ) => {
    if (event.key === 'Enter' && newTextComment) {
      dispatch(addComment({ newTextComment, cardId }));
    }
  };

  return (
    <Background onClick={() => props.setModalActive(false)}>
      <ModalWrapper>
        <Modal onClick={(e) => e.stopPropagation()}>
          <CloseСross onClick={() => props.setModalActive(false)}>
            <span>
              <ReactSVG src={closeCross} />
            </span>
          </CloseСross>
          <TitleInput
            onChange={(e) =>
              dispatch(
                onChangeCard({
                  id: props.card.id,
                  filedName: 'title',
                  event: e.target.value,
                })
              )
            }
            value={props.card.title}
            type="text"
          />
          <TitleDesc>
            <div> в колонке {props.column.title}</div>
            <div>Автор: {userName}</div>
          </TitleDesc>
          Описание:
          <DescInput
            ref={textRef}
            onChange={(e) => {
              dispatch(
                onChangeCard({
                  id: props.card.id,
                  filedName: 'description',
                  event: e.target.value,
                })
              );
              textRef.current.style.height = '0px';
              textRef.current.style.height = `${textRef.current.scrollHeight}px`;
            }}
            value={props.card.description}
            placeholder="Добавте более подробное описание..."
          />
          <CommentArea
            value={props.card.newTextComment}
            type="text"
            placeholder="Введите комментарий"
            onChange={(e) =>
              dispatch(
                updateNewComment({
                  newTextComment: e.target.value,
                  cardId: props.card.id,
                })
              )
            }
            onKeyPress={(e) =>
              keyPressHandler(e, props.card.newTextComment, props.card.id)
            }
          />
          {props.comments.map(
            (comment: Types.Comment) =>
              comment.cardId === props.card.id && (
                <Comment
                  key={comment.id}
                  comment={comment}
                  userName={userName}
                />
              )
          )}
        </Modal>
      </ModalWrapper>
    </Background>
  );
};

const Background = styled.div`
  position: fixed;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  overflow-y: auto;
  z-index: 99;
`;
const ModalWrapper = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  width: 100%;
  min-height: 100%;
  margin: auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
`;
const Modal = styled.div`
  box-sizing: border-box;
  width: 768px;
  margin: 50px 0;
  min-height: 500px;
  background-color: #ebecf0;
  border-radius: 10px;
  position: relative;
  padding: 15px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
const CloseСross = styled.div`
  position: absolute;
  content: '';
  top: 0;
  right: 0;
  width: 35px;
  height: 35px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;
  border-radius: 50%;
  margin: 10px 10px 0 0;
  &:hover {
    background-color: rgba(0, 0, 0, 0.15);
  }
`;
const TitleInput = styled.input`
  padding: 5px 5px;
  background: transparent;
  font-size: 18px;
  margin-right: 40px;
  outline: none;
  border-radius: 3px;
  border: 2px solid transparent;
  &:focus {
    background: white;
    border: 2px solid #5c3bfe;
  }
`;
const TitleDesc = styled.div`
  margin: 0 40px 10px 11px;
  color: #172b4d;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
`;
const DescInput = styled.textarea`
  background-color: rgba(9, 30, 66, 0.08);
  margin: 10px 0;
  font-size: 14px;
  min-height: 50px;
  resize: none;
  border: 2px solid transparent;
  outline: none;
  border-radius: 3px;
  padding: 5px 10px;
  &: focus {
    border: 2px solid #5c3bfe;
    background: white;
  }
`;
const CommentArea = styled.input`
  padding: 15px 10px;
  margin-bottom: 15px;
  border-radius: 3px;
  outline: none;
  border: none;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
`;

export default CardModal;
