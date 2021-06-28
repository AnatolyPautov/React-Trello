import React from 'react';
import styled from 'styled-components';
import Column from '../column/Column';
import * as Types from '../../types/types';

const BoardContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  margin-top: 100px;
`;
const initColumns: Types.Column[] = [
  { id: 1, title: 'TO DO' },
  { id: 2, title: 'In Progress' },
  { id: 3, title: 'Testing' },
  { id: 4, title: 'Done' },
];
const Board: React.FC = () => {
  const [columns, setColumns] = React.useState<Types.Column[]>(initColumns);

  const setColumnTitle = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const newColumn = columns.map((column) => {
      if (column.id === id) return { ...column, title: e.target.value };
      return column;
    });
    setColumns(newColumn);
  };
  return (
    <BoardContainer>
      {columns.map((column) => (
        <Column
          key={column.id}
          column={column}
          setColumnTitle={setColumnTitle}
        />
      ))}
    </BoardContainer>
  );
};

export default Board;
