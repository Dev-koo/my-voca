import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useGorupService } from "../contexts/GroupContext";
const GroupListPanel = ({ cardChanged, onEditCard, onShowGroupListPanel }) => {
  const [groups, setGroups] = useState([]);

  const groupService = useGorupService();

  useEffect(async () => {
    const data = await groupService.getGroups();

    setGroups(data.filter((card) => card.group_name !== "모든 그룹"));
  }, []);

  const handleClick = (event) => {
    if (event.target.id === "cancel" || event.target.id === "background") {
      onShowGroupListPanel();
    }
  };

  //   const onSelectGroup = (group) => {
  //     const { group_name, group_id } = group;
  //     handleEditCard({ group_name, group_id });
  //   };

  const handleGroupChanger = (group_id, group_name) => {
    // console.log(level);

    const newCards = cardChanged.map((card) => {
      return { ...card, group_id, group_name };
    });

    newCards.map((card) => onEditCard(card));

    onShowGroupListPanel();
  };

  return (
    <>
      <BackGround id="background" onClick={handleClick}>
        <Panel>
          <ButtonGroup>
            <Content>그룹 편집</Content>
            {groups &&
              groups.map((group) => {
                return (
                  <Button
                    key={group.group_name}
                    onClick={(e) =>
                      handleGroupChanger(group.group_id, group.group_name)
                    }
                  >
                    {group.group_name}
                  </Button>
                );
              })}
            <Button id="cancel">취소</Button>
          </ButtonGroup>
        </Panel>
      </BackGround>
    </>
  );
};

export default GroupListPanel;

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

const Content = styled.div`
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.colors.black_400};
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.black_800};
  border-bottom: 1px solid ${(props) => props.theme.colors.black_700};
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
`;

const Button = styled.button`
  font-size: 1.25rem;
  width: 100%;
  padding: 1.5rem;
  color: ${(props) => props.theme.colors.blue};
  background-color: ${(props) => props.theme.colors.black_800};
  border-bottom: 1px solid ${(props) => props.theme.colors.black_700};

  &:nth-last-child(2) {
    margin-bottom: 0.5rem;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }

  &:last-child {
    margin-bottom: 0.5rem;
    border-radius: 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.black_700};
  }
`;
