import React from 'react';
import styled from 'styled-components'
import CardModal from './CardModal'
import { ReactSVG } from 'react-svg'
import closeCross from './../../assets/icons/closeCross.svg'
import * as Types from './../../types/types'

const Card = styled.div`
  background-color: white;
  margin-bottom: 5px;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
  display: flex;
  justify-content: space-between;
  &: hover{
    background-color: rgba(255, 255, 255, 0.3);
  }
`
const CardDesc = styled.div`
  overflow: hidden;
  width: 100%;
  padding: 5px 10px;
  cursor: pointer;
`
const CloseСross = styled.div`
  cursor: pointer;
  padding: 5px 10px;
`

interface CardItemProps {
  card: Types.Card;
  removeCard(id: string | number): void;
  onChangeCardTitle(e: React.ChangeEvent<HTMLInputElement>, id:string):void;
  onChangeCardDesc(e: React.ChangeEvent<HTMLInputElement>, id:string):void;
}
const CardItem: React.FC<CardItemProps> = ({ card, removeCard, onChangeCardTitle, onChangeCardDesc}) => {
  const [modalActive, setModalActive] = React.useState(false);
  const [comments, setComments] = React.useState<Types.Comment[]>([]);

  const addComment = (commentInput: string) => {
    if(commentInput){
      const newComment = {
        id: Math.random().toString(36).substring(2,9),
        text: commentInput,
      }
      setComments([...comments, newComment]);
    }
  }
  return (
    <Card>
      <CardDesc onClick={() => setModalActive(true)}>{card.title}</CardDesc>
      <CloseСross onClick={() => removeCard(card.id)}>
        <span>
          <ReactSVG src={closeCross}/>
        </span>
      </CloseСross>
      {modalActive && 
      <CardModal
        setModalActive={setModalActive} 
        card={card}
        onChangeCardTitle={onChangeCardTitle}
        onChangeCardDesc={onChangeCardDesc}
        addComment={addComment}
        comments={comments}
        />
      }
    </Card>
  );
}

export default CardItem;