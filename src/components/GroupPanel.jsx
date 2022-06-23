import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineArrowBackIos, MdSearch } from "react-icons/md";
import GroupItem from "./GroupItem";
import AddButton from "./AddButton";
import AddGroupPanel from "./AddGroupPanel";
import GroupEditPanel from "./GroupEditPanel";
import { useGorupService } from "../contexts/GroupContext";

const GroupPanel = ({
  showGroupPanel,
  onSelectGroup,
  flag,
  editPanel,
  onChangeGroup,
}) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState([]);

  const [showAddGroup, setShowAddGroup] = useState(false);

  const groupService = useGorupService();

  useEffect(async () => {
    const data = await groupService.getGroups();
    if (flag === "hidden") {
      setGroups(data.filter((card) => card.group_name !== "모든 그룹"));
    } else {
      setGroups(data);
    }
  }, []);

  const onRemoveGroup = async () => {
    if (selectedGroup.length > 1) {
      console.log("하나만 선택해 주세요");
      return;
    }
    const targetGroupName = selectedGroup.at(0).group_name;
    const response = await groupService.remove(selectedGroup.at(0).group_id);
    if (!response) {
      throw new Error("Group Create Error");
    }
    setGroups((prevState) => {
      const groups = prevState.filter(
        (group) => group.group_name !== targetGroupName
      );
      return groups;
    });
    setSelectedGroup([]);
    onChangeGroup();
  };

  const onAddGroup = async (name) => {
    const response = await groupService.create({ group_name: name });
    if (!response) {
      throw new Error("Group Create Error");
    }

    const data = await groupService.getGroups();
    setGroups(data);
  };

  const appendGroup = (group) => {
    setSelectedGroup((prevState) => {
      const updatedGroup = prevState.concat([group]);
      return updatedGroup;
    });
  };

  const removeSelectGroup = (group) => {
    setSelectedGroup((prevState) => {
      const updatedGroup = prevState.filter(
        (item) => item.group_id !== group.group_id
      );
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
            {groups.map((group) => (
              <GroupItem
                key={group.group_name}
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
