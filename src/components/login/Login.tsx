import React from 'react';
import styled from 'styled-components';
import Context from '../../context';
import { Form, Field } from 'react-final-form';
import * as Types from '../../types/types';

interface LoginProps {
  setJoined(e: boolean): void;
}

const Login: React.FC<LoginProps> = ({ setJoined }) => {
  const { setUserName } = React.useContext(Context);

  const onSubmit = (values: Types.UserName) => {
    if (values) {
      setUserName(values.firstName);
      setJoined(true);
    }
  };

  const required = (value: string) => (value ? undefined : 'Введите имя');

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <PopupForm onSubmit={handleSubmit}>
          <PopupInput>
            <Field
              name="firstName"
              validate={required}
              render={({ input, meta }) => (
                <div>
                  <input {...input} type="text" placeholder="Введите имя" />
                  {meta.error && meta.touched && <Error>{meta.error}</Error>}
                </div>
              )}
            />
          </PopupInput>
          <PopupBtn type="submit">Сохранить</PopupBtn>
        </PopupForm>
      )}
    />
  );
};

const PopupForm = styled.form`
  position: absolute;
  content: '';
  top: 20%;
  left: 50%;
  transform: translate(-50%);
  width: 350px;
  height: 250px;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
`;
const PopupInput = styled.div`
  margin: 50px auto 30px;
  position: relative;
  input {
    text-align: center;
    width: 250px;
    padding: 12px 0;
    border: none;
    outline: none;
    border-radius: 3px;
    font-size: 20px;
    border: 2px solid #5c3bfe;
  }
`;
const PopupBtn = styled.button`
  margin: 10px auto 0;
  width: 250px;
  padding: 12px 0;
  border: none;
  outline: none;
  border-radius: 3px;
  font-size: 20px;
  text-align: center;
  cursor: pointer;
  background-color: #5c3bfe;
  color: white;
  transition: 0.3s;
  &:hover {
    background-color: #2a4ab3;
  }
`;

const Error = styled.div`
  position: absolute;
  bottom: -30px;
  left: 0;
  width: 100%;
  height: 30px;
  color: red;
`;
export default Login;
