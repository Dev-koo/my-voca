import React, { useState } from "react";
import styled from "styled-components";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import GroupPanel from "./GroupPanel";
import InputPanel from "./InputPanel";
import MultipleStart from "./MultipleStart";

const MultipleChoice = ({ onShowMultiple }) => {
  const [selectedGroup, setSelectedGroup] = useState("그룹을 선택해 주세요");
  const [selectedPanel, setSelectedPanel] = useState("");
  const [cardCount, setCardCount] = useState(0);

  const [showGroup, setShowGroup] = useState(false);
  const [showSetting, setShowSetting] = useState(false);
  const [showMultiple, setShowMultiple] = useState(false);

  const [cards, setCards] = useState(null);

  // useEffect(async () => {
  //   const response = await cardProvider.getSlicedRandomCard(cardCount);
  //   setCards(response);
  // }, [cardCount]);

  const onSelectGroup = async ({ group_name, count }) => {
    setSelectedGroup(group_name);
    setCardCount(count);
    setCards(count);
    // const response = await cardProvider.getRandomCard();
    // response.slice(0, count);
    // setCards(response);
  };

  const onChangeCount = (count) => {
    setCardCount(count);
  };

  const showGroupPanel = () => {
    setShowGroup((bool) => !bool);
  };

  const showMultiplePanel = () => {
    setShowMultiple((bool) => !bool);
  };

  const showSettingPanel = () => {
    setShowSetting((bool) => !bool);
    const label = document.querySelector(".label").innerText;
    setSelectedPanel(label);
  };

  return (
    <Panel>
      <Header>
        <Button onClick={onShowMultiple}>
          <MdOutlineArrowBackIos />
        </Button>
        <Title>사지선다</Title>
        <Button onClick={showMultiplePanel}>시작하기</Button>
      </Header>
      <Contents>
        <SettingPanel>
          <SettingItem onClick={showGroupPanel}>
            <Label>학습할 그룹</Label>
            <Value>{selectedGroup}</Value>
            <MdOutlineArrowForwardIos />
          </SettingItem>
          <SettingItem onClick={showSettingPanel}>
            <Label className="label">문제 수</Label>
            <Value>{cardCount}</Value>
            <MdOutlineArrowForwardIos />
          </SettingItem>
        </SettingPanel>
      </Contents>
      {showGroup && (
        <GroupPanel
          showGroupPanel={showGroupPanel}
          onSelectGroup={onSelectGroup}
          editPanel={false}
        />
      )}
      {showSetting && (
        <InputPanel
          max={cards}
          currentCount={cardCount}
          onChangeCount={onChangeCount}
          selectedPanel={selectedPanel}
          showSettingPanel={showSettingPanel}
        />
      )}
      {showMultiple ? (
        <MultipleStart
          cardCount={cardCount}
          selectedGroup={selectedGroup}
          showMultiplePanel={showMultiplePanel}
        />
      ) : null}
    </Panel>
  );
};

export default MultipleChoice;

const Panel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
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

const Contents = styled.section`
  height: 100%;
`;

const SettingPanel = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
`;

const SettingItem = styled.div`
  display: flex;
  /* justify-content: space-between; */
  align-items: center;
  padding: 2rem 0;
  color: ${(props) => props.theme.colors.black_500};
  cursor: pointer;
`;

const Label = styled.div`
  color: white;
  flex-grow: 1;
`;

const Value = styled.p`
  color: ${(props) => props.theme.colors.black_500};
`;
