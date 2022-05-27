import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineArrowBackIos, MdSearch } from "react-icons/md";
import GroupItem from "./GroupItem";
import AddButton from "./AddButton";

const GroupPannel = ({ groups, showGroupPannel, onSelectGroup }) => {
  const [group, setGroup] = useState("");

  const handleSelecetdGroups = (name) => {
    setGroup(name);
  };

  const handleSelectGroup = () => {
    onSelectGroup(group);
    showGroupPannel();
  };

  return (
    <Pannel>
      <Header>
        <Button onClick={showGroupPannel}>
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
        <AddButton />
      </Contents>
    </Pannel>
  );
};

export default GroupPannel;

const Pannel = styled.div`
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
