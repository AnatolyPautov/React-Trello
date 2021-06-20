import React from 'react';
import styled from 'styled-components'


const Background = styled.div`
  position: absolute;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
`
const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  background: #fff;
  border-radius: 10px;
  position: relative;
`
interface ModalProps {
  item: any;
  userName: string;
  setModalActive(active: boolean): void;
}
const CardModal: React.FC<ModalProps> = ({userName, setModalActive, item}) => {
  

  return (
    <Background onClick={() => setModalActive(false) }>
      <ModalWrapper onClick={e => e.stopPropagation()}>
        <h1>{userName}</h1>
        <p>{item.card}</p>
      </ModalWrapper>
    </Background>
  );
}

export default CardModal;