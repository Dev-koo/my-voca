import React, { useState, useRef } from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import CsvListPanel from "./CsvListPanel";
const MenuPanel = ({ csvService, showMenuPanel, onCsvLoad }) => {
  const [showCsvPanel, setShowCsvPanel] = useState(false);
  const [cards, setCards] = useState([]);
  const onLogout = useAuth();
  const fileInputRef = useRef();

  const onCsvSave = async (group_id) => {
    const customCards = cards.map((card) => {
      return {
        ...card,
        group_id,
      };
    });
    const response = await csvService.save(customCards);
    onCsvLoad(response);
  };

  const onFileUpload = async (event) => {
    const file = event.currentTarget.files[0];
    const cards = await csvService.upload(file);
    setCards(cards);
    fileInputRef.current.value = "";
    showCsvListPanel();
  };

  const readFile = () => {
    fileInputRef.current.click();
  };

  const handleClick = (event) => {
    if (event.target.id === "cancel" || event.target.id === "background") {
      showMenuPanel();
    }
  };

  const showCsvListPanel = () => {
    setShowCsvPanel((bool) => {
      if (!bool === false) {
        setCards([]);
        return !bool;
      }
      return !bool;
    });
  };
  return (
    <>
      <BackGround id="background" onClick={handleClick}>
        <form>
          <HiddenFileInput
            ref={fileInputRef}
            type="file"
            onChange={onFileUpload}
            accept=".csv"
          />
        </form>
        <Panel>
          <ButtonGroup>
            <Button>목록 편집</Button>
            <Button onClick={readFile}>CSV 불러오기</Button>
            <Button>CSV 내보내기</Button>
            <Button onClick={onLogout}>로그아웃</Button>
            <Button id="cancel">취소</Button>
          </ButtonGroup>
        </Panel>
      </BackGround>
      {showCsvPanel ? (
        <CsvListPanel
          cards={cards}
          showCsvListPanel={showCsvListPanel}
          onCsvSave={onCsvSave}
        />
      ) : null}
    </>
  );
};

export default MenuPanel;
const BackGround = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.805);
`;

const HiddenFileInput = styled.input`
  display: none;
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

const Button = styled.button`
  font-size: 1.25rem;
  width: 100%;
  padding: 1.5rem;
  color: ${(props) => props.theme.colors.blue};
  background-color: ${(props) => props.theme.colors.black_800};
  border-bottom: 1px solid ${(props) => props.theme.colors.black_700};

  &:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  &:nth-child(4) {
    margin-bottom: 0.5rem;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
    color: ${(props) => props.theme.colors.red};
  }

  &:nth-child(5) {
    margin-bottom: 0.5rem;
    border-radius: 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.black_700};
  }
`;

const CloseButton = styled.button`
  background-color: transparent;
  color: white;
  text-align: left;

  font-size: ${(props) => props.theme.sizes.xl2}; ;
`;
