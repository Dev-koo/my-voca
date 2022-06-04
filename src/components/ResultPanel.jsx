import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MdClose } from "react-icons/md";
import ResultCardItem from "./ResultCardItem";

const ResultPanel = ({ resultCard, onShowResult, showMultiplePanel }) => {
  const [wrongCards, setWrongCards] = useState([]);
  const [currentCards, setCurrentCards] = useState([]);
  const [showCards, setShowCards] = useState([]);
  useEffect(() => {
    console.log(resultCard);

    const correctCards = resultCard.filter((item) => item.correct === true);
    const wrongCards = resultCard.filter((item) => item.correct === false);

    setShowCards(resultCard);
    setCurrentCards(correctCards);
    setWrongCards(wrongCards);
  }, []);

  const onClickSubject = (cards) => {
    setShowCards(cards);
  };

  const handleClose = () => {
    onShowResult();
    showMultiplePanel();
  };

  return (
    <Panel>
      <Header>
        <Button onClick={handleClose}>
          <MdClose />
        </Button>
        <Title>결과</Title>
        <Button onClick={handleClose}>다시하기</Button>
      </Header>
      <ResultType>
        <Subject onClick={() => onClickSubject(resultCard)}>
          모든 단어({showCards.length})
        </Subject>
        <Subject onClick={() => onClickSubject(currentCards)}>
          정답({currentCards.length})
        </Subject>
        <Subject onClick={() => onClickSubject(wrongCards)}>
          오답({wrongCards.length})
        </Subject>
      </ResultType>
      <CardList>
        {showCards &&
          showCards.map((card) => <ResultCardItem key={card.id} card={card} />)}
      </CardList>
    </Panel>
  );
};

export default ResultPanel;

const Panel = styled.div`
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
  font-size: ${(props) => props.theme.sizes.xl2};
  background-color: transparent;
  color: white;
  &:last-child {
    font-size: ${(props) => props.theme.sizes.base};
  }
`;

const Title = styled.p`
  color: white;
`;

const ResultType = styled.div`
  margin-top: 4rem;
  padding: 1rem 0;
  display: flex;
  color: white;
  text-align: center;
`;

const Subject = styled.div`
  flex-grow: 1;
  padding: 1rem 2rem;
  color: white;
  cursor: pointer;
`;

const CardList = styled.div`
  border-top-left-radius: 1.5rem;
  border-top-right-radius: 1.5rem;
  width: 100%;
  height: 80%;
  position: absolute;
  padding: 1rem;
  bottom: 0;
  background-color: ${(props) => props.theme.colors.black_900};
  overflow: auto;
`;
