import React from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";

const AddButton = ({ showAddPanel }) => {
  return (
    <AddCard onClick={showAddPanel}>
      <FiPlus />
    </AddCard>
  );
};

const AddCard = styled.button`
  position: absolute;
  bottom: 5rem;
  right: 1rem;
  border: none;
  font-size: 2rem;
  padding: 1rem;
  border-radius: 1rem;
  background-color: white;
  &:hover {
    cursor: pointer;
    background-color: #dcdcdc;
  }
`;

export default AddButton;
