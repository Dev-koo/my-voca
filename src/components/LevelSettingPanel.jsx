import React, { useState } from "react";
import styled from "styled-components";
const LevelSettingPanel = ({
  cardChanged,
  onEditCard,
  onShowLevelSettingPanel,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = (event) => {
    if (event.target.id === "cancel" || event.target.id === "background") {
      onShowLevelSettingPanel();
    }
  };

  //   const onSelectGroup = (group) => {
  //     const { group_name, group_id } = group;
  //     handleEditCard({ group_name, group_id });
  //   };

  const handleLevelChanger = (level) => {
    setIsLoading(true);
    // console.log(level);
    const newCards = cardChanged.map((card) => {
      return { ...card, level };
    });

    // console.log(newCards);
    newCards.map((card) => onEditCard(card));
    onShowLevelSettingPanel();
  };

  return (
    <>
      <BackGround id="background" onClick={handleClick}>
        <Panel>
          <ButtonGroup>
            <Content>레벨 편집</Content>
            <Button
              onClick={(e) => handleLevelChanger(e.currentTarget.innerText)}
            >
              어려워요
            </Button>
            <Button
              onClick={(e) => handleLevelChanger(e.currentTarget.innerText)}
            >
              애매해요
            </Button>
            <Button
              onClick={(e) => handleLevelChanger(e.currentTarget.innerText)}
            >
              외웠어요
            </Button>
            <Button id="cancel">취소</Button>
          </ButtonGroup>
        </Panel>
      </BackGround>
    </>
  );
};

export default LevelSettingPanel;

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

  &:nth-child(4) {
    margin-bottom: 0.5rem;
    border-bottom-right-radius: 1rem;
    border-bottom-left-radius: 1rem;
  }

  &:nth-child(5) {
    margin-bottom: 0.5rem;
    border-radius: 1rem;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.black_700};
  }
`;
