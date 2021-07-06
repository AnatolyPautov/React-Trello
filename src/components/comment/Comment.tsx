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
  const dispatch = useDispatch();

  const { userName } = React.useContext(Context);

  const changeComment = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        <Text type="text" value={comment.text} onChange={changeComment} />
        <div>
          {(userName === comment.author || userName === 'admin') && (
            <Delete onClick={() => dispatch(removeComment(comment.id))}>
              Удалить
            </Delete>
          )}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const FirstNameLetter = styled.div`
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
const Text = styled.input`
  width: 100%;
  margin-top: 5px;
  background-color: white;
  border-radius: 5px;
  padding: 7px 10px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  outline: none;
  border: none;
`;
const Delete = styled.button`
  outline: none;
  border: none;
  color: #5e6c84;
  cursor: pointer;
  &:hover {
    color: #262930;
  }
`;

export default Comment;
