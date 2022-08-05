import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { GiSpeaker } from "react-icons/gi";
import ResultPanel from "./ResultPanel";
import { useAudio } from "../contexts/AudioContext";
import { CardContext } from "../contexts/CardContext";
import { motion, useAnimationControls } from "framer-motion";

function randomArray(cards, showCard) {
  // 1. 랜덤으로 받은 모든카드중에 정답카드를 제외한다.
  const exceptCurrent = cards.filter((card) => card.id !== showCard.id);
  // 2. 전체적으로 섞는다.
  const exceptAndSort = exceptCurrent.sort(() => Math.random() - 0.5);
  // 3. 맨첫번째 배열에 정답카드를 넣는다.
  const insertShowCard = [showCard, ...exceptAndSort];
  // 4. 0~ 4번까지 자른다.
  // 5. 4번에서 자른 배열을 전체적으로 섞는다.
  const answerArray = insertShowCard
    .slice(0, 4)
    .sort(() => Math.random() - 0.5);

  // 6. 섞은 배열을 반환한다.
  return answerArray;
}

const MultipleStart = ({
  cardCount,
  selectedGroup,
  excludeLevel,
  showMultiplePanel,
}) => {
  const [cards, setCards] = useState([]); // 학습할 카드가 담긴 state (slice 된 상태)
  const [randomChoice, setRandomChoice] = useState(cards); // 보기 버튼 관리 state
  const [showCard, setShowCard] = useState(null); // 보여지는 카드

  const [cardIndex, setCardIndex] = useState(0); // 카드 인덱스를 관리할 state
  const [resultCard, setResultCard] = useState([]); // 결과 state

  const [allCards, setAllCards] = useState([]);

  const [showResult, setShowResult] = useState(false); // 결과 panel용 토글 state

  const [isCorrect, setIsCorrect] = useState(false);

  const onPlay = useAudio();

  const cardService = useContext(CardContext);

  const animationControler = useAnimationControls();

  useEffect(async () => {
    await cardService
      .getRandomCard(selectedGroup) //
      .then((response) => {
        // console.log(response);
        const learnCards = response.slice(0, cardCount).filter((item) => {
          // if (excludeLevel === null) {
          //   return item;
          // }
          if (item.level !== excludeLevel) {
            return item;
          }
        });
        setCards(learnCards); // 학습할 카드가 담긴 state (slice 된 상태)
        setShowCard(learnCards[cardIndex]); // 보여지는 카드
        // 보기 버튼 관리 state (인덱스 0~4 까지 보여지고있다.)
        setRandomChoice(randomArray(response, learnCards[0]));
        // 보기 버튼을 위해 있어야할 모든 그룹 카드
        setAllCards(response);
        return response[0].word;
      }); //
  }, []);

  useEffect(() => {
    setRandomChoice(randomArray(allCards, showCard));
  }, [cardIndex]);

  useEffect(() => {
    showCard && onPlay(showCard.word);
  }, [showCard]);

  const next = () => {
    setCardIndex((prevState) => {
      if (prevState + 1 === cardCount) {
        console.log("end!");
        return prevState;
      } else {
        const count = prevState + 1;
        setShowCard(cards[count]);
        return prevState + 1;
      }
    });
  };

  const onAnswerCheck = (card) => {
    if (card.mean === showCard.mean) {
      console.log("정답");
      setResultCard((prevState) => {
        const resultCard = [...prevState];
        const newCard = resultCard.concat([{ ...showCard, correct: true }]);
        return newCard;
      });
      if (cardCount === cardIndex + 1) {
        onShowCorrectSign();
        onShowResult();
        return;
      }
      setAllCards((prevState) => {
        const allCards = prevState.filter((card) => card.id !== showCard.id);
        return allCards;
      });

      setIsCorrect(true);
      onShowCorrectSign();
      next();
    } else {
      console.log("노답");
      setResultCard((prevState) => {
        const resultCard = [...prevState];
        const newCard = resultCard.concat([{ ...showCard, correct: false }]);
        return newCard;
      });
      if (cardCount === cardIndex + 1) {
        onShowCorrectSign();
        onShowResult();
        return;
      }
      setAllCards((prevState) => {
        const allCards = prevState.filter((card) => card.id !== showCard.id);
        return allCards;
      });
      setIsCorrect(false);
      onShowCorrectSign();
      next();
    }
  };

  const playHandler = () => {
    onPlay(showCard.word);
  };

  const onShowResult = () => {
    setShowResult((bool) => !bool);
  };

  const onShowCorrectSign = () => {
    animationControler.start({ opacity: [1, 0] });
  };
  return (
    <>
      <Panel>
        <Header>
          <Button onClick={showMultiplePanel}>
            <MdOutlineArrowBackIos />
          </Button>
          <Title>{`${cardIndex + 1} of ${cards.length}`}</Title>
          <Button onClick={playHandler}>
            <GiSpeaker />
          </Button>
        </Header>
        <Contents>
          {showCard && (
            <>
              <Card>
                {showCard.word}
                <SignPanel>
                  <CorrectSign
                    style={{ opacity: 0 }}
                    animate={animationControler}
                    iscorrect={isCorrect ? 1 : 0}
                  >
                    {isCorrect ? "정답" : "오답"}{" "}
                  </CorrectSign>
                </SignPanel>
              </Card>
              <Section>
                <ChoiceButton onClick={() => onAnswerCheck(randomChoice.at(0))}>
                  {randomChoice.at(0)?.mean || ""}
                </ChoiceButton>
                <ChoiceButton onClick={() => onAnswerCheck(randomChoice.at(1))}>
                  {randomChoice.at(1)?.mean || ""}
                </ChoiceButton>
                <ChoiceButton onClick={() => onAnswerCheck(randomChoice.at(2))}>
                  {randomChoice.at(2)?.mean || ""}
                </ChoiceButton>
                <ChoiceButton onClick={() => onAnswerCheck(randomChoice.at(3))}>
                  {randomChoice.at(3)?.mean || ""}
                </ChoiceButton>
              </Section>
            </>
          )}
          {showResult ? (
            <ResultPanel
              resultCard={resultCard}
              onShowResult={onShowResult}
              showMultiplePanel={showMultiplePanel}
            />
          ) : null}
        </Contents>
      </Panel>
    </>
  );
};

export default MultipleStart;

const Panel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
`;

const Title = styled.p`
  color: white;
`;

const Contents = styled.section`
  height: 100%;
  background-color: black;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  border-radius: 1rem;
  padding: 4rem 1rem;
  color: white;
  user-select: none;
  margin-bottom: 1rem;
  text-align: center;
  font-size: ${(props) => props.theme.sizes.xl4}; ;
`;

const SignPanel = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 50%;
  transform: translateX(50%);
  text-align: center;
  font-size: 2rem;
  z-index: 55;
`;

const CorrectSign = styled(motion.div)`
  /* color: ${(props) => (props.isCorrect === "right" ? "skyblue" : "pink")}; */
  color: ${(props) => (props.iscorrect ? "skyblue" : "pink")};
`;

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
