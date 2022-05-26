import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { MdMenu, MdSearch } from "react-icons/md";
import { BiFolder } from "react-icons/bi";
import { ReactComponent as LarnIcon } from "../assets/larn-icon-black-resize.svg";
import CardList from "../components/CardList";
import CardItem from "../components/CardItem";

const getLevel = (level) => {
  switch (level) {
    case "어려워요":
      return "애매해요";
    case "애매해요":
      return "외웠어요";
    case "외웠어요":
      return "어려워요";

    default:
      break;
  }
};

const ListPage = (props) => {
  const [cards, setCards] = useState({});

  useEffect(() => {
    const initialState = {
      1: {
        id: 1,
        user_id: 100,
        word: "apple",
        mean: "사과",
        memo: null,
        group_name: "",
        level: "어려워요",
        create_at: Date.now(),
      },
      2: {
        id: 2,
        user_id: 100,
        word: "banana",
        mean: "바나나",
        memo: null,
        group_name: "그룹1",
        level: "애매해요",
        create_at: Date.now(),
      },
      3: {
        id: 3,
        user_id: 100,
        word: "tomato",
        mean: "토마토",
        memo: "토뭬이",
        group_name: "",
        level: "외웠어요",
        create_at: Date.now(),
      },
      4: {
        id: 4,
        user_id: 100,
        word: "test",
        mean: "테슷트",
        memo: null,
        group_name: "",
        level: "외웠어요",
        create_at: Date.now(),
      },
      5: {
        id: 5,
        user_id: 100,
        word: "test",
        mean: "테슷트",
        memo: null,
        group_name: "",
        level: "외웠어요",
        create_at: Date.now(),
      },
      6: {
        id: 6,
        user_id: 100,
        word: "test",
        mean: "테슷트",
        memo: null,
        group_name: "",
        level: "외웠어요",
        create_at: Date.now(),
      },
      7: {
        id: 7,
        user_id: 100,
        word: "test",
        mean: "테슷트",
        memo: null,
        group_name: "",
        level: "외웠어요",
        create_at: Date.now(),
      },
      8: {
        id: 8,
        user_id: 100,
        word: "test",
        mean: "테슷트",
        memo: null,
        group_name: "",
        level: "외웠어요",
        create_at: Date.now(),
      },
      9: {
        id: 9,
        user_id: 100,
        word: "test",
        mean: "테슷트",
        memo: null,
        group_name: "",
        level: "외웠어요",
        create_at: Date.now(),
      },
    };

    setCards(initialState);
  }, []);

  const onChangeLevel = (id) => {
    const currentLevel = cards[id].level;
    const changedLevel = getLevel(currentLevel);
    setCards((prevCards) => {
      const cards = { ...prevCards };
      cards[id].level = changedLevel;
      return cards;
    });
  };

  return (
    <>
      <Header>
        <Button>
          <MdMenu />
        </Button>
        <Title>List</Title>
        <Button>
          <MdSearch />
        </Button>
      </Header>
      <Contents>
        <CardList>
          {Object.keys(cards).map((cardIndex) => (
            <CardItem
              key={cards[cardIndex].id}
              card={cards[cardIndex]}
              onChangeLevel={onChangeLevel}
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
