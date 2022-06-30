import { useContext, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import CardListEditPage from "./components/CardListEditPage";
import { CardContext } from "./contexts/CardContext";
import LearnPage from "./pages/LearnPage";
import ListPage from "./pages/ListPage";

function App({ csvService }) {
  const [cards, setCards] = useState([]);
  const cardService = useContext(CardContext);

  useEffect(async () => {
    const cards = await cardService.getCard();
    setCards(cards);
  }, []);

  const onCsvLoad = (cards) => {
    setCards((prevState) => {
      const Cards = [...cards, ...prevState];
      return Cards;
    });
  };

  const onCreateCard = async (card) => {
    const data = await cardService.createCard(card);
    if (data === null) {
      throw new Error("Create fail");
    }

    setCards((prevState) => {
      const Cards = [data, ...prevState];
      return Cards;
    });
  };

  const onRemoveCard = async (id) => {
    const data = await cardService.removeCard(id);

    if (!data) {
      console.log(data);
      return;
    }

    setCards((prevState) => {
      const Cards = prevState.filter((card) => card.id !== data.id);
      return Cards;
    });
  };

  const onEditCard = async (card) => {
    const response = await cardService.updateCard(card);

    setCards((prevCards) => {
      const cards = prevCards.map((item) => {
        if (item.id === response.id) {
          return response;
        } else {
          return item;
        }
      });
      return cards;
    });
  };

  const onChangeGroup = async (groupName) => {
    const response = await cardService.getCard(groupName);

    setCards(response);
  };

  return (
    <AppContent>
      <Routes>
        <Route
          path="/"
          element={
            <ListPage
              cards={cards}
              onCreateCard={onCreateCard}
              onRemoveCard={onRemoveCard}
              onEditCard={onEditCard}
              onChangeGroup={onChangeGroup}
              csvService={csvService}
              onCsvLoad={onCsvLoad}
            />
          }
        />
        <Route path="/learn" element={<LearnPage cards={cards} />} />
        <Route
          path="/edit"
          element={
            <CardListEditPage
              cards={cards}
              onRemoveCard={onRemoveCard}
              onEditCard={onEditCard}
              onChangeGroup={onChangeGroup}
            />
          }
        />
      </Routes>
    </AppContent>
  );
}

export default App;

const AppContent = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 560px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: black;
`;
