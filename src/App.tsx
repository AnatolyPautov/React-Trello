import React from 'react';
import PopupName from './components/PopupName';
import Columns from './components/columns/Columns';
import styled from 'styled-components';

const Background = styled.div`
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #5c3bfe;
  display: flex;
  justify-content: center;
  algin-items: center;
`
const Wrapper = styled.div`
  width: 1300px;
  margin: 0 auto;
`

function App() {
  const [userName, setUserName] = React.useState<string>('');
  const [joined, setJoined] = React.useState<boolean>(false);

  const saveName = (name: string) => {
    setUserName(name);
  }
  return (
    <Background>
      <Wrapper>
        {!joined ? <PopupName saveName={saveName} setJoined={setJoined} /> : <Columns />}
      </Wrapper>
    </Background>
  );
}

export default App;
