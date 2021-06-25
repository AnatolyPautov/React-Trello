import React from 'react';
import styled from 'styled-components'
import Column from '../column/Column';
import * as Types from '../../types/types'


const BoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 100px;
`
const initColumns: Types.Column[] = [
  { id: 1, title: 'TO DO' },
  { id: 2, title: 'In Progress' },
  { id: 3, title: 'Testing' },
  { id: 4, title: 'Done' },
]
const Board: React.FC = () => {
  const [columns, setColumns] = React.useState<Types.Column[]>(initColumns);

  const setColumnTitle = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
    const newColumn = columns.map((column) => {
      if(column.id === id)  {
        column.title = e.target.value;
      } return column
    })
    console.log(newColumn)
    setColumns(newColumn )
  }
  return (
    <BoardContainer>
      {columns.map((column) => (
        <Column key={column.id} data={column} setColumnTitle={setColumnTitle}/>
      ))}
    </BoardContainer>
  );
}

export default Board;