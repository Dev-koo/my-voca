import { useEffect, useRef, useState } from "react";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import LearnPage from "./pages/LearnPage";
import ListPage from "./pages/ListPage";
import * as cardProvider from "./service/cardService";

function App() {
  const [cards, setCards] = useState([]);

  useEffect(async () => {
    const cards = await cardProvider.getCard();
    setCards(cards);
  }, []);

  const indexRef = useRef(10);

  const onChangeLevel = async (id) => {
    const updatedCard = await cardProvider.changeLevel(id);
    if (!updatedCard) {
      return;
    }

    setCards((prevCards) => {
      const cards = prevCards.map((card) => {
        if (card.id === updatedCard.id) {
          return updatedCard;
        }
        return card;
      });
      return cards;
    });
  };

  const onCreateCard = async (card) => {
    const newCard = {
      id: indexRef.current,
      user_id: 1,
      ...card,
      level: "어려워요",
      create_at: Date.now(),
    };

    const response = await cardProvider.createCard(newCard); //
    if (response === null) {
      throw new Error("Create fail");
    }

    setCards(response);
    indexRef.current += 1;
  };

  const onRemoveCard = async (id) => {
    const response = await cardProvider.removeCard(id);

    if (!response) {
      console.log(response);
      return;
    }

    setCards(response);
  };

  const onEditCard = async (card) => {
    const response = await cardProvider.updateCard(card);

    setCards((prevCards) => {
      const cards = prevCards.map((item) => {
        if (item.id === response.id) {
          return response;
        }
        return item;
      });
      return cards;
    });
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
              onChangeLevel={onChangeLevel}
            />
          }
        />
        <Route path="/learn" element={<LearnPage cards={cards} />} />
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
