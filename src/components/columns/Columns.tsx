import React from 'react';
import styled from 'styled-components'
import Colomn from './Colomn';


const ColumnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 100px;
`

interface ColumnsProps{
  userName: string;
}
const Columns: React.FC<ColumnsProps> = ({userName}) => {
  

  return (
    <ColumnsContainer>
      <Colomn colomnName='TODO' userName={userName}/>
      <Colomn colomnName='In Progress' userName={userName}/>
      <Colomn colomnName='Testing' userName={userName}/>
      <Colomn colomnName='Done' userName={userName}/>
    </ColumnsContainer>
  );
}

export default Columns;