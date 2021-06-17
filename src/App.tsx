import React from 'react';
import PopupName from './components/PopupName';

function App() {
  const [state, setState] = React.useState<string>('');

  const saveName = (name: string) => {
    setState(name);
    console.log(`имя пользователя: ${state}`)
  }
  return (
    <div className="App">
      <PopupName saveName={saveName}/>
    </div>
  );
}

export default App;
