import React from 'react';
import styled from 'styled-components'
import ThemeContext from '../../context';
import { ReactSVG } from 'react-svg'
import closeCross from './../../assets/icons/closeCross.svg'

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
  item: any;
  setModalActive(active: boolean): void;
}
const CardModal: React.FC<ModalProps> = ({setModalActive, item }) => {
  const [itemText, setItemText] = React.useState(item.card);
  const [descText, setDescText] = React.useState(item.dscription);
  const [commentInput, setCommentInput] = React.useState<string>('');
  const [comments, setComments] = React.useState<any[]>(item.comments);

  const {userName} = React.useContext(ThemeContext);

  const onCloseModal = ({ key }: KeyboardEvent) => {
    if (key === 'Escape') {
      setModalActive(false)
    }
  }
  React.useEffect(() => {
    document.addEventListener('keydown', onCloseModal)
  })
  
  const onChangeItemCard = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemText(e.target.value);
    item.card = itemText;
  }
  const onChangeDescText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescText(e.target.value);
    item.dscription = descText;
  }

  const onChangeCommentInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value)
  }
  const addCard = () => {
    if(commentInput){
      const newComment = {
        id: Math.random().toString(36).substring(2,9),
        comment: commentInput,
      }
      setComments([...comments, newComment]);
      item.comments = comments;
      setCommentInput('');
    }
  }
  const keyPressHandler = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter') {
      addCard();
    }
  }
  
  return (
    <Background onClick={() => setModalActive(false)}>
      <ModalWrapper onClick={e => e.stopPropagation()}>
        <CloseСross onClick={() => setModalActive(false)}>
          <span>
            <ReactSVG src={closeCross}/>
          </span>
        </CloseСross>
        <TitleInput
          onChange={onChangeItemCard}
          value={itemText}
          type="text" />
        Описание:
        <DescInput
          onChange={onChangeDescText}
          value={descText || ''}
          type="text" 
          placeholder='Добавте более подробное описание...'/>
        <CommentArea
          value={commentInput}
          type="text"
          placeholder='Введите комментарий'
          onChange={onChangeCommentInput}
          onKeyPress={keyPressHandler}/>
          {comments.map((com: any) => 
          <div key={com.id}>{com.comment}{userName}</div>)}
      </ModalWrapper>
    </Background>
  );
}

export default CardModal;