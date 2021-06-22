import React from 'react';
import styled from 'styled-components'
import Colomn from './Colomn';


const BoardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 100px;
`

const Board: React.FC = () => {
  

  return (
    <BoardContainer>
      <Colomn colomnName='TODO'/>
      <Colomn colomnName='In Progress'/>
      <Colomn colomnName='Testing'/>
      <Colomn colomnName='Done'/>
    </BoardContainer>
  );
}

export default Board;