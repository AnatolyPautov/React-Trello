import React from 'react';
import styled from 'styled-components';
import Column from '../column';
import { useSelector } from 'react-redux';
import { getColumns } from '../../store/store';
import Context from '../../context';

interface BoardProps {
  setJoined(e: boolean): void;
}
const Board: React.FC<BoardProps> = ({ setJoined }) => {
  const columns = useSelector(getColumns);

  const { userName } = React.useContext(Context);

  return (
    <>
      <Profile>
        <CurrentUserName>{userName}</CurrentUserName>
        <ButtunExit onClick={() => setJoined(false)}>Выход</ButtunExit>
      </Profile>
      <BoardContainer>
        {columns.map((column) => (
          <Column key={column.id} column={column} />
        ))}
      </BoardContainer>
    </>
  );
};

const BoardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 50px;
`;
const Profile = styled.div`
  box-sizing: border-box;
  background-color: #ebecf0;
  margin: 30px 3px 0 auto;
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
`;
const CurrentUserName = styled.div`
  box-sizing: border-box;
  padding: 10px;
  width: 100px;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;
const ButtunExit = styled.button`
  cursor: pointer;
  box-sizing: border-box;
  width: 100px;
  height: 100%;
  outline: none;
  border: none;
  border-left: 2px solid #7162bb;
  &:hover {
    box-shadow: 0px 0px 16px 15px rgba(117, 90, 174, 0.2) inset;
  }
`;

export default Board;
