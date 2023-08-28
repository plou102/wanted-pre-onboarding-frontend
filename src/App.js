import React from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

function App() {
  return (
    <MainContainer>
      <Outlet />
    </MainContainer>
  );
}

export default App;

const MainContainer = styled.div`
  width: 30%;
  height: 55vh;
  border-radius: 20px;
  border: 2px solid #000080;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 5px 5px 5px #646496;
`;
