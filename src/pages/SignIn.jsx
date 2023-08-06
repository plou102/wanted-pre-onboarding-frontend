import { postSignIn } from "../api/requests";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCount, setPasswordCount] = useState(0);

  useEffect(() => {
    const isToken = window.localStorage.getItem("token");

    if (isToken !== null) {
      navigate("/todo");
    }
  }, [navigate]);

  function onEmailHandler(e) {
    setEmail(e.target.value);
  }

  function onCountHandler(e) {
    setPasswordCount(e.target.value.length);
    setPassword(e.target.value);
  }

  async function signInHandler(data) {
    const token = await postSignIn(data);

    window.localStorage.setItem("token", `${token.access_token}`);
    if (token) {
      navigate("/todo");
    }
  }

  return (
    <SignInContent>
      <Title>로그인</Title>

      <InputContent>
        <EmailInput
          data-testid="email-input"
          type="text"
          placeholder="이메일을 입력해 주세요."
          onChange={onEmailHandler}
        />
        <PasswordInput
          data-testid="password-input"
          type="password"
          placeholder="비밀번호를 입력해 주세요."
          onChange={onCountHandler}
        />
      </InputContent>

      <SignInBtn
        data-testid="signin-button"
        disabled={email.includes("@") && passwordCount >= 8 ? false : true}
        onClick={() => {
          const data = {
            email: email,
            password: password,
          };

          signInHandler(data);
        }}
      >
        로그인
      </SignInBtn>
    </SignInContent>
  );
}

export default SignIn;

const SignInContent = styled.div`
  text-align: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #000069;
  margin-top: 15%;
  margin-bottom: 16%;
`;

const InputContent = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15%;
`;

const EmailInput = styled.input`
  width: 100%;
  height: 30px;
  margin: auto;
  border: 1px solid #000080;
  border-radius: 5px;
  padding-left: 5px;
`;

const PasswordInput = styled.input`
  width: 100%;
  height: 30px;
  margin: auto;
  border: 1px solid #000080;
  border-radius: 5px;
  padding-left: 5px;
`;

const SignInBtn = styled.button`
  width: 15%;
  height: 40px;
  font-size: 18px;
  margin: auto;
  border-radius: 5px;

  ${(props) =>
    props.disabled === false &&
    `
  color: #000069;
  border: 1px solid #000080;
  background-color: transparent;
  box-shadow: 3px 3px 3px #646496;
  transition-duration: 0.3s;
  &:active {
    box-shadow: none;
  }
  `}
`;
