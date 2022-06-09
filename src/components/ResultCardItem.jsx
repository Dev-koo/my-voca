import React from "react";
import styled from "styled-components";
import { GiSpeaker } from "react-icons/gi";
import { useAudio } from "../contexts/AudioContext";

const ResultCardItem = ({ card: { word, mean, correct } }) => {
  const onPlay = useAudio();

  return (
    <Card isCorrect={correct}>
      <Box>
        <Word>{word}</Word>
        <Mean>{mean}</Mean>
      </Box>
      <PlayButton onClick={() => onPlay(word)}>
        <GiSpeaker />
      </PlayButton>
    </Card>
  );
};

export default ResultCardItem;

const Card = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.black_900};
  padding: 1rem;
  color: ${(props) => (props.isCorrect ? "white" : props.theme.colors.red)};
  user-select: none;

  &:last-child {
    margin-bottom: 20rem;
  }
`;

const Box = styled.div``;

const Word = styled.div`
  padding-top: 0.5rem;
  font-size: ${(props) => props.theme.sizes.xl2};
`;

const Mean = styled.div`
  padding-top: 0.5rem;
  font-size: ${(props) => props.theme.sizes.xl};
`;

const PlayButton = styled.button`
  background-color: transparent;
  color: ${(props) => props.theme.colors.black_500};
  font-size: ${(props) => props.theme.sizes.xl2};
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
