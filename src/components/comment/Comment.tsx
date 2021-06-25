import React from 'react';
import styled from 'styled-components'
import * as Types from '../../types/types'

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
`
const FirstNameLetter = styled.div`
  background-color: #e11cf0;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`
const Text = styled.input`
  margin-top: 5px;
  background-color: white;
  border-radius: 5px;
  padding: 7px 10px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  outline: none;
  border: none;
`
const Delete = styled.button`
  outline: none;
  border: none;
  color: #5e6c84;
  cursor: pointer;
  &:hover{
    color: #262930;
  }
`

interface CommentProps {
  userName: string;
  comment: Types.Comment;
  onChangeComment(e: React.ChangeEvent<HTMLInputElement>, id:string):void;
  removeComment(e: string): void;
}
const Comment: React.FC<CommentProps> = ({ userName, comment, onChangeComment, removeComment}) => {
  
  return (
    <Container>
      <FirstNameLetter>
        <div >{userName[0]}</div>
      </FirstNameLetter>
      <div>
        <div>{userName}</div>
        <Text 
          type='text' 
          value={comment.text}
          onChange={(e) => onChangeComment(e, comment.id)}/>
        <div>
          <Delete onClick={() => removeComment(comment.id)}>Удалить</Delete>
        </div>
      </div>
    </Container>
  );
}

export default Comment;