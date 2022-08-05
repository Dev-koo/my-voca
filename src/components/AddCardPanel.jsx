import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MdOutlineArrowBackIos } from "react-icons/md";
import GroupPanel from "./GroupPanel";
import { useGorupService } from "../contexts/GroupContext";
import { motion, useAnimationControls } from "framer-motion";

const AddCardPanel = ({ showAddPanel, onCreateCard, selectedGroups, card }) => {
  const [selectedGroup, setSelectedGroup] = useState({
    group_name: null,
    group_id: null,
  });

  const [showGroup, setShowGroup] = useState(false);
  const [saveCheck, setSaveCheck] = useState({
    isSaved: false,
    message: "",
  });

  const formRef = useRef();
  const wordRef = useRef();
  const meanRef = useRef();
  const memoRef = useRef();

  const groupService = useGorupService();

  const anumationController = useAnimationControls();

  useEffect(async () => {
    if (selectedGroups === "모든 그룹") {
      const data = (await groupService.getGroups()).filter(
        (card) => card.group_name !== "모든 그룹"
      );
      data &&
        setSelectedGroup({
          group_name: data.at(1).group_name,
          group_id: data.at(1).group_id,
        });

      return;
    } else {
      const data = (await groupService.getGroups()).find(
        (card) => card.group_name === selectedGroups
      );

      data &&
        setSelectedGroup({
          group_name: data.group_name,
          group_id: data.group_id,
        });
    }
  }, []);

  useEffect(() => {
    wordRef.current.focus();
  }, []);

  useEffect(() => {
    if (card) {
      wordRef.current.value = card.word;
      meanRef.current.value = card.mean;
      memoRef.current.value = card.memo;
    }
  }, [card]);

  const handleCreateCard = async () => {
    const word = wordRef.current.value;
    const mean = meanRef.current.value;
    const memo = memoRef.current.value;
    const group_name = selectedGroup.group_name;
    const group_id = selectedGroup.group_id;
    const level = card && card.level;

    const createdCard = {
      word, // primary
      mean, // primary
      memo: memo || null, // optional
      group_name, // optional
      group_id, // optional
      level: level || null, // optional
    };

    if (!word || !mean) {
      setSaveCheck({
        flag: false,
        message: "단어와 의미는 반드시 있어야 합니다.",
      });
      showSign();
      return;
    }

    const { flag } = await onCreateCard(createdCard);

    if (flag === "success") {
      setSaveCheck({ flag: true, message: "저장 되었습니다." });
      showSign();
    } else {
      setSaveCheck({ flag: false, message: "저장 실패." });
      showSign();
    }

    formRef.current.reset();
    wordRef.current.focus();
  };

  const showSign = () => {
    anumationController.start({ opacity: [1, 0] });
  };

  const onSelectGroup = ({ group_name, group_id }) => {
    setSelectedGroup({ group_name, group_id });
  };

  const handleShowGroupPanel = () => {
    showGroupPanel();
  };

  const showGroupPanel = () => {
    setShowGroup((bool) => !bool);
  };

  const onKeyPressHandler = (e) => {
    if (e.code === "Enter") {
      handleCreateCard();
    } else if (e.code === "Escape") {
      console.log(e.code);
    }
  };
  return (
    <>
      <Panel>
        <Header>
          <Button onClick={showAddPanel}>
            <MdOutlineArrowBackIos />
          </Button>
          <Title>새 단어</Title>
          <Button onClick={handleCreateCard}>저장</Button>
        </Header>
        <Contents>
          <CardForm ref={formRef} onKeyPress={onKeyPressHandler}>
            <InputBox>
              <Input ref={wordRef} type="text" placeholder="단어" />
            </InputBox>
            <InputBox>
              <Input ref={meanRef} type="text" placeholder="의미" />
            </InputBox>
            <InputBox>
              <Input ref={memoRef} type="text" placeholder="메모 (옵션)" />
            </InputBox>
            <SelectGroup onClick={handleShowGroupPanel}>
              &gt; {selectedGroup.group_name || "그룹 없음"}
            </SelectGroup>
          </CardForm>
        </Contents>
        <SignPanel>
          <Sign
            style={{ opacity: 0 }}
            animate={anumationController}
            check={saveCheck.flag ? 1 : 0}
          >
            {saveCheck.message}
          </Sign>
        </SignPanel>
      </Panel>
      {showGroup ? (
        <GroupPanel
          showGroupPanel={showGroupPanel}
          onSelectGroup={onSelectGroup}
          flag="hidden"
        />
      ) : null}
    </>
  );
};

export default AddCardPanel;

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

const SignPanel = styled.div`
  position: absolute;
  bottom: 50%;
  right: 50%;
  transform: translateX(50%);
  text-align: center;
  font-size: 2rem;
  z-index: 55;
`;

const Sign = styled(motion.div)`
  color: ${(props) => (props.check ? "skyblue" : "pink")};
`;
