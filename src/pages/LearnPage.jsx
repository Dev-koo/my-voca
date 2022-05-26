import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { MdMenu, MdSearch } from "react-icons/md";
import { BiFolder } from "react-icons/bi";
import { ReactComponent as LarnIcon } from "../assets/larn-icon-black-resize.svg";

const LearnPage = (props) => {
  return (
    <>
      <Header>
        <Button>
          <MdMenu />
        </Button>
        <Title>List</Title>
        <Button>
          <MdSearch />
        </Button>
      </Header>
      <Contents>Card Learn</Contents>
      <NavBar>
        <Link className="link" to={"/"}>
          <BiFolder className="icon" />
        </Link>
        <Link className="link" to={"/learn"}>
          <LarnIcon className="icon" />
        </Link>
      </NavBar>
    </>
  );
};

export default LearnPage;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
`;
const Contents = styled.main`
  height: 100%;
`;

const NavBar = styled.div`
  width: 100%;
  background-color: black;
  display: flex;
  align-items: center;

  .link {
    text-align: center;
    flex: 1 1 50%;
    padding: 0.25rem;
  }
  .icon {
    font-size: 2rem;
    padding: 0.25rem;
    color: white;
  }
  .icon:hover {
    cursor: pointer;
  }
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
