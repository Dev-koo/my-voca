import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineArrowBackIos, MdSearch } from "react-icons/md";
import GroupItem from "./GroupItem";
import AddButton from "./AddButton";
import * as groupProvider from "../service/groupService";
import AddGroupPanel from "./AddGroupPanel";
import GroupEditPanel from "./GroupEditPanel";

const GroupPanel = ({ showGroupPanel, onSelectGroup, flag, editPanel }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState([]);

  const [showAddGroup, setShowAddGroup] = useState(false);

  useEffect(async () => {
    const data = await groupProvider.getGroups();

    if (flag === "hidden") {
      setGroups(data.groupsHidden);
    } else {
      setGroups(data.groups);
    }
  }, [groups]);

  const onRemoveGroup = async () => {
    if (selectedGroup.length > 1) {
      console.log("하나만 선택해 주세요");
      return;
    }
    const index = selectedGroup.at(0).id;
    const response = await groupProvider.remove(index);
    if (!response) {
      throw new Error("Group Create Error");
    }
    setGroups((prevState) => {
      const groups = prevState.filter((group) => group.id !== index);
      return groups;
    });
  };

  const onAddGroup = async (name) => {
    const group = {
      group_name: name,
      user_id: 1,
      create_at: Date.now(),
      count: 0,
    };
    const response = await groupProvider.create(group);
    if (!response) {
      throw new Error("Group Create Error");
    }
    setGroups((prevState) => {
      const groups = [...prevState, response];
      return groups;
    });
  };

  const appendGroup = (group) => {
    setSelectedGroup((prevState) => {
      const updatedGroup = prevState.concat([group]);
      return updatedGroup;
    });
  };

  const removeSelectGroup = (group) => {
    setSelectedGroup((prevState) => {
      const updatedGroup = prevState.filter((item) => item.id !== group.id);
      return updatedGroup;
    });
  };

  const handleSelecetdGroups = (group, isChecked) => {
    isChecked ? appendGroup(group) : removeSelectGroup(group);
  };

  const handleSelectGroup = () => {
    if (!selectedGroup.length) {
      showGroupPanel();
      return;
    }
    onSelectGroup(selectedGroup.at(0));
    showGroupPanel();
  };

  const onShowAddGroup = () => {
    setShowAddGroup((bool) => !bool);
  };
  return (
    <>
      <Panel>
        <Header>
          <Button onClick={showGroupPanel}>
            <MdOutlineArrowBackIos />
          </Button>
          <Title>그룹 선택</Title>
          <Button onClick={handleSelectGroup}>완료</Button>
        </Header>
        <Contents>
          <SearchGroup>
            <SearchIcon>
              <MdSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder="여기에 그룹 이름을 입력하세요."
            />
            <ResetButton>취소</ResetButton>
          </SearchGroup>
          <GroupList>
            {groups &&
              groups.map((group) => (
                <GroupItem
                  key={group.id}
                  group={group}
                  handleSelecetdGroups={handleSelecetdGroups}
                />
              ))}
          </GroupList>
          <AddButton showAddPanel={onShowAddGroup} />
        </Contents>
      </Panel>
      {showAddGroup ? (
        <AddGroupPanel
          onShowAddGroup={onShowAddGroup}
          onAddGroup={onAddGroup}
        />
      ) : null}
      {editPanel && selectedGroup.length ? (
        <GroupEditPanel onRemoveGroup={onRemoveGroup} />
      ) : null}
    </>
  );
};

export default GroupPanel;

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
const Contents = styled.section`
  height: 100%;
  width: 100%;
  padding: 1rem;
  background-color: black;
  overflow: scroll;
`;

const SearchGroup = styled.div`
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #999999;
  font-size: 1.25rem;
  padding: 0.5rem;
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background-color: transparent;

  font-size: 1rem;
  padding: 0.5rem 1rem 0.5rem 0rem;
  color: white;

  width: 80%;
  &::placeholder {
    color: #999999;
  }
`;

const GroupList = styled.ul`
  width: 100%;
`;

const ResetButton = styled.span`
  font-size: 1rem;
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
