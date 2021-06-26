import React from 'react';

interface AppContextInterface {
  userName: string;
  setUserName(name: string): void;
}

const contextDefaultValues: AppContextInterface = {
  userName: '',
  setUserName: () => {},
};
const Context = React.createContext<AppContextInterface>(contextDefaultValues);

export default Context;
