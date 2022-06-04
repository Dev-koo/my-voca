import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import MultipleChoice from "./MultipleChoice";

const LearnPlanPanel = (props) => {
  const [showMultiple, setShowMultiple] = useState(false);

  const onShowMultiple = () => {
    setShowMultiple((bool) => !bool);
  };
  return (
    <>
      <Panel>
        <LinkButton>
          <Link className="link" onClick={onShowMultiple}>
            사지선다
            <MdOutlineArrowForwardIos />
          </Link>
        </LinkButton>
        <LinkButton>
          <Link className="link">
            플레시카드
            <MdOutlineArrowForwardIos />
          </Link>
        </LinkButton>
        <LinkButton>
          <Link className="link">
            철자 맞추기
            <MdOutlineArrowForwardIos />
          </Link>
        </LinkButton>
        <LinkButton>
          <Link className="link">
            깜빡이
            <MdOutlineArrowForwardIos />
          </Link>
        </LinkButton>
      </Panel>
      {showMultiple ? <MultipleChoice onShowMultiple={onShowMultiple} /> : null}
    </>
  );
};

const Panel = styled.div`
  width: 100%;
  padding: 1rem;
`;

const LinkButton = styled.div`
  cursor: pointer;
`;

const Link = styled.a`
  display: flex;
  justify-content: space-between;
  color: white;
  padding: 2rem 0rem;
  font-size: ${(props) => props.theme.sizes.xl};
`;
export default LearnPlanPanel;
