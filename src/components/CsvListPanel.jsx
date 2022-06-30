import React, { useState } from "react";
import styled from "styled-components";
import { MdOutlineArrowBackIos } from "react-icons/md";
import GroupPanel from "./GroupPanel";

const CsvListPanel = ({ cards, showCsvListPanel, onCsvSave }) => {
  const [showGroup, setShowGroup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState({
    group_name: null,
    group_id: null,
  });

  const onSaveCards = () => {
    showGroupPanel();
  };

  const onSelectGroup = ({ group_name, group_id }) => {
    setSelectedGroup({ group_name, group_id });
    onCsvSave(group_id);
    showPopupPanel();
  };

  const showGroupPanel = () => {
    setShowGroup((bool) => !bool);
  };

  const showPopupPanel = () => {
    setShowPopup((bool) => !bool);
  };

  return (
    <>
      <Panel>
        <Header>
          <Button onClick={showCsvListPanel}>
            <MdOutlineArrowBackIos />
          </Button>
          <Title>CSV 불러오기</Title>
          <Button onClick={onSaveCards}>저장</Button>
        </Header>
        <Contents>
          <CsvList>
            {cards.map((card, index) => (
              <CsvItem key={index}>
                <Word>{card.word}</Word>
                <Mean>{card.mean}</Mean>
              </CsvItem>
            ))}
          </CsvList>
        </Contents>
      </Panel>
      {showGroup ? (
        <GroupPanel
          showGroupPanel={showGroupPanel}
          onSelectGroup={onSelectGroup}
          flag="hidden"
        />
      ) : null}
      {showPopup ? (
        <BackGround>
          <Popup>
            <PopupInfo>저장되었습니다.</PopupInfo>
            <PopupButton onClick={showCsvListPanel}>확인</PopupButton>
          </Popup>
        </BackGround>
      ) : null}
    </>
  );
};

export default CsvListPanel;

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

const Button = styled.button`
  padding: 1rem;
  font-size: ${(props) => props.theme.sizes.base};
  background-color: transparent;
  color: white;
`;

const Title = styled.p`
  color: white;
`;

const Contents = styled.div`
  height: 100%;
  width: 100%;
  padding: 1rem;
  background-color: black;
  color: white;
  overflow: scroll;
`;

const CsvList = styled.ul``;

const CsvItem = styled.li`
  padding: ${(props) => props.theme.sizes.xs};
  border-bottom: 1px solid ${(props) => props.theme.colors.black_500};

  &:last-child {
    margin-bottom: 20rem;
  }
`;

const Word = styled.p`
  padding-bottom: ${(props) => props.theme.sizes.xs};
`;

const Mean = styled.p``;

const BackGround = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.805);
`;

const Popup = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 250px;
  height: 100px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.black_700};
  border-radius: 1rem;
  overflow: hidden;
`;

const PopupInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-weight: bold;
  color: white;
  border-bottom: 1px solid ${(props) => props.theme.colors.black_500};
`;

const PopupButton = styled.button`
  width: 100%;
  padding: ${(props) => props.theme.sizes.xl};
  font-size: ${(props) => props.theme.sizes.base};
  color: ${(props) => props.theme.colors.blue};
  background-color: ${(props) => props.theme.colors.black_700};
  cursor: pointer;
`;
