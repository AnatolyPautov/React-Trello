import React from 'react';
import styled from 'styled-components'


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
  userName: string;
  setModalActive(active: boolean): void;
}
const CardModal: React.FC<ModalProps> = ({ userName, setModalActive, item }) => {
  const [itemText, setItemText] = React.useState(item.card);
  const [descText, setDescText] = React.useState(item.dscription);
  const [commentInput, setCommentInput] = React.useState<string>('');
  const [comments, setComments] = React.useState<any>([]);

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
            <svg height="8.696pt"
              viewBox="0 0 365.696 365.696"
              width="8.696pt"
              xmlns="http://www.w3.org/2000/svg">
              <path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0" />
            </svg>
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
          <div>{com.comment}{userName}</div>)}
      </ModalWrapper>
    </Background>
  );
}

export default CardModal;