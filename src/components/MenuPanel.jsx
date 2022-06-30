import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
const MenuPanel = ({ showMenuPanel }) => {
  const onLogout = useAuth();
  const navigator = useNavigate();

  const handleClick = (event) => {
    if (event.target.id === "cancel" || event.target.id === "background") {
      showMenuPanel();
    }
  };
  return (
    <BackGround id="background" onClick={handleClick}>
      <Panel>
        <ButtonGroup>
          <Button onClick={() => navigator("/edit")}>목록 편집</Button>
          <Button>CSV 불러오기</Button>
          <Button>CSV 내보내기</Button>
          <Button onClick={onLogout}>로그아웃</Button>
          <Button id="cancel">취소</Button>
        </ButtonGroup>
      </Panel>
    </BackGround>
  );
};

export default MenuPanel;
const BackGround = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.805);
`;

const Panel = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 570px;
  color: white;

  padding: 0 0.5rem;
  background: transparent;
  border-radius: 1rem;
  overflow: hidden;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Button = styled.button`
  font-size: 1.25rem;
  width: 100%;
  padding: 1.5rem;
  color: ${(props) => props.theme.colors.blue};
  background-color: ${(props) => props.theme.colors.black_800};
  border-bottom: 1px solid ${(props) => props.theme.colors.black_700};

  &:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  &:nth-child(4) {
    margin-bottom: 0.5rem;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    color: ${(props) => props.theme.colors.red};
  }

  &:nth-child(5) {
    margin-bottom: 0.5rem;
    border-radius: 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.black_700};
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: white;
  text-align: left;

  font-size: ${(props) => props.theme.sizes.xl2}; ;
`;
