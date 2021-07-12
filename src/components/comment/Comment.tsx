import React from 'react';
import styled from 'styled-components';
import * as Types from '../../types/types';
import { removeComment, onChangeComment } from '../../store/trelloSlice';
import { useDispatch } from 'react-redux';
import Context from '../../context';

interface CommentProps {
  comment: Types.Comment;
}
const Comment: React.FC<CommentProps> = ({ comment }) => {
  const [commentActive, setCommentActive] = React.useState<boolean>(false);

  const textRef = React.useRef<any>();

  const dispatch = useDispatch();

  const { userName } = React.useContext(Context);

  const changeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (userName === comment.author || userName === 'admin') {
      dispatch(onChangeComment({ text: e.target.value, id: comment.id }));
    }
  };
  return (
    <Container>
      <FirstNameLetter>
        <div>{comment.author[0]}</div>
      </FirstNameLetter>
      <div>
        <div>{comment.author}</div>
        {!commentActive ? (
          <div>
            <Text>{comment.text}</Text>
            {(userName === comment.author || userName === 'admin') && (
              <div>
                <ChangeBtn onClick={() => setCommentActive(true)}>
                  Изменить
                </ChangeBtn>
                <DeleteBtn onClick={() => dispatch(removeComment(comment.id))}>
                  Удалить
                </DeleteBtn>
              </div>
            )}
          </div>
        ) : (
          <TextEditableContainer>
            <TextEditable
              ref={textRef}
              value={comment.text}
              onChange={(e) => {
                changeComment(e);
                textRef.current.style.height = '0px';
                textRef.current.style.height = `${textRef.current.scrollHeight}px`;
              }}
            />
            <button onClick={() => setCommentActive(false)}>Сохранить</button>
          </TextEditableContainer>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;
const FirstNameLetter = styled.div`
  flex-shrink: 0;
  background-color: rgba(0, 0, 0, 0.15);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  line-height: 0;
  cursor: default;
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;
const Text = styled.p`
  margin-top: 5px;
  background-color: white;
  border-radius: 5px;
  padding: 7px 10px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  outline: none;
  border: none;
  word-break: break-all;
`;
const TextEditableContainer = styled.div`
  width: 100%;
  margin-top: 5px;
  background-color: white;
  border-radius: 5px;
  padding: 7px 10px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  outline: none;
  border: none;
`;
const TextEditable = styled.textarea`
  width: 100%;
  display: block;
  border: none;
  outline: none;
  resize: none;
`;
const DeleteBtn = styled.button`
  outline: none;
  border: none;
  color: #5e6c84;
  cursor: pointer;
  &:hover {
    color: #262930;
  }
`;
const ChangeBtn = styled.button`
  outline: none;
  border: none;
  color: #5e6c84;
  cursor: pointer;
  &:hover {
    color: #262930;
  }
`;

export default Comment;
