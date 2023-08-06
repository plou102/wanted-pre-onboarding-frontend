import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { AiOutlineWarning } from "react-icons/ai";
import { postSignUp } from "../api/requests";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const isToken = window.localStorage.getItem("token");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCount, setPasswordCount] = useState(0);

  useEffect(() => {
    if (isToken !== null) {
      navigate("/todo");
    }
  }, [isToken, navigate]);

  function onEmailHandler(e) {
    setEmail(e.target.value);
  }

  function onCountHandler(e) {
    setPasswordCount(e.target.value.length);
    setPassword(e.target.value);
  }

  async function signUpHandler(data) {
    const isSignUp = await postSignUp(data);

    if (isSignUp) {
      navigate("/login");
    }
  }

  return (
    <SignUpContent>
      <Title>회원가입</Title>

      <WarningContent>
        <AiOutlineWarning size={27} color="#FF0000" />
        <WarningText>
          이메일에는 <strong>@</strong>가 포함되어야 합니다.
        </WarningText>
        <WarningText>비밀번호는 8자 이상이어야 합니다.</WarningText>
      </WarningContent>

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

      <SignUpBtn
        data-testid="signup-button"
        disabled={email.includes("@") && passwordCount >= 8 ? false : true}
        onClick={() => {
          const data = {
            email: email,
            password: password,
          };

          signUpHandler(data);
        }}
      >
        회원가입
      </SignUpBtn>
    </SignUpContent>
  );
}

export default SignUp;

const SignUpContent = styled.div`
  text-align: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: #000069;
  margin-top: 15%;
  margin-bottom: 5%;
`;

const WarningContent = styled.div`
  margin-bottom: 8%;
`;

const WarningText = styled.p`
  margin: 5px 0;
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

const SignUpBtn = styled.button`
  width: 17%;
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
