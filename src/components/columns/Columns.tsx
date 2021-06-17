import React from 'react';
import styled from 'styled-components'
import Colomn from './Colomn';


const ColumnsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 100px;
`

const Columns: React.FC = () => {
  

  return (
    <ColumnsContainer>
      <Colomn colomnName='TODO'/>
      <Colomn colomnName='In Progress'/>
      <Colomn colomnName='Testing'/>
      <Colomn colomnName='Done'/>
    </ColumnsContainer>
  );
}

export default Columns;