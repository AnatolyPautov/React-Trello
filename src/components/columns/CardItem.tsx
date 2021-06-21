import React from 'react';
import styled from 'styled-components'
import CardModal from './CardModal'


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
  userName: string;
}
const CardItem: React.FC<CardItemProps> = ({ item, removeCard, userName}) => {
  const [modalActive, setModalActive] = React.useState(false);

  return (
    <Card>
      <CardDesc onClick={() => setModalActive(true)}>{item.card}</CardDesc>
      <CloseСross onClick={() => removeCard(item.id)}>
        <span>
          <svg height="8.696pt"
            viewBox="0 0 365.696 365.696"
            width="8.696pt"
            xmlns="http://www.w3.org/2000/svg">
            <path d="m243.1875 182.859375 113.132812-113.132813c12.5-12.5 12.5-32.765624 0-45.246093l-15.082031-15.082031c-12.503906-12.503907-32.769531-12.503907-45.25 0l-113.128906 113.128906-113.132813-113.152344c-12.5-12.5-32.765624-12.5-45.246093 0l-15.105469 15.082031c-12.5 12.503907-12.5 32.769531 0 45.25l113.152344 113.152344-113.128906 113.128906c-12.503907 12.503907-12.503907 32.769531 0 45.25l15.082031 15.082031c12.5 12.5 32.765625 12.5 45.246093 0l113.132813-113.132812 113.128906 113.132812c12.503907 12.5 32.769531 12.5 45.25 0l15.082031-15.082031c12.5-12.503906 12.5-32.769531 0-45.25zm0 0" />
          </svg>
        </span>
      </CloseСross>
      {modalActive && 
      <CardModal
        setModalActive={setModalActive} 
        userName={userName} 
        item={item}/>}
    </Card>
  );
}

export default CardItem;