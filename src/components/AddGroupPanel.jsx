import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { MdOutlineArrowBackIos } from "react-icons/md";

const AddGroupPanel = ({ onShowAddGroup, onAddGroup }) => {
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleCreate = () => {
    const name = inputRef.current.value;
    onAddGroup(name);
    onShowAddGroup();
  };
  return (
    <Panel>
      <Header>
        <Button onClick={onShowAddGroup}>
          <MdOutlineArrowBackIos />
        </Button>
        <Title>새로운 그룹</Title>
        <Button onClick={handleCreate}>완료</Button>
      </Header>
      <Contents>
        <Input
          ref={inputRef}
          type="text"
          placeholder="그룹 이름을 입력해 주세요."
        />
      </Contents>
    </Panel>
  );
};

export default AddGroupPanel;

const Panel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
`;

const Contents = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  background-color: black;
  overflow: scroll;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;

  font-size: 1rem;
  padding: 0.5rem 1rem;
  margin-top: 2rem;

  border-bottom: 1px solid ${(props) => props.theme.colors.black_600};
  width: 100%;

  color: white;
  &::placeholder {
    color: ${(props) => props.theme.colors.black_600};
  }
`;

const Button = styled.button`
  padding: 1rem;
  font-size: ${(props) => props.theme.sizes.base};
  background-color: transparent;
  color: white;
`;

const Title = styled.p`
  color: white;
`;
