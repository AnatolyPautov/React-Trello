import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Context from './context';

function Main() {
  const [userName, setUserName] = React.useState<string>('');

  return (
    <Context.Provider value={{ userName, setUserName }}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Context.Provider>
  );
}
ReactDOM.render(<Main />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
