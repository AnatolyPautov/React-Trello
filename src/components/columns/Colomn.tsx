import React from 'react';
import styled from 'styled-components'
import CardItem from './CardItem'

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  background-color: #ebecf0;
  padding: 10px;
  border-radius: 3px;
  max-height: 500px;
  overflow-y: auto;
`
const TitleInput = styled.input`
  outline: none;
  border: none;
  background: transparent;
  font-size: 18px;
  margin-bottom: 10px;
`
const ItemWrapper = styled.div`
  overflow-y: auto;
  padding-right: 4px;
`
const AreaInput = styled.input`
  padding: 15px 10px;
  margin-bottom: 5px;
  border-radius: 3px;
  outline: none;
  border: none;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
`

interface ColumnProps {
  colomnName: string;
  userName: string;
}

const Column: React.FC<ColumnProps> = ({colomnName, userName}) => {
  const [columnTitle, setColumnTitle] = React.useState<string>(colomnName); 
  const [columnArea, setColumnArea] = React.useState<string>(''); 
  const [columnCards, setColumnCards] = React.useState<any>([]); 

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnTitle(e.target.value)
  }

  const onChangeArea = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColumnArea(e.target.value)
  }
  const addCard = () => {
    if(columnArea){
      const newItem = {
        id: Math.random().toString(36).substring(2,9),
        card: columnArea,
        description: 'авпвапв',
      }
      setColumnCards([...columnCards, newItem]);
      setColumnArea('');
    }
  }
  const keyPressHandler = (event: React.KeyboardEvent) => {
    if(event.key === 'Enter') {
      addCard();
    }
  }
  const removeCard = (id: string | number) => {
    setColumnCards([...columnCards.filter((card: any) => card.id !== id)])
  }

  return (
    <ColumnContainer>
      <TitleInput
        value={columnTitle}
        type="text"
        onChange={onChangeTitle}
      />
      <ItemWrapper>
        {columnCards.map((item: any) => 
        <CardItem 
          removeCard={removeCard} 
          item={item} 
          key={item.id}
          userName={userName}/>)}
      </ItemWrapper>
      <AreaInput
        value={columnArea}
        type="text"
        placeholder='Введите текст'
        onChange={onChangeArea}
        onKeyPress={keyPressHandler}
      />
      <button onClick={addCard}>Добавить карточку</button>
    </ColumnContainer>
  );
}

export default Column;