import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AddCardPanel from "./AddCardPanel";
import GroupPanel from "./GroupPanel";
const EditPanel = ({
  selectedCard,
  showEditPanel,
  onRemoveCard,
  onEditCard,
  onSelectCard,
}) => {
  const [showAdd, setShowAdd] = useState(false);
  const [showGroup, setShowGroup] = useState(false);

  useEffect(() => {
    return () => {
      onSelectCard(null);
    };
  }, []);

  const handleClick = (event) => {
    if (event.target.id === "cancel" || event.target.id === "background") {
      showEditPanel();
    }
  };

  const onSelectGroup = (group) => {
    const { group_name } = group;
    handleEditCard({ group_name });
  };

  const handleEditCard = (card) => {
    const newCard = {
      ...selectedCard,
      ...card,
    };

    onEditCard(newCard);
    showEditPanel();
  };

  const handleRemove = () => {
    onRemoveCard(selectedCard.id);
    showEditPanel();
  };

  const showAddPanel = () => {
    setShowAdd((bool) => !bool);
  };

  const showGroupPanel = () => {
    setShowGroup((bool) => !bool);
  };
  return (
    <>
      {selectedCard && (
        <BackGround id="background" onClick={handleClick}>
          <Panel>
            <ButtonGroup>
              <Content>{selectedCard.word}</Content>
              <Button onClick={showGroupPanel}>그룹 변경</Button>
              <Button onClick={showAddPanel}>편집</Button>
              <Button onClick={handleRemove}>삭제</Button>
              <Button id="cancel">취소</Button>
            </ButtonGroup>
          </Panel>
        </BackGround>
      )}
      {showAdd ? (
        <AddCardPanel
          showAddPanel={showAddPanel}
          onCreateCard={handleEditCard}
          selectedGroups={selectedCard.group_name}
          card={selectedCard}
        />
      ) : null}
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

export default EditPanel;

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
