import React from 'react';
import styled from 'styled-components'

const PopupContainer = styled.div`
  position: absolute;
  content: '';
  top: 20%;
  left: 50%;
  transform: translate(-50%);
  width: 300px;
  height: 250px;
  background-color: #282c34;
`

interface PopupNameProps {
  saveName(name: string): void
}

const PopupName: React.FC<PopupNameProps> = ({saveName}) => {
  const [name, setName] = React.useState<string>('');
  const [joined, setJoined] = React.useState<boolean>(false);

  const onAddName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }

  const onSaveName = () => {
    saveName(name);
    setJoined(true);
  }

  return (
    <PopupContainer>
      <input
        type="text"
        placeholder='введите имя'
        onChange={onAddName}
      />
      <button onClick={onSaveName}>Сохранить</button>
    </PopupContainer>
  );
}

export default PopupName;