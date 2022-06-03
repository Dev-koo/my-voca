import React, { useEffect, useState } from "react";
import styled from "styled-components";
const AnswerPanel = ({ cards, showCard, onAnswerCheck }) => {
  const [answerArray, setAnswerArray] = useState([]);
  useEffect(() => {
    const exceptCurrent = cards.filter((card) => card.id !== showCard.id);
    const exceptAndSort = exceptCurrent.sort(() => Math.random() - 0.5);

    const add = [showCard, ...exceptAndSort];

    const answerArray = add.slice(0, 4);

    const finalRandom = answerArray.sort(() => Math.random() - 0.5);
    setAnswerArray(finalRandom);
  }, [randomChoice, showCard]);
  return (
    <>
      <Section>
        <ChoiceButton onClick={() => onAnswerCheck(answerArray.at(0))}>
          {answerArray.at(0)?.mean || ""}
        </ChoiceButton>
        <ChoiceButton onClick={() => onAnswerCheck(answerArray.at(1))}>
          {answerArray.at(1)?.mean || ""}
        </ChoiceButton>
        <ChoiceButton onClick={() => onAnswerCheck(answerArray.at(2))}>
          {answerArray.at(2)?.mean || ""}
        </ChoiceButton>
        <ChoiceButton onClick={() => onAnswerCheck(answerArray.at(3))}>
          {answerArray.at(3)?.mean || ""}
        </ChoiceButton>
      </Section>
    </>
  );
};

export default AnswerPanel;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  padding: 0 5rem;
`;

const ChoiceButton = styled.button`
  width: 100%;
  height: 4rem;
  font-size: ${(props) => props.theme.sizes.xl2};
  padding: 0.5rem 1rem;
  outline: none;
  border: none;
  color: white;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.black_900};
  margin-bottom: 1rem;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
