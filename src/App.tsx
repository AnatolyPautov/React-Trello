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
      <Wrapper>
        {!joined ? (
          <PopupName setJoined={setJoined} />
        ) : (
          <Board setJoined={setJoined} />
        )}
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 1300px;
  margin: 0 auto;
`;

export default App;
