import React from "react";
import styled from "styled-components";

const GroupEditPanel = ({ onRemoveGroup }) => {
  return (
    <Panel>
      <Button>병합(미구현)</Button>
      <Button onClick={onRemoveGroup}>삭제</Button>
    </Panel>
  );
};

export default GroupEditPanel;

const Panel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
`;

const Button = styled.button`
  width: 50%;
  background-color: white;
  color: black;
  font-size: ${(props) => props.theme.sizes.base};
  padding: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.black_200};
  }
`;
