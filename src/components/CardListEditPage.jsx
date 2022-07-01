import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CardList from "./CardList";
import EditCardItem from "./EditCardItem";
import GroupListPanel from "./GroupListPanel";
import LevelSettingPanel from "./LevelSettingPanel";

const CardListEditPage = ({ cards, onRemoveCard, onEditCard }) => {
  const navigator = useNavigate();
  const [checkItems, setCheckItems] = useState([]);
  const [cardChanged, setCardChanged] = useState([]);

  const [showLevelSettingPanel, setShowLevelSettingPanel] = useState(false);
  const [showGroupListPanel, setShowGroupListPanel] = useState(false);
  const onChangeChecked = (id) => {
    if (checkItems.includes(id)) {
      setCheckItems((prevState) => {
        const checkList = prevState.filter((innerId) => innerId !== id);
        return checkList;
      });
    } else {
      setCheckItems((prevState) => {
        const checkList = [...prevState, id];
        return checkList;
      });
    }
  };

  const onSelectAll = () => {
    const checkItems = cards.map((card) => {
      return card.id;
    });
    setCheckItems(checkItems);
  };

  const onDeselect = () => {
    setCheckItems([]);
    setCardChanged([]);
  };

  const onDelete = () => {
    checkItems.map((id) => onRemoveCard(id));
    setCheckItems([]);
  };

  const onLevelChange = () => {
    let array = [];
    checkItems.forEach((value) => {
      cards.map((card) => {
        if (card.id === value) {
          array.push(card);
        }
      });
    });

    setCardChanged(array);
    onShowLevelSettingPanel();
  };

  const onGroupChange = () => {
    let array = [];
    checkItems.forEach((value) => {
      cards.map((card) => {
        if (card.id === value) {
          array.push(card);
        }
      });
    });

    setCardChanged(array);
    onShowGroupListPanel();
  };

  const onShowLevelSettingPanel = () => {
    setShowLevelSettingPanel((bool) => !bool);
  };
  const onShowGroupListPanel = () => {
    setShowGroupListPanel((bool) => !bool);
  };

  return (
    <>
      <Header>
        <Button>
          {checkItems.length ? (
            <CancelSelection onClick={onDeselect}>
              선택 취소({checkItems.length})
            </CancelSelection>
          ) : (
            <AllSelection onClick={onSelectAll}>전체 선택</AllSelection>
          )}
        </Button>
        <Title>목록 편집</Title>
        <Button onClick={() => navigator(-1)}>취소</Button>
      </Header>
      <Contents>
        <CardList>
          {cards.map((card) => (
            <EditCardItem
              key={card.id}
              card={card}
              checked={checkItems.includes(card.id)}
              onChangeChecked={onChangeChecked}
            />
          ))}
        </CardList>
      </Contents>
      {checkItems.length ? (
        <CardListEditPanel>
          <EditButton onClick={onLevelChange}>레벨 편집</EditButton>
          <EditButton onClick={onGroupChange}>그룹 편집</EditButton>
          <EditButton onClick={onDelete}>삭제</EditButton>
        </CardListEditPanel>
      ) : null}
      {showLevelSettingPanel ? (
        <LevelSettingPanel
          cardChanged={cardChanged}
          onEditCard={onEditCard}
          onShowLevelSettingPanel={onShowLevelSettingPanel}
        />
      ) : null}
      {showGroupListPanel ? (
        <GroupListPanel
          cardChanged={cardChanged}
          onEditCard={onEditCard}
          onShowGroupListPanel={onShowGroupListPanel}
        />
      ) : null}
    </>
  );
};

export default CardListEditPage;

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
`;

const Contents = styled.main`
  position: relative;
  height: 100%;
  overflow: scroll;
  padding: 0 1rem;
`;

const Button = styled.button`
  height: 56px;
  padding: 1rem;
  font-size: ${(props) => props.theme.sizes.base};
  background-color: transparent;
  color: white;
`;

const Title = styled.p`
  padding: 1rem;
  color: white;
  cursor: pointer;
`;

const CancelSelection = styled.div``;
const AllSelection = styled.div``;

const CardListEditPanel = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
`;

const EditButton = styled.button`
  width: 50%;
  background-color: white;
  color: black;
  font-size: ${(props) => props.theme.sizes.base};
  padding: 1.5rem;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.theme.colors.black_200};
  }
`;
