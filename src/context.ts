import React from 'react';
interface AppContextInterface {
    userName: string, 
    setUserName(name: string): void, 
}
const ThemeContext = React.createContext<AppContextInterface>({} as AppContextInterface);

export default ThemeContext;