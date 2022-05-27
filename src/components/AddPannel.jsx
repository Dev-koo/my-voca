import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { MdOutlineArrowBackIos } from "react-icons/md";

import * as groupProvider from "../service/groupService";
import GroupPannel from "./GroupPannel";

const AddPannel = ({ showAddPannel, onCreateCard, selectedGroups, card }) => {
  const [groups, setGroups] = useState([]);
  const [selectGroup, setSelectGroup] = useState(selectedGroups);

  const [showGroups, setShowGroups] = useState(false);

  const formRef = useRef();
  const wordRef = useRef();
  const meanRef = useRef();
  const memoRef = useRef();

  useEffect(() => {
    wordRef.current.focus();
  }, []);

  useEffect(async () => {
    const groups = await groupProvider.getGroupsHidden();
    setGroups(groups);
  }, []);

  useEffect(() => {
    if (card) {
      wordRef.current.value = card.word;
      meanRef.current.value = card.mean;
      memoRef.current.value = card.memo;
    }
  }, [card]);

  const handleCreateCard = () => {
    const word = wordRef.current.value;
    const mean = meanRef.current.value;
    const memo = memoRef.current.value;
    const group_name = selectGroup;

    const card = {
      word, // primary
      mean, // primary
      memo: memo || null, // optional
      group_name, // primary
    };

    if (!word || !mean) {
      return;
    }

    onCreateCard(card);

    formRef.current.reset();
    wordRef.current.focus();
  };

  const showGroupPannel = () => {
    setShowGroups((bool) => !bool);
  };

  const onSelectGroup = (name) => {
    setSelectGroup(name);
  };
  return (
    <>
      <Pannel>
        <Header>
          <Button onClick={showAddPannel}>
            <MdOutlineArrowBackIos />
          </Button>
          <Title>새 단어</Title>
          <Button onClick={handleCreateCard}>저장</Button>
        </Header>
        <Contents>
          <CardForm ref={formRef}>
            <InputBox>
              <Input ref={wordRef} type="text" placeholder="단어" />
            </InputBox>
            <InputBox>
              <Input ref={meanRef} type="text" placeholder="의미" />
            </InputBox>
            <InputBox>
              <Input ref={memoRef} type="text" placeholder="메모 (옵션)" />
            </InputBox>
            <SelectGroup onClick={showGroupPannel}>
              &gt; {selectGroup || "그룹 없음"}
            </SelectGroup>
          </CardForm>
        </Contents>
      </Pannel>
      {showGroups ? (
        <GroupPannel
          groups={groups}
          showGroupPannel={showGroupPannel}
          onSelectGroup={onSelectGroup}
        />
      ) : null}
    </>
  );
};

export default AddPannel;

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
`;

const CardForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputBox = styled.div`
  border-bottom: 1px solid #999999;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 1rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  color: white;
  width: 100%;
  &::placeholder {
    color: #999999;
  }
`;

const SelectGroup = styled.div`
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colors.blue};
  font-weight: bold;
  padding-left: 1rem;
  cursor: pointer;
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
