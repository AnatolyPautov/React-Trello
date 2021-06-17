import React from 'react';
import styled from 'styled-components'

const PopupContainer = styled.div`
  position: absolute;
  content: '';
  top: 20%;
  left: 50%;
  transform: translate(-50%);
  width: 350px;
  height: 250px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`
const PopupInput = styled.input`
  margin: 50px auto 30px;
  width: 250px;
  padding: 12px 0;
  border: none;
  outline: none;
  border-radius: 3px;
  font-size: 20px;
  text-align: center;
  border: 2px solid #5c3bfe;
`
const PopupBtn = styled.button`
  margin: 10px auto 0;
  width: 250px;
  padding: 12px 0;
  border: none;
  outline: none;
  border-radius: 3px;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  background-color: #5c3bfe;
  color: white;
  transition: 0.3s;
  &: hover{
    background-color: #2a4ab3;
  }
`

interface PopupNameProps {
  saveName(name: string): void
  setJoined(e: boolean): void
}

const PopupName: React.FC<PopupNameProps> = ({ saveName, setJoined }) => {
  const [name, setName] = React.useState<string>('');

  const onAddName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onSaveName = () => {
    saveName(name);
    setJoined(true);
  }

  return (
    <PopupContainer>
      <PopupInput
        type="text"
        placeholder='Введите имя'
        onChange={onAddName}
      />
      <PopupBtn onClick={onSaveName}>Сохранить</PopupBtn>
    </PopupContainer>
  );
}

export default PopupName;