import React from "react";
import styled from "styled-components";

const CardList = ({ children }) => {
  return <List>{children}</List>;
};

export default CardList;

const List = styled.ul``;
