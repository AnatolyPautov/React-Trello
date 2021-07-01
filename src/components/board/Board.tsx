import React from 'react';
import styled from 'styled-components';
import Column from '../column/Column';
import { useSelector } from 'react-redux';
import { selectColumns } from '../../store/store';

const Board: React.FC = () => {
  const columns = useSelector(selectColumns);

  return (
    <BoardContainer>
      {columns.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </BoardContainer>
  );
};

const BoardContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  margin-top: 100px;
`;

export default Board;
