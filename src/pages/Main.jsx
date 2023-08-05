import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

function Main() {
  const navigate = useNavigate();
  return (
    <ButtonContent>
      <SignIn
        onClick={() => {
          navigate("/signin");
        }}
      >
        로그인
      </SignIn>
      <SignUp
        onClick={() => {
          navigate("/signup");
        }}
      >
        회원가입
      </SignUp>
    </ButtonContent>
  );
}

export default Main;

const ButtonContent = styled.div`
  position: relative;
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  top: 55%;
`;

const SignIn = styled.button`
  width: 40%;
  height: 30%;
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
  height: 30%;
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
