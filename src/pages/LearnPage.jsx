import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { BiFolder } from "react-icons/bi";
import { ReactComponent as LarnIcon } from "../assets/larn-icon-black-resize.svg";
import LearnPlanPanel from "../components/LearnPlanPanel";

const LearnPage = ({ cards }) => {
  return (
    <>
      <Header>
        <Title>학습</Title>
      </Header>
      <Contents>
        <LearnPlanPanel />
      </Contents>
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
  text-align: center;
  padding: 1rem;
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

const Title = styled.p`
  color: white;
`;
