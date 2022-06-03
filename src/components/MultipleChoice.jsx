import React, { useState } from "react";
import styled from "styled-components";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import GroupPannel from "./GroupPannel";
import InputPannel from "./InputPannel";
import MultipleStart from "./MultipleStart";

const MultipleChoice = ({ onShowMultiple }) => {
  const [selectedGroup, setSelectedGroup] = useState("그룹을 선택해 주세요");
  const [selectedPannel, setSelectedPannel] = useState("");
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

  const showGroupPannel = () => {
    setShowGroup((bool) => !bool);
  };

  const showMultiplePannel = () => {
    setShowMultiple((bool) => !bool);
  };

  const showSettingPannel = () => {
    setShowSetting((bool) => !bool);
    const label = document.querySelector(".label").innerText;
    setSelectedPannel(label);
  };

  return (
    <Pannel>
      <Header>
        <Button onClick={onShowMultiple}>
          <MdOutlineArrowBackIos />
        </Button>
        <Title>사지선다</Title>
        <Button onClick={showMultiplePannel}>시작하기</Button>
      </Header>
      <Contents>
        <SettingPannel>
          <SettingItem onClick={showGroupPannel}>
            <Label>학습할 그룹</Label>
            <Value>{selectedGroup}</Value>
            <MdOutlineArrowForwardIos />
          </SettingItem>
          <SettingItem onClick={showSettingPannel}>
            <Label className="label">문제 수</Label>
            <Value>{cardCount}</Value>
            <MdOutlineArrowForwardIos />
          </SettingItem>
        </SettingPannel>
      </Contents>
      {showGroup && (
        <GroupPannel
          showGroupPannel={showGroupPannel}
          onSelectGroup={onSelectGroup}
          editPannel={false}
        />
      )}
      {showSetting && (
        <InputPannel
          max={cards}
          currentCount={cardCount}
          onChangeCount={onChangeCount}
          selectedPannel={selectedPannel}
          showSettingPannel={showSettingPannel}
        />
      )}
      {showMultiple ? (
        <MultipleStart
          cardCount={cardCount}
          selectedGroup={selectedGroup}
          showMultiplePannel={showMultiplePannel}
        />
      ) : null}
    </Pannel>
  );
};

export default MultipleChoice;

const Pannel = styled.div`
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

const SettingPannel = styled.div`
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
