import React from 'react';
import styled from 'styled-components'
import ThemeContext from '../../context';
import { ReactSVG } from 'react-svg'
import closeCross from './../../assets/icons/closeCross.svg'
import * as Types from './../../types/types'

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
  height: 500px;
  background-color: #ebecf0;
  border-radius: 10px;
  position: relative;
  padding: 15px;
  display: flex;
  flex-direction: column;
  padding-right: 50px
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
`
const DescInput = styled(TitleInput)`
  margin-top: 10px;
  font-size: 14px;
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
  comments: Types.Comment[];
  card: Types.Card;
  setModalActive(active: boolean): void;
  onChangeCardTitle(e: React.ChangeEvent<HTMLInputElement>, id:string):void;
  onChangeCardDesc(e: React.ChangeEvent<HTMLInputElement>, id:string):void;
  addComment(commentInput: string): void;
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
          type="text" 
          placeholder='Добавте более подробное описание...'/>
        <CommentArea
          value={commentInput}
          type="text"
          placeholder='Введите комментарий'
          onChange={onChangeCommentInput}
          onKeyPress={(e) => keyPressHandler(e, commentInput)}/>
        { props.comments.map((com: any) => 
          <div key={com.id}>{com.text}{userName}</div>
        )} 
      </ModalWrapper>
    </Background>
  );
}

export default CardModal;