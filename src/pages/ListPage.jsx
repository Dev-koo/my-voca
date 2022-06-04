import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { MdMenu, MdSearch, MdKeyboardArrowDown } from "react-icons/md";
import { BiFolder } from "react-icons/bi";
import { ReactComponent as LarnIcon } from "../assets/larn-icon-black-resize.svg";
import CardList from "../components/CardList";
import CardItem from "../components/CardItem";
import AddButton from "../components/AddButton";
import EditPanel from "../components/EditPanel";
import AddCardPanel from "../components/AddCardPanel";
import GroupPanel from "../components/GroupPanel";

const ListPage = ({
  cards,
  onCreateCard,
  onRemoveCard,
  onEditCard,
  onChangeLevel,
}) => {
  const [selectedCard, setSelectedCard] = useState(null);

  const [selectedGroups, setSelectedGroups] = useState("모든 그룹");

  const [showEdit, setShowEdit] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showGroup, setShowGroup] = useState(false);

  const onSelectCard = (card) => {
    if (!card) {
      setSelectedCard(null);
      return;
    }
    setSelectedCard(card);
  };

  const onSelectGroup = (group) => {
    setSelectedGroups(group.group_name);
  };

  const showEditPanel = () => {
    setShowEdit((bool) => !bool);
  };

  const showAddPanel = () => {
    setShowAdd((bool) => !bool);
  };

  const showGroupPanel = () => {
    setShowGroup((bool) => !bool);
  };

  return (
    <>
      <Header>
        <Button>
          <MdMenu />
        </Button>
        <Title onClick={showGroupPanel}>
          {selectedGroups}
          <MdKeyboardArrowDown />
        </Title>
        <Button>
          <MdSearch />
        </Button>
      </Header>
      <Contents>
        <CardList>
          {cards.map((card) => (
            <CardItem
              key={card.id}
              card={card}
              onChangeLevel={onChangeLevel}
              showEditPanel={showEditPanel}
              onSelectCard={onSelectCard}
            />
          ))}
        </CardList>
      </Contents>
      <NavBar>
        <Link className="link" to={"/"}>
          <BiFolder className="icon" />
        </Link>
        <Link className="link" to={"/learn"}>
          <LarnIcon className="icon" />
        </Link>
      </NavBar>
      <AddButton showAddPanel={showAddPanel} />
      {showEdit ? (
        <EditPanel
          selectedCard={selectedCard}
          showEditPanel={showEditPanel}
          onRemoveCard={onRemoveCard}
          onEditCard={onEditCard}
          onSelectCard={onSelectCard}
        />
      ) : null}
      {showAdd ? (
        <AddCardPanel
          showAddPanel={showAddPanel}
          onCreateCard={onCreateCard}
          selectedGroups={selectedGroups}
          card={selectedCard}
        />
      ) : null}
      {showGroup ? (
        <GroupPanel
          showGroupPanel={showGroupPanel}
          onSelectGroup={onSelectGroup}
          flag=""
          editPanel="true"
        />
      ) : null}
    </>
  );
};

export default ListPage;

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

const NavBar = styled.div`
  width: 100%;
  background-color: black;
  display: flex;
  align-items: center;

  .link {
    text-align: center;
    flex: 1 1 50%;
    padding: 0.25rem;
  }
  .icon {
    font-size: 2rem;
    padding: 0.25rem;
    color: white;
  }
  .icon:hover {
    cursor: pointer;
  }
`;

const Button = styled.button`
  padding: 1rem;
  font-size: ${(props) => props.theme.sizes.xl2};
  background-color: transparent;
  color: white;
`;

const Title = styled.p`
  color: white;
  cursor: pointer;
`;
