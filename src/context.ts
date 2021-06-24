import React from 'react';

interface AppContextInterface {
    userName: string, 
    setUserName(name: string): void, 
}

const contextDefaultValues: AppContextInterface = {
    userName: '',
    setUserName: () => {}
  };
const ThemeContext = React.createContext<AppContextInterface>(contextDefaultValues);

export default ThemeContext;