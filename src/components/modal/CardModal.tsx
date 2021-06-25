import React from 'react';
import styled from 'styled-components'
import ThemeContext from '../../context';
import { ReactSVG } from 'react-svg'
import closeCross from './../../assets/icons/closeCross.svg'
import * as Types from '../../types/types'
import Comment from './../comment/Comment'

const Background = styled.div`
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`
const ModalWrapper = styled.div`
  box-sizing: border-box;
  width: 800px;
  min-height: 500px;
  background-color: #ebecf0;
  border-radius: 10px;
  position: relative;
  padding: 15px;
  display: flex;
  flex-direction: column;
`
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
  &:hover{
    background-color: rgba(0, 0, 0, 0.15);
  }
`
const TitleInput = styled.input`
  border: none;
  background: transparent;
  font-size: 18px;
  margin-bottom: 10px;
  margin-right: 40px;
`
const DescInput = styled.textarea`
  background-color: rgba(9,30,66,.08);
  margin: 10px 0;
  font-size: 14px;
  min-height: 50px;
  resize: none;
  border: none;
  outline: none;
  border-radius: 3px;
  padding: 5px 10px;
  &: focus{
    outline: 2px solid #5c3bfe;
  }
`
const CommentArea = styled.input`
  padding: 15px 10px;
  margin-bottom: 5px;
  border-radius: 3px;
  outline: none;
  border: none;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
`
interface ModalProps {
  card: Types.Card;
  onChangeCardTitle(e: React.ChangeEvent<HTMLInputElement>, id:string):void;
  onChangeCardDesc(e: React.ChangeEvent<HTMLTextAreaElement>, id: string):void;
  setModalActive(active: boolean): void;
  comments: Types.Comment[];
  addComment(commentInput: string): void;
  onChangeComment(e: React.ChangeEvent<HTMLInputElement>, id:string):void;
  removeComment(id: string):void
}
const CardModal: React.FC<ModalProps> = ({...props}) => {
  const [commentInput, setCommentInput] = React.useState<string>('');

  const {userName} = React.useContext(ThemeContext);

  const onCloseModal = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      props.setModalActive(false)
    }
  }
  React.useEffect(() => {
    document.addEventListener('keydown', onCloseModal)
  })

  const onChangeCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value)
  }

  const keyPressHandler = (event: React.KeyboardEvent, commentInput: string) => {
    if(event.key === 'Enter') {
      props.addComment(commentInput);
      setCommentInput('');
    }
  }
  
  return (
    <Background onClick={() =>  props.setModalActive(false)}>
      <ModalWrapper onClick={e => e.stopPropagation()}>
        <CloseСross onClick={() =>  props.setModalActive(false)}>
          <span>
            <ReactSVG src={closeCross}/>
          </span>
        </CloseСross>
        <TitleInput
          onChange={(e) =>  props.onChangeCardTitle(e,  props.card.id)}
          value={ props.card.title}
          type="text" />
        Описание:
        <DescInput 
          onChange={(e) => props.onChangeCardDesc(e,  props.card.id)}
          value={ props.card.description}
          placeholder='Добавте более подробное описание...'/>
        <CommentArea
          value={commentInput}
          type="text"
          placeholder='Введите комментарий'
          onChange={onChangeCommentInput}
          onKeyPress={(e) => keyPressHandler(e, commentInput)}/>
        { props.comments.map((comment: Types.Comment) => 
          <Comment 
            key={comment.id} 
            onChangeComment={props.onChangeComment} 
            removeComment={props.removeComment} 
            comment={comment} 
            userName={userName} />
        )} 
      </ModalWrapper>
    </Background>
  );
}

export default CardModal;