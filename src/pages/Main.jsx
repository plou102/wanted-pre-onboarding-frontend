import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

function Main() {
  const navigate = useNavigate();
  return (
    <MainContent>
      <Title>Todo List</Title>
      <ButtonContent>
        <SignIn
          onClick={() => {
            navigate('/signin');
          }}
        >
          로그인
        </SignIn>
        <SignUp
          onClick={() => {
            navigate('/signup');
          }}
        >
          회원가입
        </SignUp>
      </ButtonContent>
    </MainContent>
  );
}

export default Main;

const MainContent = styled.div`
  text-align: center;
  height: 50%;
`;

const Title = styled.h1`
  color: #000069;
  margin-top: 30%;
  margin-bottom: 10%;
`;

const ButtonContent = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SignIn = styled.button`
  width: 40%;
  height: 40%;
  margin: auto;
  background-color: transparent;
  border: 1px solid #000080;
  border-radius: 5px;
  box-shadow: 3px 3px 3px #646496;
  transition-duration: 0.3s;
  &:active {
    box-shadow: none;
  }
`;

const SignUp = styled.button`
  width: 40%;
  height: 40%;
  margin: auto;
  background-color: transparent;
  border: 1px solid #000080;
  border-radius: 5px;
  box-shadow: 3px 3px 3px #646496;
  transition-duration: 0.3s;
  &:active {
    box-shadow: none;
  }
`;
