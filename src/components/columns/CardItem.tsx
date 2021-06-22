import React from 'react';
import styled from 'styled-components'
import CardModal from './CardModal'
import { ReactSVG } from 'react-svg'
import closeCross from './../../assets/icons/closeCross.svg'

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
  item: any;
  removeCard(id: string | number): void;
}
const CardItem: React.FC<CardItemProps> = ({ item, removeCard}) => {
  const [modalActive, setModalActive] = React.useState(false);

  return (
    <Card>
      <CardDesc onClick={() => setModalActive(true)}>{item.card}</CardDesc>
      <CloseСross onClick={() => removeCard(item.id)}>
        <span>
          <ReactSVG src={closeCross}/>
        </span>
      </CloseСross>
      {modalActive && 
      <CardModal
        setModalActive={setModalActive} 
        item={item}/>}
    </Card>
  );
}

export default CardItem;