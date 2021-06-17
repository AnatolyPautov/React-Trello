import React from 'react';
import styled from 'styled-components'


const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 300px;
  background-color: #ebecf0;
  padding: 10px;
  border-radius: 3px;
`
const TitleInput = styled.input`
  outline: none;
  border: none;
  background: transparent;
  font-size: 18px;
  margin-bottom: 10px;
  padding-left: 5px;
`
const CardItem = styled.div`
  background-color: white;
  padding: 5px 10px;
  margin-bottom: 5px;
  border-radius: 3px;
  box-shadow: 0 1px 0 rgb(9 30 66 / 25%);
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
  colomnName: string
}

const Column: React.FC<ColumnProps> = ({colomnName}) => {
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
      }
      setColumnCards([...columnCards, newItem]);
      setColumnArea('');
    }
  }

  return (
    <ColumnContainer>
      <TitleInput
        value={columnTitle}
        type="text"
        onChange={onChangeTitle}
      />
      {columnCards.map((item: any) => <CardItem key={item.id}>{item.card}</CardItem>)}
      <AreaInput
        value={columnArea}
        type="text"
        placeholder='Введите текст'
        onChange={onChangeArea}
      />
      <button onClick={addCard}>Добавить карточку</button>
    </ColumnContainer>
  );
}

export default Column;