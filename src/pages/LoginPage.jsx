import React, { useState } from "react";
import styled from "styled-components";
import { MdMenu, MdSearch } from "react-icons/md";

const LoginPage = ({ onSignUp, onLogin }) => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const signupHandler = () => {
    const { username, password } = inputs;
    onSignUp(username, password);
  };
  const loginHandler = () => {
    const { username, password } = inputs;
    onLogin(username, password);
  };

  return (
    <AppContent>
      <Header>
        <Title>로그인</Title>
      </Header>
      <Contents>
        <InputBox>
          <Input
            name="username"
            type="text"
            onChange={onChange}
            placeholder="id"
            autoFocus
            autoComplete="off"
          />
        </InputBox>
        <InputBox>
          <Input
            name="password"
            type="text"
            onChange={onChange}
            placeholder="pw"
            autoComplete="off"
          />
        </InputBox>
        <Button onClick={signupHandler}>가입</Button>
        <Button onClick={loginHandler}>로그인</Button>
      </Contents>
    </AppContent>
  );
};

export default LoginPage;

const AppContent = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 560px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
`;

const Header = styled.header`
  text-align: center;
  padding: 1rem;
  background-color: black;
`;

const Contents = styled.main`
  position: relative;
  height: 100%;
  overflow: scroll;
  padding: 0 1rem;
`;

const Button = styled.button`
  padding: 1rem;
  font-size: ${(props) => props.theme.sizes.xl2};
  background-color: transparent;
  color: white;
`;

const Title = styled.p`
  color: white;
  cursor: pointer;
`;

const InputBox = styled.div`
  border-bottom: 1px solid #999999;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  color: white;
  width: 100%;
  &::placeholder {
    color: #999999;
  }
`;
