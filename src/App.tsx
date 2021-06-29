import React from 'react';
import PopupName from './components/popupUserName/PopupName';
import Board from './components/board/Board';
import styled from 'styled-components';
import GlobalStyle from './globalstyles';

function App() {
  const [joined, setJoined] = React.useState<boolean>(false);

  return (
    <>
      <GlobalStyle />
      <Background>
        <Wrapper>
          {!joined ? <PopupName setJoined={setJoined} /> : <Board />}
        </Wrapper>
      </Background>
    </>
  );
}

const Background = styled.div`
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  algin-items: center;
`;
const Wrapper = styled.div`
  width: 1300px;
  margin: 0 auto;
`;

export default App;
