import React, { useState } from "react";
import styled from "styled-components";
import { GiSpeaker } from "react-icons/gi";
import { useLongPress } from "use-long-press";
import { useAudio } from "../contexts/AudioContext";

function getLevel(level) {
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
}

const EditCardItem = ({
  card,
  checked,
  onEditCard,
  showEditPanel,
  onSelectCard,
  onChangeChecked,
}) => {
  const [toggle, setToggle] = useState(false);
  const onPlay = useAudio();

  const { id, word, mean, memo, level, group_name } = card;

  const handleChangeLevel = () => {
    const newCard = {
      ...card,
      level: getLevel(level),
    };
    onEditCard(newCard);
  };

  const onToggle = (event) => {
    if (event.target.id === "level") {
      return;
    }
    setToggle((bool) => !bool);
  };

  const longPress = () => {
    onSelectCard(card);
    showEditPanel();
  };

  const bind = useLongPress(longPress);

  const playHandler = (event) => {
    event.stopPropagation();
    onPlay(word);
  };

  return (
    <CardWrapper>
      <CheckBox
        type="checkbox"
        onChange={() => onChangeChecked(id)}
        checked={checked}
      />
      <Card {...bind()} onClick={onToggle}>
        <Top>
          <GroupName>{group_name || "그룹 없음"}</GroupName>
          <PlayButton onClick={playHandler}>
            <GiSpeaker />
          </PlayButton>
        </Top>
        <Middle>
          <Word>{word}</Word>
          {toggle ? <Mean>{mean}</Mean> : null}
          {toggle && memo ? <Memo>{memo}</Memo> : null}
        </Middle>
        <Bottom>
          <DisplayLavel onClick={handleChangeLevel} level={level} id="level">
            {level}
          </DisplayLavel>
        </Bottom>
      </Card>
    </CardWrapper>
  );
};

export default EditCardItem;

const CardWrapper = styled.li`
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 20rem;
  }
`;
const CheckBox = styled.input`
  margin-right: 1rem;
  width: ${(props) => props.theme.sizes.xl2}; /*Desired width*/
  height: ${(props) => props.theme.sizes.xl2}; /*Desired height*/
  cursor: pointer;
  /* background-color: black; */
  accent-color: ${(props) => props.theme.colors.black_500};
`;

const Card = styled.div`
  width: 100%;
  border-radius: 1rem;
  background-color: ${(props) => props.theme.colors.black_900};
  padding: 1rem;
  color: white;
  user-select: none;
  margin-bottom: 1rem;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const GroupName = styled.p`
  color: ${(props) => props.theme.colors.black_500};
  font-size: ${(props) => props.theme.sizes.base};
`;

const PlayButton = styled.button`
  background-color: transparent;
  color: ${(props) => props.theme.colors.black_500};
  font-size: ${(props) => props.theme.sizes.xl3};
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const Middle = styled.div`
  position: relative;
`;

const Word = styled.div`
  padding-top: 0.5rem;
  font-size: ${(props) => props.theme.sizes.xl3};
`;

const Mean = styled.div`
  padding-top: 0.5rem;
  font-size: ${(props) => props.theme.sizes.xl};
`;

const Memo = styled.div`
  padding-top: 0.5rem;
  font-size: ${(props) => props.theme.sizes.tiny};
`;

const Bottom = styled.div`
  padding: 1.5rem 0;
  position: relative;
`;

const DisplayLavel = styled.p`
  position: absolute;
  bottom: 0;
  right: calc(1rem + 10px);
  background: none;
  border: none;
  outline: none;
  font-size: ${(props) => props.theme.sizes.tiny};
  color: white;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    right: -20px;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${(props) => getLevelColor(props.level)};
  }
`;

function getLevelColor(level) {
  switch (level) {
    case "어려워요":
      return "#999999";
    case "애매해요":
      return "#F5B041";
    case "외웠어요":
      return "#50BD80";
    default:
      return "#999999";
  }
}
